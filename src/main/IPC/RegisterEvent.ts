import { IpcMainInvokeEvent } from 'electron';
import { IPCMethods } from '../../shared/IPC/types/clientToServer';

export default function registerEvent<T extends keyof IPCMethods>(
  method: T,
  ipcMain: Electron.IpcMain,
  handler: (
    param: IPCMethods[T]['request']
  ) => Promise<IPCMethods[T]['response']>
) {
  type Request = IPCMethods[T]['request'];
  type Response = IPCMethods[T]['response'];

  ipcMain.removeHandler(method); // ← add this

  ipcMain.handle(
    method,
    async (event: IpcMainInvokeEvent, param: Request): Promise<Response> => {
      return handler(param);
    }
  );
}
