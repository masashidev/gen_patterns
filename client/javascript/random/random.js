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


let dir = Math.sin(Math.random() * Math.PI * 2);
window.addEventListener("click", () => {
  dir = Math.sign(Math.random() * Math.PI * 2);
  console.log(dir);
});

function selectOneOrMinusOne() {
  if (Math.random() > 0.5) {
    return 1;
  } else {
    return -1;
  }
}
