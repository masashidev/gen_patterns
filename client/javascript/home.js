const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function drawBackground() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);
}
drawBackground();


// function drawDots(color = "black") {
//   let acc = 0;
//   let size = 1;
//   let y = height * Math.random();
//   const xSpace = 10;
//   for (let i = 0; i < width; i++) {
//     const x = i * xSpace;
//     if (i % 5 === 0) {
//       size = 3;
//     } else {
//       size = 1;
//     }

//     y += selectOneOrZeroOrMinusOne();
//     drawDot(ctx, x, y, size, color);
//   }
// }

const randomX = Math.random() * width;
const randomY = Math.random() * height;

class Dot {
  constructor(x, y, size, color, content) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.content = content;
  }
  draw() {
    drawDot(ctx, this.x, this.y, this.size, this.color, this.content);
  }
}

const dot1 = new Dot(100, 100, 10, "black");
const dot2 = new Dot(200, 200, 10, "black");
const dots = [];
const dotsAmount = 10;

function drawEdge(dot1, dot2) {
  ctx.beginPath();
  ctx.moveTo(dot1.x, dot1.y);
  ctx.lineTo(dot2.x, dot2.y);
  ctx.stroke();
}


function generateRandomDots(dotsAmount) {
  for (let i = 0; i < dotsAmount; i++) {
    if (i===0 || i===dotsAmount-1) {
      const dot = new Dot(Math.random() * width, Math.random() * height, 10, "red", i);
      dots.push(dot);
    } else {
      const dot = new Dot(Math.random() * width, Math.random() * height, 3, "#eeeeee", i);
      dots.push(dot);
    }
  }
}

function findBarycenter(dots) {
  let x = 0;
  let y = 0;
  dots.forEach(dot => {
    x += dot.x;
    y += dot.y;
  });
  return { x: x / dots.length, y: y / dots.length };
}

generateRandomDots(dotsAmount);

function drawEdges() {
  dots.forEach((dot, i) => {
    if (i < dots.length - 2) {
      drawEdge(dot, dots[i + 2]);
    }
  });
}

console.log(dots);

drawEdges();

function drawDots() {
  dots.forEach(dot => {
    dot.draw();
  });
}
dots[dots.length - 1].draw();

const barycenter = findBarycenter(dots);
drawDot(ctx, barycenter.x, barycenter.y, 10, "black");
