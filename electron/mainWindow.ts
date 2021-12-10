import { app, BrowserWindow, session } from "electron";
import path from "path";
import EventEmitter from "events";
import ConfigureDev from "./configureDev";
import { DeveloperOptions } from "./configureDev";
import Store from "electron-store";
const appName = "123";

const defaultSettings = {
  title: appName,
  width: 854,
  height: 480,
};

const defaultSettingsDev: DeveloperOptions = {
  isInProduction: true, // true if is in production
  serveSvelteDev: true, // true when you want to watch svelte
  buildSvelteDev: false, // true when you want to build svelte
  watchSvelteBuild: false, // true when you want to watch build svelte
};
const store = new Store({
  defaults: {
    // 800x600 is the default size of our window
    windowBounds: { width: 800, height: 1000 },
  },
});
let displays: any;
class Main {
  window!: BrowserWindow;
  settings: { [key: string]: any };
  onEvent: EventEmitter = new EventEmitter();
  settingsDev: DeveloperOptions;
  configDev: ConfigureDev;

  constructor(
    settings: { [key: string]: any } | null = null,
    settingsDev: DeveloperOptions | null = null
  ) {
    this.settings = settings ? { ...settings } : { ...defaultSettings };
    this.settingsDev = defaultSettingsDev
    // settingsDev
    //   ? { ...settingsDev }
    //   : { ...defaultSettingsDev };
    this.configDev = new ConfigureDev(this.settingsDev);

    app.on("ready", () => {
      let loading = new BrowserWindow({
        show: false,
        frame: false,
        width: 400,
        height: 400,
        transparent: true,
      });

      loading.once("show", async () => {
        store.set("windowBounds", { width: 800, height: 1000 });
        let { width, height } = store.get("windowBounds");

        const settings = {
          width: width,
          height: height,
          title: "Test",
          minWidth: 680,
          minHeight: 800,
          autoHideMenuBar: true,
        };

        this.window = await this.createWindow(settings);
        this.settings.width = width;
        this.settings.height = height;
        this.onEvent.emit("window-created");
        loading.hide();
        loading.close();
        this.window.on("resize", () => {
          let { width, height } = this.window.getBounds();
          store.set("windowBounds", { width, height });
        });
        this.window.on("close", this.onWindowAllClosed);
      });
      loading.loadURL(path.join(__dirname, "www", "loading.html"));
      loading.show();
    });

    app.on("activate", this.onActivate);
  }

  async createWindow(
    settings: { [key: string]: any } | null = null,
    url?: string,
    email?: string,
    file: string = ""
  ) {
    if (!settings) settings = { ...this.settings };
    let ses;
    if (email) ses = session.fromPartition(`persist:${email}`);
    app.name = appName;
    let window = new BrowserWindow({
      ...settings,
      show: false, // false
      webPreferences: {
        webSecurity: false,
        nodeIntegration: true,
        contextIsolation: false,
        // enableRemoteModule: false,
        additionalArguments: [file],

        preload: path.join(__dirname, "preload.js"),
        session: ses,
      },
    });
    if (this.configDev.isLocalHost() && !url) {
      try {
        await window.loadURL("http://localhost:3000/");
      } catch (error) {
        console.log(`ERROR: window.loadURL("http://localhost:3000/");`)
        console.log(error)
      }
    }
    else if (this.configDev.isElectronServe() && !url) {
      try {
        await this.configDev.loadURL(window);
      } catch (error) {
      }
    } else if (!this.configDev.isElectronServe() && url !== undefined) {
      try {
        await window.loadURL(url);
      } catch (error) {
      }
    } else if (this.configDev.isElectronServe() && url) {
      this.configDev.loadURL(window);
      window.webContents.loadURL("/home")
      console.log(url)

    }
    window.show();

    return window;
  }


  onWindowAllClosed() {
    if (process.platform !== "darwin") {
      app.quit();
    }
  }

  onActivate() {
    if (!this.window) {
      this.createWindow();
    }
  }
}
export default Main;
