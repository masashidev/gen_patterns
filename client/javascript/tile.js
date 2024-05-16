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
function createCell(x, y, width, height, color) {
  cells.push({ x, y, width, height, color });
}




function drawDot(x, y, size = 5, color = "white") {
  ctx.beginPath();
  ctx.fillStyle = `${color}`
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
}
function drawDots(dots){
  dots.forEach(dot => {
    drawDot(dot.x, dot.y, dot.size);
  });
}


function drawText(x, y, text, size=20) {
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
function drawGrid(width, height, grid){
  for(let i = 0; i < grid; i++) {
    drawLine(0, i * height, canvas.width, i * height);
    drawLine(i * width, 0, i * width, canvas.height);
  }
}

function fillCell(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function followTarget(x, y, targetX, targetY) {
  const dx = targetX - x;
  const dy = targetY - y;
  const angle = Math.atan2(dy, dx);
  const distance = Math.sqrt(dx ** 2 + dy ** 2);
  if(distance > 50){
  return {
    x: x + Math.cos(angle) * 10,
    y: y + Math.sin(angle) * 10
  }
  } else {
    return {
      x,
      y
  }}
}

const dots = [];
const lines = [];
const cells = [];


const cell = 40
const width = canvas.width/cell
const height = canvas.height/cell

// for(let i = 0; i < cell; i++) {
//   for(let j = 0; j < cell; j++) {
//     createCell(i * width, j * height, width, height, "black");
//     const centerX = width/2 + i * width;
//     const centerY = height/2 + j * height;
//     createDot(centerX, centerY, 2);
//   }
// }

// for(let i = 0; i < cell; i++) {
//   for(let j = 0; j < cell; j++) {
//     const centerX = width/2 + i * width;
//     const centerY = height/2 + j * height;
//     const randomX = Math.random() * width - width/2;
//     const randomY = Math.random() * height - height/2;
//     createDot(centerX - randomX , centerY - randomY, 2);
//   }
// }


// drawDots(dots);
// drawGrid(width, height, cell);
// fillCell(0, 0, width, height, "red");

// cells.forEach(cell => {
//   const threshold = 0.5;
//   const random = Math.random()
//   if(random < threshold) {
//     fillCell(cell.x, cell.y, cell.width, cell.height, "gray");
//     cell.filled = true;
//   }
// })

// const filledCellsCount = cells.filter(cell => cell.filled).length;
// drawText(center.x, center.y, filledCellsCount, 30);

const move = {
  up: () => self.y -= 10,
  down: () => self.y += 10,
  left: () => self.x -= 10,
  right: () => self.x += 10,
}

let direction = "right";
let movement = false;

function setup() {
  window.addEventListener("keydown", (e) => {
    movement = true
    switch(e.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
    }
  })

  window.addEventListener("keyup", (e) => {
    movement = false;
  })

  window.addEventListener("mousemove", (e) => {
    self.x = e.clientX - canvasLeft;
    self.y = e.clientY - canvasTop;
  })
}

let self = {
  x: center.x,
  y: center.y,
  size: 5,
  color: "white",
}


const followers = []

const followersAmount = 5;
for(let i = 0; i < followersAmount; i++) {
  followers.push({
    x: center.x,
    y: center.y,
    size: 5,
    color: "red",
  })
}


let lastTime = 0;
function loop(timestamp) {
  drawBackground();
  drawDot(self.x, self.y, self.size, "khaki");
  followers.forEach(follower => {
    drawDot(follower.x, follower.y, follower.size, follower.color);
  })
  if(timestamp - lastTime > 1000) {

    lastTime = timestamp;
  }
  if(movement) {
    move[direction]();
  }
  followers.forEach((follower, index)=>{
    let targetX = 0;
    let targetY = 0;
    if(index===0){
      targetX = self.x;
      targetY = self.y;
    } else {
      targetX = followers[index - 1].x;
      targetY = followers[index - 1].y;
    }
    const target = followTarget(follower.x, follower.y, targetX, targetY);
    follower.x = target.x;
    follower.y = target.y;
  }
  )
  requestAnimationFrame(loop);
}

setup();
// requestAnimationFrame(loop);
