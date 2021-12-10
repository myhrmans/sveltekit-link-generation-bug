import { ipcMain} from "electron";
import { autoUpdater } from "electron-updater";
import Main from "./mainWindow";

import systemInfo from "./IPC/systemInfo";
import updaterInfo from "./IPC/updaterInfo";
import fileSystem from "./IPC/fileSystem";

const developerOptions = {
  isInProduction: false, // true if is in production
  serveSvelteDev: true, // true when you want to watch svelte
  buildSvelteDev: false, // true when you want to build svelte
  watchSvelteBuild: false, // true when you want to watch build svelte
};


const windowSettings = {
  title: "Prototyping Tool - Figma, videos, pictures",
  width: 800,
  height: 1000,
};

let main = new Main(windowSettings, developerOptions);

main.onEvent.on("window-created", async () => {
  systemInfo.initIpcMain(ipcMain, main.window);
  updaterInfo.initIpcMain(ipcMain, main.window);
  fileSystem.initIpcMain(ipcMain, main.window);
  updaterInfo.initAutoUpdater(autoUpdater, main.window);
});