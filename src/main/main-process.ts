import { app, BrowserWindow } from "electron";

const isDev = process.env.NODE_ENV !== "production";

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

  if (isDev) {
    win.loadURL("http://localhost:6564");
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    win.loadFile("./dist/index.html");
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
});
