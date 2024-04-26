export class Edge {
  constructor(ctx, start, end, weight) {
    this.ctx = null;
    this.start = null;
    this.end = null;
    this.weight = null;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.start.x, this.start.y);
    this.ctx.lineTo(this.end.x, this.end.y);
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.width;
    this.ctx.stroke();
  }
}
