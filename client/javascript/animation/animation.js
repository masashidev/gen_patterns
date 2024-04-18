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
