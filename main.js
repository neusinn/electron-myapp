// Module to control application life.
// Module to create native browser window.
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

app.on('ready', () => {
    // Create the browser window.
    mainWindow = new BrowserWindow()
    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/index.html`)
})