const { ipcRenderer } = require('electron')
const maxResBtn = document.getElementById('maxResBtn')
const ipc = ipcRenderer



/// MINIMIZE APP
minimizeBtn.addEventListener('click', ()=>{
    ipc.send('minimizeApp')
 })

 ///CLOSE APP
 closeBtn.addEventListener('click', ()=>{
   ipc.send('closeApp')
})


 /// MAXIMIZE RESTORE APP

 function changeMaxResBtn(isMaximizedApp){
    if(isMaximizedApp){
       maxResBtn.title = 'Restore'
       maxResBtn.classList.remove('maximizeBtn')
       maxResBtn.classList.add('restoreBtn')

    }else{
       maxResBtn.title = 'Maximize'
       maxResBtn.classList.remove('restoreBtn')
       maxResBtn.classList.add('maximizeBtn')
    }
}
maxResBtn.addEventListener('click', ()=>{
    ipc.send('maximizeRestoreApp')
 })

 ipc.on('isMaximized', ()=> { changeMaxResBtn(true) })
 ipc.on('isRestored', ()=> { changeMaxResBtn(false) })



