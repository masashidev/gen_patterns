function saveCanvasAsImage() {
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "canvas-image.png";
  link.click();
}

// Event listener for keydown
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    // Check if the spacebar was pressed
    saveCanvasAsImage();
  }
});
