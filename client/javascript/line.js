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

const numberOfLine = 30;
function drawLinesInCircle(center, numberOfLine, time) {
  for (let i = 0; i < numberOfLine; i++) {
    const angle = ((Math.PI * 2) / numberOfLine) * i + time * 0.0001;
    const length = 10 * Math.sin(time * 0.001) + 200;
    const to = getToLine(center.x, center.y, angle, length);
    drawLine(center.x, center.y, to.x, to.y, 2);
  }
}

class Dot {
  constructor(x, y, radius, color, text=null) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    if (this.text) {
      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.fillText(this.text, this.x - 10, this.y + 10);
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




const dotAmount = 50;
const dotDistance = 20;
let loopIndex = 0;
const rightAngle = Math.PI / 2;
let dotPerEdge = 1;
let lastIndex = 0;
let repeated = 0;
function generateDotsInVortex() {
  for(let i = 1; i < dotAmount; i++){
    x += Math.cos(angle) * dotDistance;
    y += Math.sin(angle) * dotDistance;
    const dot = new Dot(x, y, 4, "white");
    dots.push(dot);
    dot.draw();

    if (dotPerEdge === i - lastIndex) {
      angle += getRandomAngle();
      lastIndex = i;
      repeated += 1;
      if (repeated === 2) {
        dotPerEdge += 1;
        repeated = 0;
      }
    }

  }
}
function addNewDotInVortex(){
  x += Math.cos(angle) * dotDistance;
  y += Math.sin(angle) * dotDistance;
  const dot = new Dot(x, y, 4, "white");
  dots.push(dot);
  dot.draw();

  if (dotPerEdge === loopIndex - lastIndex) {
      angle += rightAngle;
      lastIndex = loopIndex;
      repeated += 1;
      if (repeated === 2) {
        dotPerEdge += 1;
        repeated = 0;
      }
    }

  loopIndex += 1;
}

function addNewDotWithAngle(){
  angle += getRandomAngle();
  x += Math.cos(angle) * dotDistance;
  y += Math.sin(angle) * dotDistance;
  directDotInfinitely();
  let tryAmount = 10
  dots.forEach(dot => {
    while(dot.getDistance(new Dot(x, y, 4, "white")) < 10 && tryAmount > 0){
      angle = getRandomAngle();
      x += Math.cos(angle) * dotDistance;
      y += Math.sin(angle) * dotDistance;
      directDotInfinitely();
      tryAmount -= 1;
      console.log("tryAmount", tryAmount);
    }
  })
  const dot = new Dot(x, y, 4, "white");
  dots.push(dot);
}

function getRandomAngle(){
  const random = Math.random();
  if(random < 0.33){
    return Math.PI / 2;
  }else if(random < 0.66){
    return Math.PI * 2;
  }else{
    return Math.PI / 2 * 3;
  }

}
function drawDots(){
  dots.forEach(dot => {
    dot.draw();
  })
}
function drawLine(x, y, x2, y2, width){
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = "white";
  ctx.lineWidth = width;
  ctx.stroke();
}

function drawLines(){
  dots.forEach((dot, index) => {
    const nextDot = dots[index + 1];
    if (nextDot && dot.getDistance(nextDot) < 50) {
      dot.connectLine(nextDot);
    }
})}

// function drawLines(){
//   dots.forEach((dot, index) => {
//     const nextDot = dots[index + 1];
//     if (nextDot) {
//       const line = new Line(dot.x, dot.y, nextDot.x, nextDot.y, 2);
//       lines.push(line);
//       if(line.getLength() < 50){
//         line.draw();
//       }
//     }
//   })
// }

function directDotInfinitely(){
  if(x < 0){
    x = canvas.width;
  } else if(x > canvas.width){
    x = 0;
  }
  if(y < 0){
    y = canvas.height;
  } else if(y > canvas.height){
    y = 0;
  }
}

const dots = [];
const lines = [];

let x = center.x;
let y = center.y;
dots.push(new Dot(x, y, 2, "white"));

let angle = (Math.PI / 2) * 3;

let lastTime = 0


function animation(timestamp){
  drawBackground();

  if(timestamp - lastTime > 100){
    addNewDotWithAngle(x, y, angle);
    lastTime = timestamp;
  }

  if(dots.length > 100){
    dots.shift();
  }

  drawDots();
  drawLines();

  requestAnimationFrame(animation);
}

// requestAnimationFrame(animation);
