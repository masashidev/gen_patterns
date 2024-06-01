const variables = ["距離", "速度", "時間", "加速度", "力", "質量", "角度", "角速度", "角加速度", "角運動量", "角モーメント", "エネルギー", "仕事", "パワー", "圧力", "密度", "体積", "温度", "熱量", "比熱", "熱伝導率", "熱抵抗", "電流", "電圧", "抵抗", "電力", "電気エネルギー", "電気容量"]


const displays = [];
const display = document.createElement("div");

const center = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};


function setDisplayStyle(display, position, displaySize){
  display.style.width = displaySize.width + "px";
  display.style.height = displaySize.height + "px";
  display.style.position = "fixed";
  display.style.top = position.y +  "px";
  display.style.left = position.x + "px";
  display.style.backgroundColor = "#333";
  display.style.border = "1px solid white";
  display.style.borderRadius = "5px";
  display.style.padding = "10px";
  display.style.overflow = "scroll";
  display.style.display = "grid";
  display.style.gridTemplateColumns = "repeat(3, 1fr)";
}

function addElements(display){
  variables.forEach((variable) => {
    const element = document.createElement("div");
    element.textContent = variable;
    element.style.backgroundColor = "#444";
    element.style.width = "100px";
    element.style.margin = "5px";
    element.style.border = "1px solid white";
    element.style.borderRadius = "5px";
    element.style.padding = "5px";
    element.style.cursor = "pointer";
    element.style.color = "white";
    element.style.display = "inline-block";
    element.style.textAlign = "center";
    element.addEventListener("click", () => {
      console.log(variable);
    });
    display.appendChild(element);
  }
  )
}





document.body.appendChild(display);

function setup(){
  const numberOfDisplays = 9;
  const columns = 3;
  const rows = Math.ceil(numberOfDisplays / columns);
  const margin = 20;
  const displaySize = {
    width: (window.innerWidth - margin * (columns + 1)) / columns,
    height: (window.innerHeight - margin * (rows + 1)) / rows,
  };
  for(let i = 0; i < numberOfDisplays; i++){
    const position = {
      x: margin + (displaySize.width + margin) * (i % columns),
      y: margin + (displaySize.height + margin) * Math.floor(i / columns),
    };
    const display = document.createElement("div");
    setDisplayStyle(display, position, displaySize);
    addElements(display);
    document.body.appendChild(display);
    displays.push(display);
  }


}


let displayIndex = 0;
const deltaTime = 1000
let lastTime = 0;

function loop(timestamp){
  if(timestamp - lastTime > deltaTime){
    displays[displayIndex].style.backgroundColor = "#333";
    displayIndex = Math.floor(Math.random() * displays.length);
    displays[displayIndex].style.backgroundColor = "#999"
    lastTime = timestamp;
  }

  requestAnimationFrame(loop);
};

setup();
requestAnimationFrame(loop);
