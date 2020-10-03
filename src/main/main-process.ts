import { app, BrowserWindow } from "electron";
import { join } from "path";

declare const ENVIRONMENT: String;

const IS_DEV = ENVIRONMENT == "development";

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
    },
  });

  if (IS_DEV) {
    win.loadURL("http://localhost:6564");
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    win.loadFile("./dist/index.html");
    win.webContents.openDevTools({ mode: "detach" });
  }

  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
  console.log(">>> __dirname", __dirname, join(__dirname, "index.html"));
});
