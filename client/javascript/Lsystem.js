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

function createButton(){
  const button = document.createElement("button");
  button.innerHTML = "Generate";
  button.style.position = "absolute";
  button.style.top = "10px";
  button.style.right = "10px";
  button.style.padding = "10px";
  button.style.backgroundColor = "white";
  button.style.color = "black";
  button.style.border = "none";
  button.style.cursor = "pointer";
  body.appendChild(button);
  return button;
}


function generate(){
  let nextSentence = "";
  for(let i = 0; i < sentence.length; i++){
    let current = sentence.charAt(i);
    let found = false;
    for(let j = 0; j < rules.length; j++){
      if (current === rules[j].from){
        found = true;
        nextSentence += rules[j].to;
        break;
      }
    }
    if (!found){
      nextSentence += current;
    }
    }
  sentence = nextSentence;
  console.log(sentence);
}

function turtle(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  ctx.save();
  ctx.translate(center.x, canvas.height);
  const angle = Math.PI / 6;
  const length = 5;
  for(let i = 0; i < sentence.length; i++){
    let current = sentence.charAt(i);
    switch(current){
      case "F":
        drawLine(0, 0, 0, -length);
        ctx.translate(0, -length);
        break;
      case "+":
        ctx.rotate(angle);
        break;
      case "-":
        ctx.rotate(-angle);
        break;
      case "[":
        ctx.save();
        break;
      case "]":
        ctx.restore();
        break;
    }
  }
  drawText(x, y, sentence);
  ctx.restore();
  // requestAnimationFrame(turtle);
}


function drawBackground() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function createText(x, y, text) {
  texts.push({x, y, text});
}

function drawDot(x, y, size=5) {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
}

function drawText(x, y, text) {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(text, x, y);
}

function drawLine(x1, y1, x2, y2) {
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}



const texts = []

const axiom = "F";
let sentence = axiom;
const rules = [
  {
    from: "F",
    to: "F[+F]F[-F]F"
  },
];

let x = 0; // initia
let y = 0

function setup(){
  const button = createButton();
  button.addEventListener("click", generate);
  button.addEventListener("click", turtle);
  turtle();

}
function loop(){

  requestAnimationFrame(loop);
}

setup()

// loop()
