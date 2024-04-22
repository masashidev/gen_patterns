import { drawDot } from "./dots/drawDot.js";

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const centerX = width / 2;
const centerY = height / 2;

const dots = [];

function drawBackground() {
  ctx.fillStyle = "#222222"
  ctx.fillRect(0, 0, width, height);
}
drawBackground();

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


// for (let i = 0; i < 90; i++) {
//   const angle = 0.1 * i;
//   console.log(Math.cos(angle).toFixed(3) + " " + Math.sin(angle).toFixed(3));
// }

class Edge {
  constructor(dot1, dot2, color) {
    this.dot1 = dot1;
    this.dot2 = dot2;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.strokeStyle = `rgb(${this.color})`;
    ctx.moveTo(this.dot1.x, this.dot1.y);
    ctx.lineTo(this.dot2.x, this.dot2.y);
    ctx.stroke();
  }
}

const numberOfLines = 20;
const numberOfDots = 30;

function drawDotLine() {

  for (let i = 0; i < numberOfLines; i++) {
    dots.push([]);
    // let totalWidth = width;
    for (let j = 0; j < numberOfDots; j++) {
    // totalWidth -= totalWidth * (Math.random() * 0.3);
    const x = width * Math.random();
    const y = i * height / numberOfLines + 30
    const size = ""
    const color = "#ffffff";
    const dot = new Dot(x, y, size, color);
    // dot.draw();
    dots[i].push(dot);
    }
  }
}

function drawEdges() {
  for (let i = 0; i < numberOfDots; i++) {
    const oneColor = 100 + (155 / dots.length) * i;
    const color = `${oneColor}, ${oneColor}, ${oneColor}`;
    for (let j = 0; j < numberOfLines - 1; j++) {
      const dot1 = dots[j][i];
      const dot2 = dots[j+1][i];
      const edge = new Edge(dot1, dot2, color);
      edge.draw();
    }
  }
}

function randomRGB() {
  const r = Math.floor(255 * Math.random());
  const g = Math.floor(255 * Math.random());
  const b = Math.floor(255 * Math.random());
  return `${r}, ${g}, ${b}`;
}

function sortDotsByX() {
  for (let i = 0; i < dots.length; i++) {
    dots[i].sort((a, b) => a.x - b.x);
  }
}

function setSize() {
  for (let i = 0; i < dots.length; i++) {
    for (let j = 0; j < dots[i].length; j++) {
      dots[i][j].size = 3 + j*0.2
    }
  }
}

function renderDots(){
  for (let i = 0; i < dots.length; i++) {
    for (let j = 0; j < dots[i].length; j++) {
      dots[i][j].draw();
    }
  }
}
drawDotLine();
sortDotsByX();
setSize();
drawEdges();
renderDots();
