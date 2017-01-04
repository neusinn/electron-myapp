// Module to control application life.
// Module to create native browser window.
const {app, BrowserWindow, Tray} = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let tray;

function createWindow () {


    tray = new Tray(`${__dirname}/resources/electorn-logo.png`);
    let trayBounds = tray.getBounds();
    console.log("Tray bounds x:" +  trayBounds.x + ", y:" +  trayBounds.y );
    console.log("Tray bounds width:" +  trayBounds.width + ", height:" +  trayBounds.height );


    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        //acceptFirstMouse: true

    });

    console.log("BrowserWindow Position:" +  mainWindow.getPosition());
    console.log("BrowserWindow WindowSize:" +  mainWindow.getSize());
    console.log("BrowserWindow ContentSize:" +  mainWindow.getContentSize());

    let screen = require('electron').screen;
    let workArea = screen.getDisplayNearestPoint(screen.getCursorScreenPoint()).workArea;
    console.log("WorkArea x:" +  workArea.x + ", y:" +  workArea.y );
    console.log("WorkArea width:" +  workArea.width + ", height:" +  workArea.height );


    // and load the index.html of the app
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
