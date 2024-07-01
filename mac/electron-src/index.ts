// Native
import { join } from 'path';
import { format } from 'url';

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent } from 'electron';
import isDev from 'electron-is-dev';
import prepareNext from 'electron-next';

import { SerialPort } from 'serialport';

let serialPort: SerialPort;
let isReadyBoard = false;

SerialPort.list().then((ports) => {
  ports.forEach((port) => {
    if (/usb/.test(port.path)) {
      serialPort = new SerialPort({
        path: port.path,
        baudRate: 115200,
      });

      console.log(port.path);

      serialPort.on('open', () => {
        console.log('Serial port is open');
        isReadyBoard = true;
      });
    }
  });
});

let mainWindow: BrowserWindow | null;

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer');

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, 'preload.js'),
    },
  });

  const url = isDev
    ? 'http://localhost:8000/'
    : format({
        pathname: join(__dirname, '../renderer/out/index.html'),
        protocol: 'file:',
        slashes: true,
      });

  mainWindow.loadURL(url);
});

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit);

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('isReady', (_evt: IpcMainEvent) => {
  if (isReadyBoard) {
    mainWindow?.webContents.send('ready');
  }
});

ipcMain.on('sendValue3', (_evt: IpcMainEvent, value: number) => {
  if (isReadyBoard) {
    serialPort.write('3' + String(value).padStart(3, '0') + '\n');
  }
});

ipcMain.on('sendValue5', (_evt: IpcMainEvent, value: number) => {
  if (isReadyBoard) {
    serialPort.write('5' + String(value).padStart(3, '0') + '\n');
  }
});

ipcMain.on('sendValue6', (_evt: IpcMainEvent, value: number) => {
  if (isReadyBoard) {
    serialPort.write('6' + String(value).padStart(3, '0') + '\n');
  }
});

ipcMain.on('sendValue9', (_evt: IpcMainEvent, value: number) => {
  if (isReadyBoard) {
    serialPort.write('9' + String(value).padStart(3, '0') + '\n');
  }
});

ipcMain.on('sendValue10', (_evt: IpcMainEvent, value: number) => {
  if (isReadyBoard) {
    serialPort.write('A' + String(value).padStart(3, '0') + '\n');
  }
});

ipcMain.on('sendValue11', (_evt: IpcMainEvent, value: number) => {
  if (isReadyBoard) {
    serialPort.write('B' + String(value).padStart(3, '0') + '\n');
  }
});

ipcMain.on('sendValue13', (_evt: IpcMainEvent, value: number) => {
  if (isReadyBoard) {
    serialPort.write('D' + String(value).padStart(3, '0') + '\n');
  }
});