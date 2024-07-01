"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electron', {
    onReady: (listener) => electron_1.ipcRenderer.on('ready', listener),
    isReady: () => electron_1.ipcRenderer.send('isReady'),
    sendValue3: (value) => electron_1.ipcRenderer.send('sendValue3', value),
    sendValue5: (value) => electron_1.ipcRenderer.send('sendValue5', value),
    sendValue6: (value) => electron_1.ipcRenderer.send('sendValue6', value),
    sendValue9: (value) => electron_1.ipcRenderer.send('sendValue9', value),
    sendValue10: (value) => electron_1.ipcRenderer.send('sendValue10', value),
    sendValue11: (value) => electron_1.ipcRenderer.send('sendValue11', value),
    sendValue13: (value) => electron_1.ipcRenderer.send('sendValue13', value),
});
