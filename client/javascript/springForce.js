import { Dot } from "./dots/dotClass.js";
import { Circle } from "./circle/circleClass.js";

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function drawBackground() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
}

drawBackground();

class Line {
  constructor(x1, y1, x2, y2, width, color) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.width = width;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.width;
    ctx.stroke();
  }
}

const dot = new Dot(ctx, width / 2, height / 2, 10, "white");

let velocity = 0;
let y = 150;
let restLength = 100;
let k = 0.01;

function animate(){
  drawBackground();
  let displacement = y - restLength;
  console.log("displacement:" + displacement);
  let force = -k * displacement;
  dot.y = y;
  dot.draw();
  // velocity += force
  y += force;
  requestAnimationFrame(animate);

}

// animate();
