export class Ball {
  constructor(options) {
    this.pos = options.pos;
    this.radius = options.radius;
    this.ctx = options.ctx;
  }

  draw() {
    this.ctx.fillStyle = "rgb(153, 105, 241)";
    this.ctx.beginPath();
    this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    this.ctx.fill();
  }

  move(posX, posY) {
    this.ctx.fillStyle = "rgb(219, 213, 213)";
    this.ctx.beginPath();
    this.ctx.fillRect(this.pos[0] - 5, this.pos[1] - 5, 10, 10);
    this.pos[0] = posX;
    this.pos[1] = posY;
    this.ctx.fillStyle = "rgb(153, 105, 241)";
    this.ctx.beginPath();
    this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    this.ctx.fill();
  }

}
