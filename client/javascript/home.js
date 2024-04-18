import { drawDot } from "./drawDot.js";
import { clearCanvas } from "./clearCanvas.js";
import { selectOneOrMinusOne } from "./random.js";

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);



function selectOneOrZeroOrMinusOne() {
  const random = Math.random();
  if (random < 0.33) {
    return -1;
  } else if (random < 0.66) {
    return 0;
  } else {
    return 1;
  }
}
function randomFromMinusOneToOne() {
  return Math.random() * 2 - 1;
}
function drawDots(color = "black") {
  let acc = 0;
  let size = 1;
  let y = height * Math.random();
  const xSpace = 10;
  for (let i = 0; i < width; i++) {
    const x = i * xSpace;
    if (i % 5 === 0) {
      size = 3
    } else {
      size = 1;
    }

    y += selectOneOrZeroOrMinusOne()
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
let dir = Math.sin(Math.random() * Math.PI * 2);
window.addEventListener("click", () => {
  dir = Math.sign(Math.random() * Math.PI * 2);
  console.log(dir);
}
);

function createDotAnimator(ctx, width, height) {
  let x = width / 2;
  let y = height / 2;

  return function drawDotInRepeat() {
    drawDot(ctx, x, y); // Assumes drawDot function is defined elsewhere
    x += selectOneOrMinusOne(); // Assumes selectOneOrMinusOne function is defined
    y += selectOneOrMinusOne();
    console.log(x, y);
    requestAnimationFrame(drawDotInRepeat);
  };
}
const startAnimation = createDotAnimator(ctx, width, height);


// for (let i = 0; i < 100; i++) {
//   drawDots();
// }
