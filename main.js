// Module to control application life.
// Module to create native browser window.
const {app, BrowserWindow, Tray} = require('electron');
const electron = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let mainWindowPos = {};
let tray;

// Don't show the app in the doc
app.dock.hide();

function calculateWindowPosition(width, height, tray) {
    // get Display: a) Primary Display; b) Display near to cursor
    //let display = electron.screen.getDisplayNearestPoint(cursor);
    let display = electron.screen.getPrimaryDisplay();

    let workArea = display.workArea;
    console.log("WorkArea:" + JSON.stringify(workArea));

    let trayBounds = tray.getBounds();
    console.log("Tray bounds:" +  JSON.stringify(trayBounds));


    // Assume window is not bigger than working area
    let pos = {};
    pos.width = width;
    pos.height = height;

    let t = 100; // Assume tray size max 100
    pos.top = workArea.y;
    pos.bottom = workArea.y + workArea.height - pos.height;
    pos.left = workArea.x;
    pos.right = workArea.x + workArea.width - pos.width;

    if (trayBounds.x < t && trayBounds.y > t) {
        console.log("Tray is left");
        pos.x = pos.left;
        pos.y = pos.bottom;
    }
    if (trayBounds.x > t && trayBounds.y > t) {
        console.log("Tray is bottom");
        pos.x = pos.right;
        pos.y = pos.bottom;
    }
    if (trayBounds.x > t && trayBounds.y < t) {
        console.log("Tray is right");
        pos.x = pos.right;
        pos.y = pos.bottom;
    }
    if (trayBounds.x > t && trayBounds.y < t) {
        console.log("Tray is top");
        pos.x = pos.right;
        pos.y = pos.top;
    }
    console.log("Window position:" +  JSON.stringify(pos));

    return {x: pos.x, y: pos.y, width: pos.width, height: pos.height};
}
function createTray() {
    tray = new Tray(`${__dirname}/resources/electorn-logo.png`);
    tray.on('right-click', toggleWindow);
    tray.on('double-click', toggleWindow);
    tray.on('click', function (event) {
        toggleWindow();

        // Show devtools when command clicked
        if (mainWindow.isVisible() && process.defaultApp && event.metaKey) {
            mainWindow.openDevTools({mode: 'detach'})
        }
    })
}

function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: mainWindowPos.width,
        height: mainWindowPos.height,
        x: mainWindowPos.x,
        y: mainWindowPos.y,
        show: false,
        frame: false,
        fullscreenable: false,
        resizable: false,
        transparent: false
        //center: true
        //acceptFirstMouse: true
    });

    console.log("BrowserWindow Position:" +  mainWindow.getPosition());
    console.log("BrowserWindow WindowSize:" +  mainWindow.getSize());
    console.log("BrowserWindow ContentSize:" +  mainWindow.getContentSize());


    // and load the index.html of the app
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    })
}

function toggleWindow() {
    if (mainWindow.isVisible()) {
        mainWindow.hide();
    } else {
        showWindow();
    }
}

function showWindow() {
    mainWindow.setPosition(mainWindowPos.x, mainWindowPos.y, false);
    mainWindow.show();
    mainWindow.focus();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  let cursor = electron.screen.getCursorScreenPoint();
  console.log("Cursor:" + JSON.stringify(cursor));

  createTray();
  mainWindowPos = calculateWindowPosition(800, 600, tray);
  createWindow(mainWindowPos);
});

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
        createWindow(windowPos);
    }
});
