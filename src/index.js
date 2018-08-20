const width = 500;
const height = 500;

const N = 1 << 0;
const S = 1 << 1;
const W = 1 << 2;
const E = 1 << 3;


const cellSize = 4;
const cellSpacing = 4;
const cellWidth = Math.floor((width - cellSpacing) / (cellSize + cellSpacing));
const cellHeight = Math.floor((height - cellSpacing) / (cellSize + cellSpacing));
const cells = new Array(cellWidth * cellHeight); // each cell’s edge bits

function exploreFrontier(ctx, frontier) {

  let edge;

  if ((edge = popRandom(frontier)) == null) return true;

  let i0 = edge.index;
  let d0 = edge.direction;
  let i1 = i0 + (d0 === N ? -cellWidth : d0 === S ? cellWidth : d0 === W ? -1 : +1);
  let x0 = i0 % cellWidth;
  let y0 = i0 / cellWidth | 0;
  let x1;
  let y1;
  let d1;
  let open = cells[i1] == null; // opposite not yet part of the maze

  ctx.fillStyle = open ? "white" : "black";

  if (d0 === N) fillSouth(i1, ctx), x1 = x0, y1 = y0 - 1, d1 = S;
  else if (d0 === S) fillSouth(i0, ctx), x1 = x0, y1 = y0 + 1, d1 = N;
  else if (d0 === W) fillEast(i1, ctx), x1 = x0 - 1, y1 = y0, d1 = E;
  else fillEast(i0, ctx), x1 = x0 + 1, y1 = y0, d1 = W;

  if (open) {
    fillCell(i1, ctx);
    cells[i0] |= d0, cells[i1] |= d1;
    ctx.fillStyle = "magenta";
    if (y1 > 0 && cells[i1 - cellWidth] == null) fillSouth(i1 - cellWidth, ctx), frontier.push({index: i1, direction: N});
    if (y1 < cellHeight - 1 && cells[i1 + cellWidth] == null) fillSouth(i1, ctx), frontier.push({index: i1, direction: S});
    if (x1 > 0 && cells[i1 - 1] == null) fillEast(i1 - 1 , ctx), frontier.push({index: i1, direction: W});
    if (x1 < cellWidth - 1 && cells[i1 + 1] == null) fillEast(i1, ctx), frontier.push({index: i1, direction: E});
  }
}

function fillCell(index, ctx) {
  let i = index % cellWidth
  let j = index / cellWidth | 0;
  ctx.fillRect(i * cellSize + (i + 1) * cellSpacing, j * cellSize + (j + 1) * cellSpacing, cellSize, cellSize);
}

function fillEast(index, ctx) {
  let i = index % cellWidth;
  let j = index / cellWidth | 0;
  ctx.fillRect((i + 1) * (cellSize + cellSpacing), j * cellSize + (j + 1) * cellSpacing, cellSize, cellSize);
}

function fillSouth(index, ctx) {
  var i = index % cellWidth, j = index / cellWidth | 0;
  ctx.fillRect(i * cellSize + (i + 1) * cellSpacing, (j + 1) * (cellSize + cellSpacing), cellSize, cellSize);
}

function popRandom(array) {
  if (!array.length) return;
  let n = array.length;
  let i = Math.random() * n | 0;
  [array[i], array[n - 1]] = [array[n - 1], array[i]];
  return array.pop();
}


document.addEventListener("DOMContentLoaded", function(){

  const canvas = document.getElementById("myCanvas"); //esta en el body y esta dentro del dom
  const ctx = canvas.getContext("2d"); //devuelve objeto que se puede pintar
  const frontier = [];

  console.log(    Math.round((width - cellWidth * cellSize - (cellWidth + 1) * cellSpacing) / 2),
      Math.round((height - cellHeight * cellSize - (cellHeight + 1) * cellSpacing) / 2)
);
  ctx.translate(
    Math.round((width - cellWidth * cellSize - (cellWidth + 1) * cellSpacing) / 2),
    Math.round((height - cellHeight * cellSize - (cellHeight + 1) * cellSpacing) / 2)
  );

  ctx.fillStyle = "red";

  const start = (cellHeight - 1) * cellWidth;
  cells[start] = 0;

  fillCell(start, ctx);

  frontier.push({index: start, direction: N});
  frontier.push({index: start, direction: E});

  setInterval(function() {
    let done;
    let k = 0;
    while (++k < 50 && !(done = exploreFrontier(ctx, frontier)));
    console.log('foo')
    return done;
  }, 100);
//
//
// d3.select(self.frameElement).style("height", height + "px");

});
