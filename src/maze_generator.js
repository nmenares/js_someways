function popRandom(array) {
  if (!array.length) return;
  let n = array.length;
  let i = Math.floor(Math.random() * n);
  [array[i], array[n - 1]] = [array[n - 1], array[i]];
  return array.pop();
};

export class MazeObj {
  constructor(width, height, cellSize, cellSpacing, ctx) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.cellSpacing = cellSpacing;
    this.ctx = ctx;
    this.cellWidth = Math.floor((this.width - this.cellSpacing) / (this.cellSize + this.cellSpacing));
    this.cellHeight = Math.floor((this.height - this.cellSpacing) / (this.cellSize + this.cellSpacing));
    this.cells = new Array(this.cellWidth * this.cellHeight);

    this.frontier = [];
    this.ctx.fillStyle = "white";
    const start = (this.cellHeight - 1) * this.cellWidth;
    this.cells[start] = { S: false, N: false, E: false, W: false };

    this.fillCell(start);

    this.frontier.push({index: start, direction: "N"});
    this.frontier.push({index: start, direction: "E"});
  }

  cleanMaze(){
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.cells.forEach((cell, idx) => {
      this.ctx.fillStyle = "white";
      this.fillCell(idx);
      ["S","E", "W", "N"].forEach(d => {
        if(d==="S" && (cell["S"] === true)) {
          this.ctx.fillStyle = "white";
          this.fillSouth(idx);
        } if (d==="E" && (cell["E"] === true)) {
          this.ctx.fillStyle = "white";
          this.fillEast(idx);
        }
      })
    })
  }

  fillEast(index) {
    let i = index % this.cellWidth;
    let j = Math.floor(index / this.cellWidth);
    this.ctx.fillRect((i + 1) * (this.cellSize + this.cellSpacing), j * this.cellSize + (j + 1) * this.cellSpacing, this.cellSpacing, this.cellSize);
  }

  fillSouth(index) {
    let i = index % this.cellWidth;
    let j = Math.floor(index / this.cellWidth);
    this.ctx.fillRect(i * this.cellSize + (i + 1) * this.cellSpacing, (j + 1) * (this.cellSize + this.cellSpacing), this.cellSize, this.cellSpacing);
  }

  fillCell(index) {
    let i = index % this.cellWidth;
    let j = Math.floor(index / this.cellWidth);
    this.ctx.fillRect(i * this.cellSize + (i + 1) * this.cellSpacing, j * this.cellSize + (j + 1) * this.cellSpacing, this.cellSize, this.cellSize);
  }

  toggleCell(index, direction) {
    if (!this.cells[index]) {
      this.cells[index] = { S: false, N: false, E: false, W: false };
    }
    this.cells[index][direction] = true;
  }

  exploreFrontier() {
    let edge = popRandom(this.frontier);

    if (edge == null) {
      return true;
    };

    let current_cel_num = edge.index;
    let d0 = edge.direction;
    let next_cel_num = current_cel_num + (d0 === "N" ? -this.cellWidth : d0 === "S" ? this.cellWidth : d0 === "W" ? -1 : +1);
    let x0 = current_cel_num % this.cellWidth;  //module times of cell+limit in current_cel_num
    let y0 = Math.floor(current_cel_num / this.cellWidth);  //times of cell+limit in current_cel_num
    let x1;
    let y1;
    let d1;
    let open = this.cells[next_cel_num] == null;

    this.ctx.fillStyle = open ? "white" : "black";

    if (d0 === "N") {
      this.fillSouth(next_cel_num);
      x1 = x0;
      y1 = y0 - 1;
      d1 = "S";
    }
    else if (d0 === "S") {
      this.fillSouth(current_cel_num);
      x1 = x0;
      y1 = y0 + 1;
      d1 = "N";
    }
    else if (d0 === "W") {
      this.fillEast(next_cel_num);
      x1 = x0 - 1;
      y1 = y0;
      d1 = "E";
    }
    else {
      this.fillEast(current_cel_num);
      x1 = x0 + 1;
      y1 = y0;
      d1 = "W";
    }

    if (open) {
      this.fillCell(next_cel_num);
      this.toggleCell(current_cel_num, d0);
      this.toggleCell(next_cel_num, d1);

      this.ctx.fillStyle = "rgb(61, 254, 213)";

      if (y1 > 0 && this.cells[next_cel_num - this.cellWidth] == null) {
        this.fillSouth(next_cel_num - this.cellWidth);
        this.frontier.push({index: next_cel_num, direction: "N"});
      }

      if (y1 < this.cellHeight - 1 && this.cells[next_cel_num + this.cellWidth] == null) {
        this.fillSouth(next_cel_num);
        this.frontier.push({index: next_cel_num, direction: "S"});
      }

      if (x1 > 0 && this.cells[next_cel_num - 1] == null) {
        this.fillEast(next_cel_num - 1);
        this.frontier.push({index: next_cel_num, direction: "W"});
      }
      if (x1 < this.cellWidth - 1 && this.cells[next_cel_num + 1] == null) {
        this.fillEast(next_cel_num);
        this.frontier.push({index: next_cel_num, direction: "E"});
      }
    }
  }
}
