import { Dot } from "./dots/dotClass.js";
import { Circle } from "./circle/circleClass.js";
import { Edge } from "./lines/lineClass.js";

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

const dot = new Dot(ctx, width / 2, height / 2, 4, "white");

let y = height/2 - 100;
let restLengthY = height/2;
let velocityY = 0;
let kY = 0.01;
let displacementY = y - restLengthY;
let forceY = -kY * displacementY;

let x = width/2 - 0;
let restLengthX = width/2;
let velocityX = 0;
let kX = 0.01;
let displacementX = x - restLengthX;
let forceX = -kX * displacementX;

function animate(){
  drawBackground();
  displacementY = y - restLengthY
  forceY = -kY * displacementY;
  displacementX = x - restLengthX
  forceX = -kX * displacementX;
  dot.y = y;
  dot.x = x;
  dot.draw();
  velocityY += forceY;
  y += velocityY;
  velocityY *= 0.99;

  velocityX += forceX;
  x += velocityX;
  velocityX *= 0.99;
  requestAnimationFrame(animate);
}

// animate();

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  restLengthX = e.clientX - rect.left;
  restLengthY = e.clientY - rect.top;
})

window.addEventListener("click", () => {
  velocityX += 10;
})
