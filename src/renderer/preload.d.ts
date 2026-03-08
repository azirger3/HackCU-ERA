import { ElectronHandler } from 'main/preload';
import { WriteToFile } from 'main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electron: ElectronHandler;
    write_to_file: WriteToFile;
  }
}

export {};
