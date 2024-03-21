export class Ball {
  constructor(options) {
    this.x = options.pos[0];
    this.y = options.pos[1];
    this.pos = options.pos;
    this.radius = options.radius;
    this.ctx = options.ctx;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    this.ctx.fill();
  }

  initialPosition() {
    this.pos = [this.x, this.y];
  }

  move(posX, posY) {
    let gapX = Math.abs(this.pos[0] - posX);
    let gapY = Math.abs(this.pos[1] - posY);
    if (gapX > gapY) {
      for (let i = 0; i < gapX; i++) {
        this.ctx.fillStyle = "#b8e0d2";
        this.draw();
        if (posX >= this.pos[0]) {
          this.pos[0] += 1;
        } else {
          this.pos[0] -= 1;
        }
      }
    } else {
      for (let i = 0; i < gapY; i++) {
        this.ctx.fillStyle = "#b8e0d2";
        this.draw();
        if (posY >= this.pos[1]) {
          this.pos[1] += 1;
        } else {
          this.pos[1] -= 1;
        }
        this.ctx.fillStyle = "#b8e0d2";
        this.draw();
      }
    }
    this.pos[0] = posX;
    this.pos[1] = posY;
    this.ctx.fillStyle = "#95b8d1";
    this.draw();
  }
}
