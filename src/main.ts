import { app, BrowserWindow, ipcMain } from "electron";
import log from "electron-log";
import path from "path";

const isDev = process.env.NODE_ENV === "development";
const windowMinHeight = 600;
const windowMinWidth = 800;

if (isDev)
{
    require("electron-reload")(__dirname, {
        electron: path.resolve(
            __dirname,
            process.platform === "win32"
                ? "../node_modules/electron/dist/electron.exe"
                : "../node_modules/.bin/electron"
        ),
    });
}

const createWindow = () =>
{
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
        },
        title: "QuickRun",
        minHeight: windowMinHeight,
        minWidth: windowMinWidth,
        titleBarStyle: "hidden",
        useContentSize: true,
    });

    if (isDev) mainWindow.webContents.openDevTools({ mode: "detach" });
    mainWindow.loadFile("dist/index.html");
};

app.whenReady().then(createWindow);
