import { drawDot } from "./dots/drawDot.js";
import { Dot } from "./dots/dotClass.js";

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function drawBackground() {
  ctx.fillStyle = "#222222"
  ctx.fillRect(0, 0, width, height);
}
drawBackground();

const centerX = width / 2;
const centerY = height / 2;

const dots = [];

class Circle {
  constructor(x, y, radius, width, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.width = width;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.width;
    ctx.stroke();
  }
}


  const centerDot = new Dot(ctx, centerX, centerY, 10, "white");
  centerDot.draw();
  const circle = new Circle(centerX, centerY, 200, 5, "white");
  circle.draw();



// function drawDotBasedOnAngle(angle, r) {
//   const x = centerX + Math.cos(angle) * r;
//   const y = centerY + Math.sin(angle) * r;
//   const dot = new Dot(ctx, x, y, 10, "white");
//   dot.draw();
// }

function moveDotBasedOnAngle(dot, center, angle, r, speed = 0.001, clockwise = true) {
  const newAngle = clockwise ? angle + speed : angle - speed;

  dot.x = center.x + Math.cos(angle) * r;
  dot.y = center.y + Math.sin(angle) * r;
  dot.draw();

  return newAngle;
}



const movingDot = new Dot(ctx, 0, 0, 3, "white");
const movingDot2 = new Dot(ctx, 0, 0, 3, "white");
const movingDot3 = new Dot(ctx, 0, 0, 3, "white");
let angle1 = 0;
let angle2 = 0;
let angle3 = 0;
let r1 = 100;
let r2 = 50;
let r3 = 20;
let speed1 = 0.03;
let speed2 = 0.09;
let speed3 = 0.09;

function animate() {

  centerDot.draw();
  circle.draw();

  angle1 = moveDotBasedOnAngle(movingDot, centerDot, angle1, r1, speed1, false);
  angle2 = moveDotBasedOnAngle(movingDot2, movingDot, angle2, r2, speed2, true);
  angle3 = moveDotBasedOnAngle(movingDot3, movingDot2, angle3, r3, speed3, false);
  requestAnimationFrame(animate);
}

function createRange(min, max, step, value, top, left) {
  const range = document.createElement("input");
  range.type = "range";
  range.min = min;
  range.max = max;
  range.step = step;
  range.value = value;
  range.style.position = "absolute";
  range.style.top = top;
  range.style.left = left;
  document.body.appendChild(range);
  return range;
}
function createDisplay(top, left, text) {
  const display = document.createElement("div");
  display.style.position = "absolute";
  display.style.top = top;
  display.style.left = left;
  display.style.color = "white";
  display.textContent = text;
  document.body.appendChild(display);
  return display;
}
const range = createRange(0, 200, 1, 100, "10px", "10px");
const radiusDisplay = createDisplay("10px", "200px", "100");
const speedRange = createRange(0, 0.1, 0.001, 0.03, "40px", "10px");
const speedDisplay = createDisplay("40px", "200px", "0.03");

range.addEventListener("input", (e) => {
  r1 = e.target.value;
  speed1 = speedRange.value;
  drawBackground();
  radiusDisplay.textContent = r1;
  speedDisplay.textContent = speed1;
  const centerDot = new Dot(ctx, centerX, centerY, 10, "white");
  centerDot.draw();
  const circle = new Circle(centerX, centerY, 200, 5, "white");
  circle.draw();
  controlDotByRange();
})
speedRange.addEventListener("input", (e) => {
  speed1 = e.target.value;
  r1 = range.value;
  drawBackground();
  radiusDisplay.textContent = r1;
  speedDisplay.textContent = speed1;
  const centerDot = new Dot(ctx, centerX, centerY, 10, "white");
  centerDot.draw();
  const circle = new Circle(centerX, centerY, 200, 5, "white");
  circle.draw();
  controlDotByRange();
})

function controlDotByRange (){

  for (let i = 0; i < 1000; i++) {
    angle1 = moveDotBasedOnAngle(movingDot, centerDot, angle1, r1, speed1, false);
    angle2 = moveDotBasedOnAngle(movingDot2, movingDot, angle2, r2, speed2, true);
    angle3 = moveDotBasedOnAngle(movingDot3, movingDot2, angle3, r3, speed3, false);
  }
}

controlDotByRange();
