const mysteryMessage = document.getElementById('mysteryMessage');

// Create a duplicate element off-screen for capturing
const cloneMessage = mysteryMessage.cloneNode(true);
cloneMessage.style.position = 'absolute';
cloneMessage.style.left = '-9999px'; // Move off-screen horizontally
cloneMessage.style.top = '-9999px'; // Move off-screen

document.body.appendChild(cloneMessage);

// Set share text click handler
const shareText = document.getElementById('shareText');
shareText.addEventListener('click', () => {
  // Store original height
  console.log("insideeee");
  const originalHeight = cloneMessage.style.height;

  // Set maxHeight for capturing full length
  cloneMessage.style.maxHeight = '1280px';
  cloneMessage.style.height = '1280px';
  console.log(typeof cloneMessage.childNodes[1]);
  cloneMessage.style.fontSize='30px';
  // console.log(cloneMessage.childNodes);
  html2canvas(cloneMessage).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'mystery-message.png';
    link.href = imgData;
    link.click();

    // Reset the maxHeight after capturing
    cloneMessage.style.maxHeight = originalHeight;

    alert("Instgram Story Template downloaded");
  });
});