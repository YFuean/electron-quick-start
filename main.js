// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), //预加载模块
      nodeIntegration: true, //开启多线程
    },
  })
  mainWindow.loadFile('index.html')
  // 不要用setMenu(null)
  // mainWindow.setMenu(null)
  mainWindow.setMenuBarVisibility(false)
  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  mainWindow.show()
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
