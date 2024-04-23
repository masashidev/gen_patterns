export class Dot {
  constructor(ctx, x, y, size, color, content) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.content = content;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    if (this.content) {
      this.ctx.font = "15px Arial";
      this.ctx.fillStyle = "black";
      this.ctx.fillText(this.content, this.x - 5, this.y + 5);
    }
  }
}
