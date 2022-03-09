const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const ipc = ipcMain

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 740,
    minWidth: 940,
    minHeight: 560,
    frame: false,
    webPreferences: {
        transparent:true,
        nodeIntegration: true,
        contextIsolation: false,
        devTools:false,
        preload: path.join(__dirname, 'preload.js')
    }
  })

    win.loadFile('src/index.html')
    
    


     //// MINIMIZE APP
     ipc.on('minimizeApp', ()=>{
        console.log('Clicked on Minimize Btn')
        win.minimize()
    })


    //// MAXIMIZE RESTORE APP
    ipc.on('maximizeRestoreApp', ()=>{
        if(win.isMaximized()){
            console.log('clicked on Restore')
            win.restore()
          } else {
            console.log('clicked on Maximize')
            win.maximize()  
          } 
    })


    // Check if it is Maximized
  win.on('maximize', ()=>{
    win.webContents.send('isMaximized')
  })
  
  // Check if it is Restored
  win.on('unmaximize', ()=>{
    win.webContents.send('isRestored')
  })



    //// CLOSE APP
    ipc.on('closeApp', ()=>{
    console.log('Clicked on Close Btn')
    win.close()
})

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
