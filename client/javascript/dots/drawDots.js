import { drawDot } from "./drawDot.js";
import { clearCanvas } from "./clearCanvas.js";
import { selectOneOrMinusOne } from "./random.js";

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);



function drawDots(color = "black") {
  let acc = 0;
  let size = 1;
  let y = height * Math.random();
  const xSpace = 10;
  for (let i = 0; i < width; i++) {
    const x = i * xSpace;
    if (i % 5 === 0) {
      size = 3;
    } else {
      size = 1;
    }

    y += selectOneOrZeroOrMinusOne();
    drawDot(ctx, x, y, size, color);
  }
}

drawDots();
for (let i = 0; i < 100; i++) {
  if (i % 3 === 0) {
    drawDots("#eeeeee");
  } else if (i % 3 === 1) {
    drawDots("#222222");
  } else {
    drawDots("#cccccc");
  }
}
