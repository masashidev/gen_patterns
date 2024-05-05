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

function drawLine(x, y, x2, y2, width) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = "white";
  ctx.lineWidth = width;
  ctx.stroke();
}


function getToLine(x, y, angle, length) {
  return {
    x: x + Math.cos(angle) * length,
    y: y + Math.sin(angle) * length,
  };
}


const numberOfLine = 30;
function drawLinesInCircle(center, numberOfLine, time) {
  for (let i = 0; i < numberOfLine; i++) {
    const angle = (Math.PI * 2) / numberOfLine * i + (time * 0.0001);
    const length = 10 * Math.sin(time * 0.001) + 200;
    const to = getToLine(center.x, center.y, angle, length);
    drawLine(center.x, center.y, to.x, to.y, 2);
  }
}


function animation(timestamp){
  drawBackground();
  const time = Math.floor(timestamp % 10);
  drawLinesInCircle(center, numberOfLine, timestamp);
  requestAnimationFrame(animation);
}

requestAnimationFrame(animation);
