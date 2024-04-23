export class Circle {
  constructor(ctx, x, y, radius, width, color) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.width = width;
    this.color = color;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.width;
    this.ctx.stroke();
  }
}
