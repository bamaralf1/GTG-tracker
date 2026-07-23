import { StorageAdapter } from './adapter.js';

const GTG_PREFIX = "gtg_";

export class AsyncStorageAdapter extends StorageAdapter {
  constructor(asyncStorage) {
    super();
    this._asyncStorage = asyncStorage;
  }

  async getItem(key) {
    try {
      return await this._asyncStorage.getItem(key);
    } catch (e) {
      console.warn("[AsyncStorageAdapter] getItem error:", e);
      return null;
    }
  }

  async setItem(key, value) {
    try {
      await this._asyncStorage.setItem(key, value);
    } catch (e) {
      console.warn("[AsyncStorageAdapter] setItem error:", e);
    }
  }

  async removeItem(key) {
    try {
      await this._asyncStorage.removeItem(key);
    } catch (e) {
      console.warn("[AsyncStorageAdapter] removeItem error:", e);
    }
  }

  async clearAll() {
    try {
      const keys = await this._asyncStorage.getAllKeys();
      const gtgKeys = keys.filter(k => k.indexOf(GTG_PREFIX) === 0);
      if (gtgKeys.length > 0) {
        await this._asyncStorage.multiRemove(gtgKeys);
      }
    } catch (e) {
      console.warn("[AsyncStorageAdapter] clearAll error:", e);
    }
  }

  async getKeys() {
    try {
      const keys = await this._asyncStorage.getAllKeys();
      return keys.filter(k => k.indexOf(GTG_PREFIX) === 0);
    } catch (e) {
      return [];
    }
  }
}
