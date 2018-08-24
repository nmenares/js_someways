export class Ball {
  constructor(options) {
    this.pos = options.pos;
    this.radius = options.radius;
    this.ctx = options.ctx;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    this.ctx.fill();
  }

  initialPosition(pos){
    this.pos = pos;
  }

  move(posX, posY) {
    let gapX = Math.abs(this.pos[0] - posX);
    let gapY = Math.abs(this.pos[1] - posY);
    if (gapX > gapY){
      for(var i=0; i < gapX; i++){
        this.ctx.fillStyle = "rgb(194, 169, 240)";
        this.draw();
        if (posX >= this.pos[0]){
          this.pos[0] += 1
        }else{
          this.pos[0] -= 1
        }
      }
    }else{
      for(var i=0; i < gapY; i++){
        this.ctx.fillStyle = "rgb(194, 169, 240)";
        this.draw();
        if (posY >= this.pos[1]){
          this.pos[1] += 1
        }else{
          this.pos[1] -= 1
        }
        this.ctx.fillStyle = "rgb(194, 169, 240)";
        this.draw();
      }
    }
    this.pos[0] = posX;
    this.pos[1] = posY;
    this.ctx.fillStyle = "rgb(153, 105, 241)";
    this.draw();
  }

}
