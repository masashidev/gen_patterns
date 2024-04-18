function handleMouseWheel(e, zoom) {
  const dir = Math.sign(e.deltaY);
  const step = 0.1;
  zoom += step * dir;
  zoom = Math.max(1, Math.min(5, zoom));
  console.log(zoom);
}
