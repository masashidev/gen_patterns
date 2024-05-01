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

  applyForce(forceX, forceY) {
    this.velocityX += forceX;
    this.velocityY += forceY;
  }

  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.velocityX *= 0.99; // damping
    this.velocityY *= 0.99; // damping
  }
}

class Spring {
  constructor(dot1, dot2, restLength, k) {
    this.dot1 = dot1;
    this.dot2 = dot2;
    this.restLength = restLength;
    this.k = k;
  }

  apply() {
    let dx = this.dot1.x - this.dot2.x;
    let dy = this.dot1.y - this.dot2.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceMagnitude = this.k * (distance - this.restLength);
    let forceX = forceMagnitude * (dx / distance);
    let forceY = forceMagnitude * (dy / distance);

    this.dot1.applyForce(-forceX, -forceY);
    this.dot2.applyForce(forceX, forceY);
  }
}

// Setup canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



// Initialize dots
const mouseDot = new Dot(ctx, 0, 0, 0, "white");
const dot1 = new Dot(ctx, canvas.width / 2, canvas.height / 2, 4, "white");
const dot2 = new Dot(ctx, canvas.width / 2, canvas.height / 2, 4, "red");
const dot3 = new Dot(ctx, canvas.width / 2, canvas.height / 2, 4, "yellow");

const spring = new Spring(mouseDot, dot1, 5, 0.006);
const spring2 = new Spring(dot1, dot2, 5, 0.006);
const spring3 = new Spring(dot1, dot3, 5, 0.006);

function drawBackground() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function animate() {
  drawBackground();
  spring.apply();
  spring2.apply();
  spring3.apply();
  dot1.update();
  dot2.update();
  dot3.update();
  dot1.draw();
  dot2.draw();
  dot3.draw();
  requestAnimationFrame(animate);
}

animate();

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseDot.x = e.clientX - rect.left;
  mouseDot.y = e.clientY - rect.top;
});

window.addEventListener("click", () => {
  dot1.velocityX += 10; // Impulse on click
});
