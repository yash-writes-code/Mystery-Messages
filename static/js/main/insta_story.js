document.getElementById('shareText').addEventListener('click', function() {
  const mysteryMessage = document.getElementById('mysteryMessage');

  // Create a clone to avoid modifying the original
  const cloneMessage = mysteryMessage.cloneNode(true);
  document.body.appendChild(cloneMessage);

  // Set explicit dimensions for consistency
  cloneMessage.style.width = '720px';
  cloneMessage.style.height = '1280px';
  cloneMessage.style.position = 'fixed';
  cloneMessage.style.left = '0';
  cloneMessage.style.top = '0';
  cloneMessage.style.visibility = 'hidden';

  // Adjust scale to ensure high-quality rendering
  html2canvas(cloneMessage, {
      scale: window.devicePixelRatio, // Capture at the device's pixel ratio
      scrollY: -window.scrollY // Capture entire content even if scrolled
  }).then(canvas => {
      // Remove the clone to clean up the document
      document.body.removeChild(cloneMessage);

      // Convert to DataURL or Blob as needed
      const imgData = canvas.toDataURL('image/png');

      // Create a link and trigger download
      const link = document.createElement('a');
      link.download = 'mystery-message.png';
      link.href = imgData;
      link.click();
  });
});
