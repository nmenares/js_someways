import React from 'react';
import { MazeObj } from './maze_generator';
import { Ball } from './ball';

export class Maze extends React.Component{
  constructor(props){
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount(){
    const ctx = this.canvas.current.getContext("2d");
    const width = 800;
    const height = 500;
    const cellSize = 10;
    const cellSpacing = 5;

    const maze = new MazeObj(width, height, cellSize, cellSpacing, ctx);
    let winner = false;

    const youWin = () => {
      ctx.fillStyle = "black";
      ctx.globalAlpha=0.5;
      ctx.fillRect(0, 0, 800, 500);
      ctx.fillStyle = "white";
      ctx.globalAlpha=1;
      ctx.textAlign = "center";
      ctx.font = "64px monospace";
      ctx.fillText("You Win!", 400 , 250);
      winner = true;
    };

    const youLose = () => {
      ctx.fillStyle = "black";
      ctx.globalAlpha=0.5;
      ctx.fillRect(0, 0, 800, 500);
      ctx.fillStyle = "white";
      ctx.globalAlpha=1;
      ctx.textAlign = "center";
      ctx.font = "64px monospace";
      ctx.fillText("Game Over", 400 , 250);
    };

    const timerId = setInterval(function() {
      let done;
      let k = 0;
      while (++k < 50) {
        done = maze.exploreFrontier();
        if (done) break;
      }
      if (done) {
        ctx.fillStyle = "rgb(61, 254, 213)";
        ctx.fillRect(0, height - (cellSpacing + cellSize), cellSpacing, cellSize);
        ctx.fillStyle = "rgb(230, 46, 90)";
        ctx.fillRect(width - cellSpacing, cellSpacing, cellSpacing, cellSize);

        const ball = new Ball({ pos: [cellSize, height - cellSize], radius: cellSpacing - 1, ctx: ctx});
        let start = (width - cellSpacing)/(cellSize + cellSpacing) * (((height - cellSpacing)/(cellSize + cellSpacing)) - 1)
        //start: cell number where the ball is. Each maze.cells[start] has an object with possible directions
        let timer = 0;

        function moveBall(e){
          if (e.keyCode === 37) { //west
            e.preventDefault();
            if(maze.cells[start]["W"] === true) {
              start = start - 1;
              ball.move( ball.pos[0] - (cellSize + cellSpacing), ball.pos[1]);
              if(start === ((width - cellSpacing)/(cellSize + cellSpacing))-1){
                youWin();
                window.removeEventListener("keydown", moveBall);
              }
            }
          } else if (e.keyCode === 38) { //north
            e.preventDefault();
            if(maze.cells[start]["N"] === true) {
              start = start - (width - cellSpacing)/(cellSize + cellSpacing);
              ball.move( ball.pos[0], ball.pos[1] - (cellSize + cellSpacing));
              if(start === ((width - cellSpacing)/(cellSize + cellSpacing))-1){
                youWin();
                window.removeEventListener("keydown", moveBall);
              }
            }
          } else if (e.keyCode === 39) { //east
            e.preventDefault();
            if(maze.cells[start]["E"] === true) {
              start = start + 1;
              ball.move( ball.pos[0] + (cellSize + cellSpacing), ball.pos[1]);
              if(start === ((width - cellSpacing)/(cellSize + cellSpacing))-1){
                youWin();
                window.removeEventListener("keydown", moveBall);
              }
            }
          } else if (e.keyCode === 40) { //south
            e.preventDefault();
            if(maze.cells[start]["S"] === true) {
              start = start + (width - cellSpacing)/(cellSize + cellSpacing);
              ball.move( ball.pos[0], ball.pos[1] + (cellSize + cellSpacing));
              if(start === ((width - cellSpacing)/(cellSize + cellSpacing))-1){
                youWin();
                window.removeEventListener("keydown", moveBall);
              }
            }
          }
        }

        ball.draw();
        window.addEventListener("keydown", moveBall );

        clearInterval(timerId);

        function timerBar(e) {
          if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
            const timerId2  = setInterval( function(){
              if (timer < 60 && winner) {
                clearInterval(timerId2);
              } else if (timer < 60) {
                timer += 1;
              } else {
                clearInterval(timerId2);
                youLose();
                window.removeEventListener("keydown", moveBall);
              }
              }, 1000)
            }
        };

        window.addEventListener("keydown", timerBar, {once: true})

      }
      return done;
    }, 50);

  }

  render(){
    return (
        <div className="maze">
          <div className="buttons">
            <button>New</button>
            <button>Restart</button>
          </div>
          <canvas className="canvas" ref={this.canvas} width="800" height="500"/>
        </div>
    )
  }
}
