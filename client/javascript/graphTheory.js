
class App {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.body = document.querySelector("body");
    this.body.style.backgroundColor = "black";
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.loop();
  }

  drawBackground() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawRect(x, y, width, height, color) {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  drawLine(x1, y1, x2, y2, color = "black") {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  drawDot(x, y, size = 5, color = "white") {
    this.ctx.beginPath();
    this.ctx.fillStyle = `${color}`;
    this.ctx.arc(x, y, size, 0, Math.PI * 2);
    this.ctx.fill();
  }

  loop() {
    this.drawBackground();
    this.drawRect(100, 100, 100, 100, "white");
    this.drawLine(100, 100, 200, 200, "white");
    this.drawDot(100, 100, 5, "white");
    requestAnimationFrame(() => this.loop());
  }
}

const app = new App();
