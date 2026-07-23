const { contextBridge, ipcRenderer } = require('electron');

// Remove qualquer Service Worker de sessões anteriores
// (roda antes de app.js ser carregado, evitando a página offline)
if (typeof navigator !== 'undefined' && navigator.serviceWorker) {
  navigator.serviceWorker.getRegistrations().then(regs => {
    regs.forEach(r => r.unregister());
  });
}

contextBridge.exposeInMainWorld('gtgDesktop', {
  isElectron: true,
  platform: process.platform,
  version: process.env.npm_package_version || '1.0.0',

  notify: (title, body) => ipcRenderer.send('notify', { title, body }),

  flashFrame: () => ipcRenderer.send('flash-frame'),

  getAppVersion: () => ipcRenderer.invoke('get-app-version'),

  openExternal: (url) => ipcRenderer.invoke('open-external', url)
});
