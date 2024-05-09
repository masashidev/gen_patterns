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

const canvas1 = new Canvas();


function generateTree(x, y, branchAngle, branchLength, tiltAngle, depth, maxDepth) {
  if(depth > maxDepth) return;

  const leftX = x + Math.cos(branchAngle - tiltAngle) * branchLength;
  const leftY = y + Math.sin(branchAngle - tiltAngle) * branchLength;
  const rightX = x + Math.cos(branchAngle + tiltAngle) * branchLength;
  const rightY = y + Math.sin(branchAngle + tiltAngle) * branchLength;

  const leftDot = new Dot(leftX, leftY, 2, "white");
  const rightDot = new Dot(rightX, rightY, 2, "white");

  leftDot.draw();
  rightDot.draw();

  drawLine(x, y, leftX, leftY, 1);
  drawLine(x, y, rightX, rightY, 1);

  const random = Math.random() * 0.5 + 0.75;
  const randomAngle = Math.random() * 0.5 + 0.75;

  generateTree(leftX, leftY, branchAngle , branchLength, tiltAngle, depth + 1, maxDepth);
  generateTree(rightX, rightY, branchAngle , branchLength, tiltAngle, depth + 1, maxDepth);
}

// const initialBranchAngle = Math.PI / 2 * 3;
// const initialBranchLength = 50;
// const initialTiltAngle = Math.PI * 0.3;
// const maxDepth = 7;

// generateTree(x, y, initialBranchAngle, initialBranchLength, initialTiltAngle, 1, maxDepth);





let lastTime = 0;

let angle = 0;
let angle2 = 0;
let angle3 = 0;
let x = center.x;
let y = center.y;
let r = 100
const numberOfLine = 10;

function circulate(angle, radius, center) {
  for(let i = 0; i < numberOfLine; i++) {
    const x = Math.cos(angle) * (radius * i) + center.x;
    const y = Math.sin(angle) * (radius * i) + center.y;
    drawDot(x, y, 2, "white");
  }
}

let speed = 0.001;
let speed2 = 0.001;
let acceleration = 0.001;
let acceleration2 = 0.001;

let previousDotPos = 0

function animation(timestamp) {



  // circulate(angle, r, center);

  // angle += 0.01;
  // angle2 += Math.PI / 180 * 35
  // angle3 += Math.PI / 180 * 20
  // r += Math.sin(angle2) * 0.5 + Math.cos(angle3) * 0.5;

  acceleration = Math.cos(angle) * 0.01;
  speed += acceleration
  angle += speed
  acceleration2 = Math.cos(angle2) * 0.1;
  speed2 +=  acceleration2
  angle2 += speed2;
  x = Math.cos(angle) * r + center.x;
  y = Math.sin(angle2) * r + center.y;


  drawLine(previousDotPos.x, previousDotPos.y, x, y, 2);
  previousDotPos = { x, y };

  requestAnimationFrame(animation);
}

requestAnimationFrame(animation);
