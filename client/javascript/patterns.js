const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const body = document.querySelector("body");
body.style.backgroundColor = "black";

canvas.width = window.innerWidth - 20;
canvas.height = 4000
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

function drawRect(ctx, x, y, width, height, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}
function drawLine(ctx, x1, y1, x2, y2, color = "black") {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
class PatternGrid {
  constructor(ctx, x, y, row, col, cellSize, color) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.row = row;
    this.col = col;
    this.cellSize = cellSize;
    this.color = color;
    this.cells = [];
    this.fillRate = 0.5;

    for (let i = 0; i < this.row; i++) {
      this.cells[i] = [];
      for (let j = 0; j < this.col; j++) {
        this.cells[i][j] = [];
      }
    }
  }
  fillAll() {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.cells[i][j] = 1
      }
    }
  }
  emptyAll() {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.cells[i][j] = 0
      }
    }
  }
  fillRandomlyAll(){
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        if (Math.random() < this.fillRate) {
          this.cells[i][j] = 1;
        }
      }
    }
  }
  fillRandomlyOfLeftHalf() {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        if (i < this.row / 2) {
          if (Math.random() < this.fillRate) {
            this.cells[i][j] = 1;
          }
        }
      }
    }
  }
  copy(fromX, fromY, toX, toY) {
    this.cells[toX][toY] = this.cells[fromX][fromY];
  }
  copyArea(fromX, fromY, toX, toY, width, height) {
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        this.copy(fromX + i, fromY + j, toX + i, toY + j);
      }
    }
  }

  copyLeftToRight() {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        if (i < this.row / 2) {
          this.cells[this.row - i - 1][j] = this.cells[i][j];
        }
      }
    }
  }
  copyTopToBottom() {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        if (j < this.col / 2) {
          this.cells[i][this.col - j - 1] = this.cells[i][j];
        }
      }
    }
  }
  drawOneCell(x, y, color) {
    this.drawRect(
      this.ctx,
      x * this.cellSize + this.x,
      y * this.cellSize + this.y,
      this.cellSize,
      this.cellSize,
      color
    );
  }

  draw() {
    this.cells.forEach((row, i) => {
      row.forEach((col, j) => {
        this.drawLine(
          i * this.cellSize + this.x,
          j * this.cellSize + this.y,
          i * this.cellSize + this.cellSize + this.x,
          j * this.cellSize + this.y
        );
        this.drawLine(
          i * this.cellSize + this.x,
          j * this.cellSize + this.y,
          i * this.cellSize + this.x,
          j * this.cellSize + this.cellSize + this.y
        );

       if(this.cells[i][j] === 1) {
        this.drawRect(
          this.ctx,
          i * this.cellSize + this.x,
          j * this.cellSize + this.y,
          this.cellSize,
          this.cellSize,
          "white",
        );
       }
      });
    });
  }


  drawRect(ctx, x, y, width, height, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }
  drawLine(x1, y1, x2, y2, color = "black") {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }


}

function drawGrid(gridData, x, y, cellSize, color) {
  const width = gridData.length * cellSize;
  const height = gridData[0].length * cellSize;
  gridData.forEach((row, i) => {
    row.forEach((col, j) => {
      if(gridData[i][j] === 1){
        drawRect(ctx, x + i * cellSize, y + j * cellSize, cellSize, cellSize, color);
      }


    });
  });
  for (let i = 0; i < gridData.length; i++) {
    drawLine(ctx, x + i * cellSize, y, x + i * cellSize, y + height, "black");
    drawLine(ctx, x, y + i * cellSize, x + width, y + i * cellSize, "black");
  }
}


function createNewGrid(x, y, row, col, cellSize, color) {
  const grid = new PatternGrid(ctx, x, y, row, col, cellSize, color);
  grid.fillRandomlyAll();
  // grid.cells.forEach((row, i) => {
  //   row.forEach((col, j) => {
  //     if (i === 0 || j === 0) {
  //       grid.cells[i][j] = 1;
  //     }
  //   });
  // })
  const baseX = 0;
  const baseY = 0;
  const halfX = Math.floor(row / 2)
  const halfY = Math.floor(col / 2)
  grid.copyArea(baseX, baseY, halfX, halfY, halfX, halfY);
  grid.copyArea(0, 0, 0, halfY, halfX, halfY);
  grid.copyArea(0, 0, halfX, 0, halfX, halfY);
  // grid.copyLeftToRight();
  // grid.copyTopToBottom();
  grid.draw();
  return grid;
}

function setup() {
  // for(let i = 0; i < 8; i++) {
  //   for(let j = 0; j <20; j++) {
  //     createNewGrid(20 + i * 100, 20 + j * 100, 30, 30, 3, "white");
  //   }
  // }
  const x = 20;
  const y = 20;
  const row = 30;
  const col = 30;
  const cellSize = 9;
  const width = row * cellSize;
  const height = col * cellSize;
  const baseGrid = createNewGrid(x, y, row, col, cellSize, "white");
  const gridData = baseGrid.cells;
  // for(let i = 0; i < 5; i++) {
  //   for(let j = 0; j < 5; j++) {
  //     drawGrid(gridData, x + i * width, y + j * height, cellSize, "white");
  //   }
  // }


}
// setup();

const x = 20;
const y = 20;
const row = 30;
const col = 30;
const cellSize = 9;
const grid = new PatternGrid(ctx, x, y, row, col, cellSize, "white");
grid.fillRandomlyAll();
const gridData = grid.cells;
let cellIndex = 0
function loop(timestamp) {
  if(cellIndex >= row * col) {
    looping = false;
    return;
  }
  if(grid.cells[Math.floor(cellIndex / row)][cellIndex % row] === 1) {
  grid.drawOneCell(cellIndex % row, Math.floor(cellIndex / row), "white");
  cellIndex += 1;
  } else {
    cellIndex += 1;
  }

  requestAnimationFrame(loop);
}



let looping = false;
canvas.addEventListener("click", ()=>{
  if(!looping) {
    drawBackground();
    grid.fillRandomlyAll();
    cellIndex = 0;
    looping = true;
    loop();
  }
}
)
