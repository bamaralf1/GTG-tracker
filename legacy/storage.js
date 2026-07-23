/* =============================================================================
 * storage.js — Camada de persistência sobre IndexedDB
 * -----------------------------------------------------------------------------
 * Substitui localStorage.{getItem,setItem,removeItem} por equivalentes
 * ASSÍNCRONOS, mantendo EXATAMENTE a mesma semântica:
 *
 *   getItem(key)    -> Promise<string | null>   (null quando inexistente)
 *   setItem(key, v) -> Promise<void>            (v é string, igual ao localStorage)
 *   removeItem(key) -> Promise<void>
 *
 * Assim o app.js só precisa trocar `localStorage.getItem(k)` por `await getItem(k)`
 * e adicionar async/await onde for necessário — sem mexer em JSON.parse/stringify
 * nem na estrutura dos dados.
 *
 * Migração automática: na primeira execução, copia TODAS as chaves GTG do
 * localStorage para o IndexedDB (uma única vez). NÃO apaga o localStorage — ele
 * fica congelado como snapshot/fallback por 30 dias; após esse prazo é limpo.
 *
 * Usa a lib `idb` (build UMD via CDN), exposta como window.idb com openDB().
 * ========================================================================== */

const STORAGE_DB_NAME = "gtg_store";
const STORAGE_DB_VERSION = 1;
const KV_STORE = "kv";                       // object store chave-valor (keyPath null = out-of-line keys)
const MIGRATION_FLAG = "gtg_idb_migrated_at"; // value = timestamp (ms) em que migrou
const GTG_PREFIX = "gtg_";                    // prefixo de chaves a migrar do localStorage
const FALLBACK_DAYS = 30;                     // por quantos dias manter o localStorage intacto

let dbPromise = null;

function getDB() {
  if (!dbPromise) {
    if (typeof idb === "undefined") {
      throw new Error("[storage] lib 'idb' não carregada. Verifique o <script> do CDN no index.html.");
    }
    dbPromise = idb.openDB(STORAGE_DB_NAME, STORAGE_DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(KV_STORE)) {
          // out-of-line keys: usamos key arbitrária (string) em cada put/get
          db.createObjectStore(KV_STORE);
        }
      }
    });
  }
  return dbPromise;
}

/* ---------------------------------------------------------------------------
 * Migração única localStorage -> IndexedDB.
 * Copia todas as chaves GTG_* se a migração ainda não tiver rodado.
 * Não apaga nada do localStorage.
 * ------------------------------------------------------------------------- */
async function migrarDeLocalStorage() {
  try {
    const db = await getDB();
    const jaMigrado = await db.get(KV_STORE, MIGRATION_FLAG);
    if (jaMigrado) return; // já migrou antes — idempotente

    let copiadas = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.indexOf(GTG_PREFIX) === 0) {
        const raw = localStorage.getItem(key);
        if (raw !== null) {
          await db.put(KV_STORE, raw, key);
          copiadas++;
        }
      }
    }
    await db.put(KV_STORE, String(Date.now()), MIGRATION_FLAG);
    console.info(
      `[storage] Migração concluída: ${copiadas} chave(s) copiada(s) de localStorage -> IndexedDB. ` +
      `localStorage mantido intacto como fallback por ${FALLBACK_DAYS} dias.`
    );
  } catch (e) {
    console.error("[storage] Falha na migração localStorage -> IndexedDB:", e);
  }
}

/* ---------------------------------------------------------------------------
 * Após FALLBACK_DAYS, remove o snapshot do localStorage (já está seguro no IDB).
 * Roda de forma silenciosa; se falhar, não afeta o app.
 * ------------------------------------------------------------------------- */
async function limparFallbackExpirado() {
  try {
    const db = await getDB();
    const migradoEm = Number(await db.get(KV_STORE, MIGRATION_FLAG)) || 0;
    if (!migradoEm) return;
    const expiraEm = migradoEm + FALLBACK_DAYS * 86400000;
    if (Date.now() < expiraEm) return;

    const paraRemover = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.indexOf(GTG_PREFIX) === 0) paraRemover.push(key);
    }
    paraRemover.forEach(k => localStorage.removeItem(k));
    console.info(`[storage] Fallback expirado: ${paraRemover.length} chave(s) GTG removida(s) do localStorage.`);
  } catch (e) {
    /* noop — fallback permanece, sem dano */
  }
}

/* ============================ API PÚBLICA ================================= */

async function getItem(key) {
  const db = await getDB();
  const val = await db.get(KV_STORE, key);
  return val === undefined ? null : val; // mesma semântica do localStorage
}

async function setItem(key, value) {
  const db = await getDB();
  await db.put(KV_STORE, value, key);
}

async function removeItem(key) {
  const db = await getDB();
  await db.delete(KV_STORE, key);
}

async function clearAll() {
  const db = await getDB();
  await db.clear(KV_STORE);
}

/* ---------------------------------------------------------------------------
 * Boot: roda migração + checagem de expiração ao carregar o módulo.
 * A primeira leitura do app.js (carregarDados) deve aguardar migrarDeLocalStorage()
 * para garantir que dados antigos do localStorage já estejam no IndexedDB.
 * ------------------------------------------------------------------------- */
window.storageReady = (async () => {
  await migrarDeLocalStorage();
  await limparFallbackExpirado();
})();
