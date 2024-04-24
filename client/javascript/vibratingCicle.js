import { Dot } from "./dots/dotClass.js";
import { Circle } from "./circle/circleClass.js";

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function drawBackground() {
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, width, height);
}

drawBackground();

const centerX = width / 2;
const centerY = height / 2;

const dots = [];
for(let i = 0; i < 300; i++) {
  // const r = 200- (i * (Math.random()*0.2+1)) * 0.5;
  // const r =  i%30*10;
  // const r = Math.log(i+1) * 40
  let r = i;
  // if(i % 2 === 0){
  //    r = i
  // } else {
  //    r = i;
  // }
  // const x = centerX + Math.cos(i*0.3) * r + (300 - i);

  // const x = centerX + Math.cos(i*0.1) * r;
  // const y = centerY + Math.sin(i*0.1) * r;

  // const x = centerX + Math.cos(10000/i) * r;
  // const y = centerY + Math.sin(10000/i) * r;

  const x = centerX + Math.cos(300-i%10) * r;
  const y = centerY + Math.sin(300-i%10) * r;
  const dot = new Dot(ctx, x, y, 3, "white");
  dots.push(dot);
}

let x = 0;
let y = 0;
let angle = 0;
let r = 100;
let size = 3;
function animate(){
  angle += 0.005;
  r = Math.sin(angle) * 0.5 + 100;
  size = 3
  x = centerX + Math.cos(angle) * r;
  y = centerY + Math.sin(angle) * r;
  const dot = new Dot(ctx, x, y, size, "white");
  dot.draw();
  requestAnimationFrame(animate);
}

function drawEdge(){
  for(let i = 0; i < dots.length - 1; i++){
    const dot1 = dots[i];
    const dot2 = dots[(i + 1) % dots.length];
    ctx.beginPath();
    ctx.moveTo(dot1.x, dot1.y);
    ctx.lineTo(dot2.x, dot2.y);
    // const colorIndex = (i % 255)+1;
    // const colorValue = 255 - colorIndex;
    ctx.strokeStyle = "white"
    ctx.stroke();
  }
}
dots.forEach(dot => dot.draw());
 drawEdge();

// animate();
