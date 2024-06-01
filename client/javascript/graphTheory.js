class Node {
  constructor(value) {
    this.value = value;
    this.edges = [];
  }
}

class Edge {
  constructor(node1, node2) {
    this.node1 = node1;
    this.node2 = node2;
  }
}

class Graph {
  constructor() {
    this.nodes = [];
  }

  addNode(value) {
    const node = new Node(value);
    this.nodes.push(node);
    return node;
  }

  addEdge(node1, node2) {
    const edge = new Edge(node1, node2);
    node1.edges.push(edge);
    node2.edges.push(edge);
  }
}

class App {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.body = document.querySelector("body");
    this.body.style.backgroundColor = "black";
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;

    this.center = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
    };

    this.graph = new Graph();

    this.setup();
    this.loop = this.loop.bind(this);

    requestAnimationFrame(this.loop);

    this.canvas.addEventListener("mousemove", (e) => {
      this.x = e.clientX;
      this.y = e.clientY;
    });
  }

  drawBackground() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawRect(x, y, width, height, color) {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  drawLine(x1, y1, x2, y2, color = "black") {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  drawDot(x, y, size = 5, color = "white") {
    this.ctx.beginPath();
    this.ctx.fillStyle = `${color}`;
    this.ctx.arc(x, y, size, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawCircle(x, y, radius, color = "white") {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.stroke();
  }

  setup() {}

  loop() {
    this.drawBackground();
    this.drawRect(100, 100, 100, 100, "white");
    this.drawLine(this.center.x, this.center.y, this.x, this.y, "white");
    this.drawDot(100, 100, 5, "white");
    this.drawCircle(400, 100, 100, "white");
    requestAnimationFrame(() => this.loop());
  }
}

const app = new App();
