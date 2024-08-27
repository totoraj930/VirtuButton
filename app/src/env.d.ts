/// <reference types="vite/client" />
import type { IpcRenderer } from '@/src-electron/preload';

declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
    api: typeof api;
  }
}
