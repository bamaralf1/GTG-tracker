const { app, BrowserWindow, Menu, shell, ipcMain, Notification, Tray, nativeImage, session } = require('electron');
const path = require('path');
const fs = require('fs');

const WEB_DIR = app.isPackaged
  ? path.join(process.resourcesPath, 'web')
  : path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(app.getPath('userData'), 'window-bounds.json');

let mainWindow;
let tray;
const isDev = !app.isPackaged;

function getIcon(size = 64) {
  const iconPath = path.join(__dirname, 'build', `icon${size > 48 ? '' : '-' + size}.png`);
  if (fs.existsSync(iconPath)) return iconPath;
  return path.join(__dirname, 'build', 'icon.png');
}

function loadBounds() {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    }
  } catch (_) {}
  return null;
}

function saveBounds(bounds) {
  try {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(bounds));
  } catch (_) {}
}

function createWindow() {
  const saved = loadBounds();

  mainWindow = new BrowserWindow({
    width: saved?.width || 1200,
    height: saved?.height || 800,
    minWidth: 900,
    minHeight: 600,
    x: saved?.x,
    y: saved?.y,
    title: 'GTG Tracker',
    backgroundColor: '#0a0a0a',
    icon: getIcon(256),
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  mainWindow.loadFile(path.join(WEB_DIR, 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (saved?.maximized) mainWindow.maximize();
  });

  mainWindow.on('close', () => {
    if (!mainWindow.isMaximized()) {
      saveBounds(mainWindow.getBounds());
    } else {
      saveBounds({ maximized: true, ...mainWindow.getBounds() });
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:') || url.startsWith('http:')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  mainWindow.on('page-title-updated', (e) => e.preventDefault());

  if (isDev) mainWindow.webContents.openDevTools({ mode: 'detach' });
}

function buildMenu() {
  const template = [
    {
      label: 'GTG Tracker',
      submenu: [
        { label: 'Sobre', role: 'about' },
        { type: 'separator' },
        { label: 'Recarregar', accelerator: 'CmdOrCtrl+R', role: 'reload' },
        { label: 'Ferramentas', accelerator: 'F12', role: 'toggleDevTools' },
        { type: 'separator' },
        { label: 'Sair', accelerator: 'CmdOrCtrl+Q', role: 'quit' }
      ]
    },
    {
      label: 'Editar',
      submenu: [
        { role: 'undo', label: 'Desfazer' },
        { role: 'redo', label: 'Refazer' },
        { type: 'separator' },
        { role: 'cut', label: 'Cortar' },
        { role: 'copy', label: 'Copiar' },
        { role: 'paste', label: 'Colar' },
        { role: 'selectAll', label: 'Selecionar Tudo' }
      ]
    },
    {
      label: 'Exibir',
      submenu: [
        { role: 'resetZoom', label: 'Zoom 100%' },
        { role: 'zoomIn', label: 'Aumentar Zoom' },
        { role: 'zoomOut', label: 'Diminuir Zoom' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Tela Cheia', accelerator: 'F11' }
      ]
    },
    {
      label: 'Janela',
      submenu: [
        { role: 'minimize', label: 'Minimizar' },
        { role: 'close', label: 'Fechar' }
      ]
    },
    {
      label: 'Ajuda',
      submenu: [
        { label: 'Método GTG', click: () => shell.openExternal('https://www.strongfirst.com') },
        { label: 'Repositório', click: () => shell.openExternal('https://github.com/bamaralf1/GTG-tracker') },
        { type: 'separator' },
        { label: 'DevTools', accelerator: 'CmdOrCtrl+Shift+I', role: 'toggleDevTools' }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

function setupIPC() {
  ipcMain.on('notify', (_, { title, body }) => {
    if (mainWindow && !mainWindow.isFocused()) {
      mainWindow.flashFrame(true);
    }
    const n = new Notification({ title, body, icon: getIcon() });
    n.on('click', () => { if (mainWindow) { mainWindow.show(); mainWindow.focus(); } });
    n.show();
  });

  ipcMain.on('flash-frame', () => {
    if (mainWindow && !mainWindow.isFocused()) mainWindow.flashFrame(true);
  });

  ipcMain.handle('get-app-version', () => app.getVersion());
}

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
      mainWindow.flashFrame(false);
    }
  });

  app.whenReady().then(async () => {
    // Limpa Service Workers para evitar página offline do PWA
    await session.defaultSession.clearStorageData({ storages: ['serviceworkers'] });

    buildMenu();
    setupIPC();
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
