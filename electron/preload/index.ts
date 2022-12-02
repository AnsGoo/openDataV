import os from 'os';
import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  platform: os.platform(),
});
