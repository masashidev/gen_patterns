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

const canvasLeft = canvas.offsetLeft;
const canvasTop = canvas.offsetTop;

function drawBackground() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function createText(x, y, text) {
  texts.push({ x, y, text });
}
function createDot(x, y, size = 5) {
  dots.push({ x, y, size });
}
function createObject(x, y, width, height, color) {
  objects.push({ x, y, width, height, color });
}

function drawDot(x, y, size = 5, color = "white") {
  ctx.beginPath();
  ctx.fillStyle = `${color}`;
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
}
function drawDotInStroke(x, y, size = 5, color = "white") {
  ctx.beginPath();
  ctx.strokeStyle = `${color}`;
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.stroke();
}
function drawDots(dots) {
  dots.forEach((dot) => {
    drawDot(dot.x, dot.y, dot.size);
  });
}
function drawObject(object) {
  ctx.beginPath();
  ctx.fillStyle = object.color;
  ctx.fillRect(object.x, object.y, object.width, object.height);
}
function drawObjects(objects) {
  objects.forEach((object) => {
    drawObject(object);
  });
}

function drawText(x, y, text, size = 20) {
  ctx.beginPath();
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(x - size, y - size, 100, 50);
  ctx.fillStyle = "white";
  ctx.font = `${size}px Arial`;
  ctx.fillText(text, x, y);
}

function drawLine(x1, y1, x2, y2) {
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function moveObject(object, x, y) {
  object.x = x;
  object.y = y;
}

function detectCollision(object, x, y) {
  return (
    x >= object.x &&
    x <= object.x + object.width &&
    y >= object.y &&
    y <= object.y + object.height
  );
}


const gridSize = 50
const grid = [];
const cols = Math.ceil(canvas.width / gridSize);
const rows = Math.ceil(canvas.height / gridSize);

function defineGrid() {
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = []
    }
  }
}

const dots = [];
const lines = [];
const objects = [];

function setup() {
  createObject(0, 0, 50, 50, "white");
  createObject(50, 50, 50, 50, "white");
  drawObjects(objects);
}
// setup();


let lastTime = 0;
// add new property to object as tx, ty

let dot = {
  x: 0,
  y: 0,
  tx: 0,
  ty: 0,
  size: 5,
  color: "white",
  speed: 0.05,
  maxSpeed: 50,
  inertiaX: 0,
  inertiaY: 0,
  update: function () {
    const dx = this.tx - this.x;
    const dy = this.ty - this.y;
    const angle = Math.atan2(dy, dx);
    const distance = Math.sqrt(dx ** 2 + dy ** 2);
    const moveDistance = Math.min(distance, this.maxSpeed);
    this.x += Math.cos(angle) * moveDistance * this.speed;
    this.y += Math.sin(angle) * moveDistance * this.speed;
  },
  draw: function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  },
  drawStroke: function () {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.arc(this.tx, this.ty, this.size + 10, 0, Math.PI * 2);
    ctx.stroke();
  },
  drawLine: function (x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
};



let duration = 1000;
function loop(timestamp) {
  const deltaTime = timestamp - lastTime;

  drawBackground();
  if(deltaTime > duration){
    dot.tx = Math.random() * canvas.width;
    dot.ty = Math.random() * canvas.height;

    lastTime = timestamp;
  }
  dot.drawStroke();
  dot.drawLine(dot.x, dot.y, dot.tx, dot.ty);
  dot.update();
  dot.draw();


  requestAnimationFrame(loop);
}


 //requestAnimationFrame(loop);
