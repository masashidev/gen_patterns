let movementDirectionDegree = 0;
function nextCoordination() {
  const degree = Math.random() * 360;
  movementDirectionDegree = degree;
  const x = Math.cos((degree * Math.PI) / 180);
  const y = Math.sin((degree * Math.PI) / 180);
  return { x, y };
}
