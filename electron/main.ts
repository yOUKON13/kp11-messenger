import { app, BrowserWindow, ipcMain, Notification } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath();

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 1100,
    height: 700,
    minHeight: 600,
    minWidth: 800,
    backgroundColor: '#191622',
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      enableRemoteModule: true,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('resize', () => {
    mainWindow!.webContents.send('resize', mainWindow?.isMaximized());
  });

  mainWindow.on('focus', () => {
    mainWindow!.webContents.send('focus', true);
  });

  mainWindow.on('blur', () => {
    mainWindow!.webContents.send('focus', false);
  });
}

async function registerListeners() {
  ipcMain.on('message', (_, message: string, data: any) => {
    switch (message) {
      case 'close':
        mainWindow?.close();
        break;
      case 'minimize':
        mainWindow?.minimize();
        break;
      case 'maximize':
        if (mainWindow?.isMaximized()) {
          mainWindow?.unmaximize();
        } else {
          mainWindow?.maximize();
        }
        break;
    }
  });
}

app
  .on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e));

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
