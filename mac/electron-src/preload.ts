import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  onReady: (listener: () => void) => ipcRenderer.on('ready', listener),
  isReady: () => ipcRenderer.send('isReady'),
  sendValue3: (value: number) => ipcRenderer.send('sendValue3', value),
  sendValue5: (value: number) => ipcRenderer.send('sendValue5', value),
  sendValue6: (value: number) => ipcRenderer.send('sendValue6', value),
  sendValue9: (value: number) => ipcRenderer.send('sendValue9', value),
  sendValue10: (value: number) => ipcRenderer.send('sendValue10', value),
  sendValue11: (value: number) => ipcRenderer.send('sendValue11', value),
  sendValue13: (value: number) => ipcRenderer.send('sendValue13', value),
});