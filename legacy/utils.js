let _cssVarCache = null;
function cssVar(name) {
  if (!_cssVarCache) _cssVarCache = new Map();
  if (_cssVarCache.has(name)) return _cssVarCache.get(name);
  try {
    const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || name;
    _cssVarCache.set(name, val);
    return val;
  } catch (_) {
    return name;
  }
}
function _limparCacheCssVar() { _cssVarCache = null; }
function escapeHtml(str) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(str).replace(/[&<>"']/g, c => map[c]);
}

function atualizarBadgeApp() {
  const hoje = new Date().toISOString().slice(0, 10);
  const countHoje = (dados.registros || []).filter(r => r.data === hoje).length;
  if (navigator.setAppBadge) {
    navigator.setAppBadge(countHoje).catch(() => {});
  }
}

function mostrarToast(title, msg, type = "success") {
  const container = document.getElementById("toastContainer"),
    el = document.createElement("div"),
    timeout = "success" === type ? 6e3 : "warning" === type || "info" === type ? 1e4 : 16e3;
  el.className = `toast ${type}`, el.innerHTML = `<div class="toast-title">${escapeHtml(title)}</div><div class="toast-msg">${escapeHtml(msg)}</div>`, container.appendChild(el), setTimeout(() => {
    el.style.animation = "toastOut 0.4s ease forwards", setTimeout(() => el.remove(), 400)
  }, timeout)
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active")
}

function formatarDataPtBR(data) {
  if (!data) return "—";
  const parts = data.split("-");
  return 3 !== parts.length ? data : `${parts[2]}/${parts[1]}/${parts[0]}`
}

function downloadFile(content, fileName, mimeType) {
  const blob = new Blob([content], { type: mimeType }),
    url = URL.createObjectURL(blob),
    link = document.createElement("a");
  link.href = url, link.download = fileName, link.click(), URL.revokeObjectURL(url)
}

function confirmarAcao(e, a, t) {
  let o = document.getElementById("confirmModal");
  o || (o = document.createElement("div"), o.id = "confirmModal", o.className = "modal-overlay", o.innerHTML = '\n      <div class="modal" style="max-width:320px;">\n        <div class="modal-header" style="border-bottom:1px solid rgba(204,0,0,0.3);">\n          <span class="modal-title" id="confirmMsg" style="color:var(--red-bright);"></span>\n        </div>\n        <div class="modal-body">\n          <div id="confirmSub" class="text-mono" style="font-size:12px; color:var(--gray-light); margin-bottom:16px;"></div>\n          <div style="display:flex; gap:10px;">\n            <button class="btn btn-red" style="flex:1;" id="confirmSimBtn">✓ CONFIRMAR</button>\n            <button class="btn btn-outline" style="flex:1;" onclick="document.getElementById(\'confirmModal\').classList.remove(\'active\')">✕ CANCELAR</button>\n          </div>\n        </div>\n      </div>', document.body.appendChild(o)), document.getElementById("confirmMsg").textContent = e, document.getElementById("confirmSub").textContent = a || "";
  document.getElementById("confirmSimBtn").onclick = () => {
    o.classList.remove("active"), t()
  }, o.classList.add("active")
}

