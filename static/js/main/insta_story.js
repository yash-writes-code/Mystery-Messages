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
  }).then(canvas => {
      // Remove the clone to clean up the document
      document.body.removeChild(cloneMessage);

      // Create a new canvas to adjust the final image dimensions
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = 720; // Set the final image width
      finalCanvas.height = 1280; // Set the final image height
      const ctx = finalCanvas.getContext('2d');

      // Draw the captured canvas onto the final canvas at desired dimensions
      ctx.drawImage(canvas, 0, 0, finalCanvas.width, finalCanvas.height);

      // Convert to DataURL or Blob as needed
      finalCanvas.toBlob(blob => {
          const link = document.createElement('a');
          link.download = 'mystery-message.png';
          link.href = URL.createObjectURL(blob);
          link.click();
          // Remember to revoke the blobURI when done
          URL.revokeObjectURL(link.href);
      }, 'image/png');
  });
});
