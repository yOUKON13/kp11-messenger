import { contextBridge, ipcRenderer, remote } from 'electron';

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sendMessage`
   */

  sendMessage: (message: string, data: any) => {
    ipcRenderer.send('message', message, data);
  },

  getMinimized() {
    return remote.getCurrentWindow().isMinimized();
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.removeAllListeners(channel);
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
};

contextBridge.exposeInMainWorld('Main', api);
