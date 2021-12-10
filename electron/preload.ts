// import { generateContextBridge } from "./IPC/General/contextBridge"

// import systemInfo from './IPC/systemInfo';
// import updaterInfo from './IPC/updaterInfo';
// import fileSystem from './IPC/fileSystem';

// generateContextBridge([systemInfo, updaterInfo, fileSystem]);

// window.require = require;

// const { contextBridge, ipcRenderer } = require("electron");
// contextBridge.exposeInMainWorld(
//     "api", {
//         send: (channel: string, data: string | object) => {
//             // whitelist channels
//             // let validChannels = ["toMain"];
//             // if (validChannels.includes(channel)) {
//                 return ipcRenderer.invoke(channel, data);
//             // }
//         },
//         receive: (channel: string, func: Function) => {
//             // let validChannels = ["fromMain"];
//             // if (validChannels.includes(channel)) {
//                 // Deliberately strip event as it includes `sender` 
//                 ipcRenderer.on(channel, (event, ...args) => func(...args));
//             // }
//         }
//     }
// );