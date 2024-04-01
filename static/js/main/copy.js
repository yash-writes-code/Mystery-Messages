function CopyLink(base_url) {
    
    var copyText = document.getElementById("link");
    var textArea = document.createElement("textarea");
    textArea.value = String(base_url).concat(copyText.getAttribute('href').slice(1,));
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    // navigator.clipboard.writeText(textArea.value);  test if this works
    document.body.removeChild(textArea);
    alert("Link Copied");
}