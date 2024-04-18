export function drawDot(ctx, x, y, size = 1, color = "black") {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  ctx.fill();
}
