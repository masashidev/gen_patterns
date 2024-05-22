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


class Dot {
  constructor(x, y, size, color, content) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.gravity = 0.1;
    this.size = size;
    this.color = color;
    this.content = content;
    this.airResistance = 0.99;
    this.friction = 0.99;
  }
  update(){
    this.x += this.vx
    this.y += this.vy
    this.vy += this.gravity;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.bounce();
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  bounce(){
    if(this.y > canvas.height - this.size){
      this.vy *= -0.9; // energy loss
      this.y = canvas.height - this.size;
    } else if(this.y < this.size){
      this.vy *= -0.9;
      this.y = this.size;
    }

    if(this.x > canvas.width - this.size){
      this.vx *= -0.9;
      this.x = canvas.width - this.size;
    } else if(this.x < this.size){
      this.vx *= -0.9;
      this.x = this.size;
    }

    if(Math.abs(this.vy) < 0.1){ // minimum threshold
      this.vy = 0;
    }

  }
  collision(object){

  }

  jumpTowards(x, y){
    const dx = x - this.x;
    const dy = y - this.y;
    const angle = Math.atan2(dy, dx);
    const speed = 50;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
  }
}

class Display {
  constructor(x, y, content) {
    this.x = x;
    this.y = y;
    this.content = content;
  }
  update(content){
    this.content = content;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(this.content, this.x, this.y);
  }

}

class Obstacle {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
  drawRect(ctx, x, y, width, height, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }
}

const dots = [];
const lines = [];
const objects = [];

const dot1 = new Dot(100, 100, 10, "white");
const display1 = new Display(100, 100, "Hello World");
function setup() {
  dot1.draw(ctx);
}
setup();

let lastTime = 0;




let duration = 1000;
function loop(timestamp) {
  const deltaTime = timestamp - lastTime;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();

  dot1.update();
  dot1.draw(ctx);

  display1.update(dot1.vy);
  display1.draw(ctx);
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

canvas.addEventListener("click", (e) => {
  dot1.jumpTowards(e.clientX - canvasLeft, e.clientY - canvasTop);
})
