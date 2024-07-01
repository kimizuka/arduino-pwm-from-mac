"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Native
const path_1 = require("path");
const url_1 = require("url");
// Packages
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const electron_next_1 = __importDefault(require("electron-next"));
const serialport_1 = require("serialport");
let serialPort;
let isReadyBoard = false;
serialport_1.SerialPort.list().then((ports) => {
    ports.forEach((port) => {
        if (/usb/.test(port.path)) {
            serialPort = new serialport_1.SerialPort({
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
let mainWindow;
// Prepare the renderer once the app is ready
electron_1.app.on('ready', async () => {
    await (0, electron_next_1.default)('./renderer');
    mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: (0, path_1.join)(__dirname, 'preload.js'),
        },
    });
    const url = electron_is_dev_1.default
        ? 'http://localhost:8000/'
        : (0, url_1.format)({
            pathname: (0, path_1.join)(__dirname, '../renderer/out/index.html'),
            protocol: 'file:',
            slashes: true,
        });
    mainWindow.loadURL(url);
});
// Quit the app once all windows are closed
electron_1.app.on('window-all-closed', electron_1.app.quit);
// listen the channel `message` and resend the received message to the renderer process
electron_1.ipcMain.on('isReady', (_evt) => {
    if (isReadyBoard) {
        mainWindow?.webContents.send('ready');
    }
});
electron_1.ipcMain.on('sendValue3', (_evt, value) => {
    if (isReadyBoard) {
        serialPort.write('3' + String(value).padStart(3, '0') + '\n');
    }
});
electron_1.ipcMain.on('sendValue5', (_evt, value) => {
    if (isReadyBoard) {
        serialPort.write('5' + String(value).padStart(3, '0') + '\n');
    }
});
electron_1.ipcMain.on('sendValue6', (_evt, value) => {
    if (isReadyBoard) {
        serialPort.write('6' + String(value).padStart(3, '0') + '\n');
    }
});
electron_1.ipcMain.on('sendValue9', (_evt, value) => {
    if (isReadyBoard) {
        serialPort.write('9' + String(value).padStart(3, '0') + '\n');
    }
});
electron_1.ipcMain.on('sendValue10', (_evt, value) => {
    if (isReadyBoard) {
        serialPort.write('A' + String(value).padStart(3, '0') + '\n');
    }
});
electron_1.ipcMain.on('sendValue11', (_evt, value) => {
    if (isReadyBoard) {
        serialPort.write('B' + String(value).padStart(3, '0') + '\n');
    }
});
electron_1.ipcMain.on('sendValue13', (_evt, value) => {
    if (isReadyBoard) {
        serialPort.write('D' + String(value).padStart(3, '0') + '\n');
    }
});
