import { StorageAdapter } from './adapter.js';

const DB_NAME = "gtg_store";
const DB_VERSION = 1;
const KV_STORE = "kv";
const MIGRATION_FLAG = "gtg_idb_migrated_at";
const GTG_PREFIX = "gtg_";
const FALLBACK_DAYS = 30;

export class WebStorageAdapter extends StorageAdapter {
  constructor() {
    super();
    this._dbPromise = null;
    this._ready = this._init();
  }

  async ready() {
    await this._ready;
  }

  async _getDB() {
    if (typeof idb === "undefined") {
      throw new Error("[storage] lib 'idb' não carregada.");
    }
    if (!this._dbPromise) {
      this._dbPromise = idb.openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(KV_STORE)) {
            db.createObjectStore(KV_STORE);
          }
        }
      });
    }
    return this._dbPromise;
  }

  async _init() {
    await this._migrateFromLocalStorage();
    await this._cleanExpiredFallback();
  }

  async _migrateFromLocalStorage() {
    try {
      const db = await this._getDB();
      const migrated = await db.get(KV_STORE, MIGRATION_FLAG);
      if (migrated) return;
      let copied = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.indexOf(GTG_PREFIX) === 0) {
          const raw = localStorage.getItem(key);
          if (raw !== null) {
            await db.put(KV_STORE, raw, key);
            copied++;
          }
        }
      }
      await db.put(KV_STORE, String(Date.now()), MIGRATION_FLAG);
      console.info(`[storage] Migrated ${copied} keys from localStorage to IndexedDB.`);
    } catch (e) {
      console.error("[storage] Migration failed:", e);
    }
  }

  async _cleanExpiredFallback() {
    try {
      const db = await this._getDB();
      const migratedAt = Number(await db.get(KV_STORE, MIGRATION_FLAG)) || 0;
      if (!migratedAt) return;
      const expiresAt = migratedAt + FALLBACK_DAYS * 86400000;
      if (Date.now() < expiresAt) return;
      const toRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.indexOf(GTG_PREFIX) === 0) toRemove.push(key);
      }
      toRemove.forEach(k => localStorage.removeItem(k));
    } catch (_) {}
  }

  async getItem(key) {
    const db = await this._getDB();
    const val = await db.get(KV_STORE, key);
    return val === undefined ? null : val;
  }

  async setItem(key, value) {
    const db = await this._getDB();
    await db.put(KV_STORE, value, key);
  }

  async removeItem(key) {
    const db = await this._getDB();
    await db.delete(KV_STORE, key);
  }

  async clearAll() {
    const db = await this._getDB();
    await db.clear(KV_STORE);
  }

  async getKeys() {
    const db = await this._getDB();
    return await db.getAllKeys(KV_STORE);
  }
}
