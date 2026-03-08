/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { resolveHtmlPath } from './util';
import setIpcRoutes from './startup/ipc.startup';
import fs from 'fs';
import { spawn } from 'child_process';

require('dotenv').config();

interface to_write {
  file_name: string;
  content: string;
  overwrite: boolean;
}

ipcMain.handle('write-to-file', async (event, data: to_write) => {
  const file_path = path.join(app.getAppPath(), "out/", data.file_name);
  try {
    if (data.overwrite) {
      fs.writeFileSync(file_path, data.content); // Overwrites
    } else {
      fs.appendFileSync(file_path, data.content); // Appends
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
});

interface run_test {
  file_name: string;
  file: string;
}

ipcMain.handle('run-test', async (event, data: run_test) => {
  const file_path = path.join(app.getAppPath(), "test/", `${data.file_name}.py`);
  fs.writeFileSync(file_path, data.file);
  return new Promise((resolve) => {
    const proc = spawn('python3', [file_path]);
    
    let err = '';

    proc.stderr.on('data', (out: string) => {
      err += out.toString();
    });

    proc.on('close', (code) => {
      resolve({ exitCode: code, err_out: err });
    });
  });
});

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.removeMenu();

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }

    setIpcRoutes(ipcMain, mainWindow);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

app.on('window-all-closed', () => {
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
