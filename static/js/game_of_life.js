const canvas = document.getElementById("gol-canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const cell_size = 8;
const cols = () => Math.floor(canvas.width / cell_size);
const rows = () => Math.floor(canvas.height / cell_size);

let grid = [];

function init_grid() {
  grid = Array.from({ length: rows() }, () =>
    Array.from({ length: cols() }, () => Math.random() > 0.85 ? 1 : 0)
  );
}

function step() {
  const next = grid.map(arr => [...arr]);

  for (let y = 0; y < rows(); y++) {
    for (let x = 0; x < cols(); x++) {
      let n = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const yy = (y + dy + rows()) % rows();
          const xx = (x + dx + cols()) % cols();
          n += grid[yy][xx];
        }
      }
      if (grid[y][x] && (n < 2 || n > 3)) next[y][x] = 0;
      if (!grid[y][x] && n === 3) next[y][x] = 1;
    }
  }
  grid = next;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ad8676";
  for (let y = 0; y < rows(); y++) {
    for (let x = 0; x < cols(); x++) {
      if (grid[y][x]) {
        ctx.fillRect(
          x * cell_size,
          y * cell_size,
          cell_size,
          cell_size
        );
      }
    }
  }
}

function loop() {
  step();
  draw();
  requestAnimationFrame(loop);
}

init_grid();
loop();
