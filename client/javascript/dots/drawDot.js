function drawDot(ctx, x, y, size = 1, color = "black", content) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
  if (content) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(content, x - 5, y + 5);
  }
}
