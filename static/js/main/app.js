let deferredPrompt;

window.addEventListener("beforeinstallprompt",(e)=>{
    e.preventDefault();

    deferredPrompt=e;
    if(!window.matchMedia('(display-mode:standalone)').matches){
    document.getElementById("install-btn").style.display="block";
    }
});

document.getElementById("install-btn").addEventListener("click",(e)=>{
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult)=>{
        deferredPrompt=null;
    })
})