const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const body = document.querySelector("body");
body.style.backgroundColor = "black";
body.style.display = "flex";
body.style.justifyContent = "center";
body.style.alignItems = "center";

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;
canvas.style.border = "1px solid white";
canvas.style.margin = "10px auto";

const center = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

function drawBackground() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

class Dot {
  constructor(x, y, radius, color, text = null) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.connectedTo = [];
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    if (this.text) {
      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.fillText(this.text, this.x - 10, this.y - 10);
    }
  }

  connectLine(dot) {
    drawLine(this.x, this.y, dot.x, dot.y, 2);
  }

  getDistance(dot) {
    return Math.sqrt((this.x - dot.x) ** 2 + (this.y - dot.y) ** 2);
  }

  isSamePosition(dot) {
    return this.x === dot.x && this.y === dot.y;
  }
}

class Line {
  constructor(x, y, x2, y2, width) {
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    this.width = width;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x2, this.y2);
    ctx.strokeStyle = "white";
    ctx.lineWidth = this.width;
    ctx.stroke();
  }

  getLength() {
    return Math.sqrt((this.x2 - this.x) ** 2 + (this.y2 - this.y) ** 2);
  }
}

function drawDot(x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawLine(x, y, x2, y2, width) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = "white";
  ctx.lineWidth = width;
  ctx.stroke();
}

function drawLines() {
  dots.forEach((dot, index) => {
    const nextDot = dots[index + 1];
    if (nextDot && dot.getDistance(nextDot) < 50) {
      dot.connectLine(nextDot);
    }
  });
}

class Canvas {
  constructor() {
    this.ctx = ctx;
    this.dots = [];
    this.lines = [];
  }

  addDot(dot) {
    this.dots.push(dot);
  }

  addLine(line) {
    this.lines.push(line);
  }

  draw() {
    this.dots.forEach((dot) => {
      dot.draw();
    });

    this.lines.forEach((line) => {
      line.draw();
    });
  }
}


let dots = [];
let dots2 = [];

let lastTime = 0;
const dotAmount = 50
const r = 100;
let newAngle = 0;
let newAngle2 = 0;
const baseAngle = Math.PI * 2 / (dotAmount);
const dotIndexShift = 20;

const leftCenter = {x: center.x - 200, y: center.y}
const rightCenter = {x: center.x + 200, y: center.y}

let randomSpeed = 0
let randomAcc = 0

function createDotsInCircle(dots,centerX, centerY, radius, dotAmount){
  for(let i = 0; i < dotAmount; i++){
    const angle = (Math.PI*2) / dotAmount * i;
    const x = centerX + Math.cos(angle) * radius
    const y = centerY + Math.sin(angle) * radius
    const dot = new Dot(x, y, 2, "white");
    dots.push(dot);
  }
}

function updateDots(dots, center, newAngle = 0){
  dots.forEach((dot, index) => {
    dot.x = center.x + Math.cos(newAngle + (baseAngle * (index))) * (r * Math.sin(newAngle));
    dot.y = center.y + Math.sin(newAngle + (baseAngle * index)) * (r + randomSpeed);
  })
}
function drawDots(dots){
  dots.forEach((dot) => {
    dot.draw();
  })
}
function drawLinesBetweenArray(dots, dots2){
  dots.forEach((dot, index) => {
    drawLine(dot.x, dot.y, dots2[(index+dotIndexShift)%dots.length].x, dots2[(index+dotIndexShift)%dots.length].y, 2);
  })
}

createDotsInCircle(dots, center.x, center.y, r, dotAmount);
createDotsInCircle(dots2, center.x, center.y, r, dotAmount);
function animation(timestamp) {
  drawBackground();
  updateDots(dots, leftCenter, newAngle);
  updateDots(dots2, rightCenter, newAngle2);
  drawDots(dots)
  drawDots(dots2)
  drawLinesBetweenArray(dots, dots2);
  const randomAngle = Math.random() * 0.01
  newAngle += randomAngle;
  newAngle2 -= 0.01;
  // randomAcc = Math.random() * 5 - 2.5
  // randomSpeed += randomAcc
  requestAnimationFrame(animation);
}

//  requestAnimationFrame(animation);
