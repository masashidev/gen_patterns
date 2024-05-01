const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Grid {
  constructor(ctx, cellSize, color) {
    this.ctx = ctx;
    this.cellSize = cellSize;
    this.color = color;
  }

  draw() {
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = 1;

    for (let x = 0; x < canvas.width; x += this.cellSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, canvas.height);
      this.ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += this.cellSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(canvas.width, y);
      this.ctx.stroke();
    }
  }

  highlightCell(x, y) {
    this.ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
  }
}


class Dot {
  constructor(ctx, x, y, radius, color) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  getCurrentGridPosition() {
    return {
      x: Math.floor(this.x / grid.cellSize),
      y: Math.floor(this.y / grid.cellSize),
    };
  }

  detectB

  applyForce(forceX, forceY) {
    this.velocityX += forceX;
    this.velocityY += forceY;
  }

  moveToRandomCoordinate() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
  }
  followMouse() {
    canvas.addEventListener("mousemove", (event) => {
      this.x = event.clientX;
      this.y = event.clientY;
    });
  }
  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.velocityX *= 0.99; // damping
    this.velocityY *= 0.99; // damping
  }

}

class Player {
  constructor(ctx, x, y, radius, color) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  getCenterPositionOfCurrentCell() {
    return {
      x: Math.floor(this.x / grid.cellSize) * grid.cellSize + grid.cellSize / 2,
      y: Math.floor(this.y / grid.cellSize) * grid.cellSize + grid.cellSize / 2,
    };
  }

  getCurrentGridPosition() {
    return {
      x: Math.floor(this.x / grid.cellSize),
      y: Math.floor(this.y / grid.cellSize),
    };
  }

  updatePositionAtCenterOfCurrentCell() {
    const center = this.getCenterPositionOfCurrentCell();
    this.x = center.x;
    this.y = center.y;
  }

  moveToRandomCoordinate() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
  }
  moveToNextCellAtRandomDirection() {
    const directions = [
      { x: 0, y: -1 }, // up
      { x: 1, y: 0 }, // right
      { x: 0, y: 1 }, // down
      { x: -1, y: 0 }, // left
    ];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    this.x += randomDirection.x * grid.cellSize;
    this.y += randomDirection.y * grid.cellSize;
  }

  followMouse() {
    canvas.addEventListener("mousemove", (event) => {
      this.x = event.clientX;
      this.y = event.clientY;
    });
  }
  placeWhenClicked() {
    canvas.addEventListener("click", (event) => {
      this.x = event.clientX;
      this.y = event.clientY;
      this.updatePositionAtCenterOfCurrentCell();
    });
  }

}

class GeometryUtils {
  static distanceBetweenTwoPoints(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  static getDirection(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
  }
}

class AnimationController {
  constructor() {
    this.startTime = null;
    this.lastTime = 0;
    this.continueAnimation = true;
  }

}

class Button {
  constructor(ctx, x, y, width, height, color, text) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.text = text;

  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "black";
    this.ctx.font = "20px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
  }

  updateText(newText) {
    this.text = newText;
  }

  isClicked(x, y) {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
  }

  isMouseOver(x, y) {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
  }
}


const grid = new Grid(ctx, 50, "rgba(0, 0, 0, 0.1)");
grid.draw();
const dot = new Dot(ctx, 100, 100, 10, "red");
dot.followMouse();
const dot2 = new Dot(ctx, 300, 100, 10, "orange");
const player = new Player(ctx, 100, 100, 10, "blue");
player.placeWhenClicked();

const button = new Button(ctx, 100, 100, 100, 50, "red", "Click me");
button.draw();


let startTime = null;
let lastTime = 0;
let continueAnimation = true;
let duration = 1000;
let myReq = null;
function animate(timestamp){
  if (!startTime) {
    startTime = timestamp;
  }
  const elapsedTime = timestamp - startTime;


  ctx.clearRect(0, 0, canvas.width, canvas.height);

  grid.draw();
  dot.draw();
  dot2.draw();
  grid.highlightCell(dot.getCurrentGridPosition().x, dot.getCurrentGridPosition().y);

  player.draw();

  // if (timestamp / 2000 >= 1) {
  //   player.moveToNextCellAtRandomDirection();
  //   dot2.moveToRandomCoordinate();

  // }


  if (continueAnimation) {
    myReq = requestAnimationFrame(animate);
  }
}

// myReq = requestAnimationFrame(animate);

canvas.addEventListener("click", (event) => {
  cancelAnimationFrame(myReq);
})


// window.addEventListener("keydown", (e) => {
//   if(e.key === " ") {
//     continueAnimation = !continueAnimation;
//     requestAnimationFrame(animate);
//     const newText = continueAnimation ? "Pause" : "Play";
//     button.updateText(newText);
//     button.draw();
//   }
// });
// requestAnimationFrame(animate);
