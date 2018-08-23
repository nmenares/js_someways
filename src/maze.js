import React from 'react';
import { MazeObj } from './maze_generator';
import { Ball } from './ball';


export class Maze extends React.Component{
  constructor(props){
    super(props);
    this.canvas = React.createRef();
    this.clock = React.createRef();
    this.maze = undefined;
    this.ball = undefined;
  }

  handleRefresh(e){
    e.preventDefault();
    location.reload();
  }


  componentDidMount(){
    const ctx = this.canvas.current.getContext("2d");
    const ctx2 = this.clock.current.getContext("2d");

    const width = 800;
    const height = 500;
    const cellSize = 10;
    const cellSpacing = 5;
    let timer = 0;
    let start = (width - cellSpacing)/(cellSize + cellSpacing) * (((height - cellSpacing)/(cellSize + cellSpacing)) - 1);
    let outer  = document.getElementsByClassName('restart') [0];

    const maze = new MazeObj(width, height, cellSize, cellSpacing, ctx);
    const ball = new Ball({ pos: [cellSize, height - cellSize], radius: cellSpacing - 1, ctx: ctx});
    this.maze = maze;
    this.ball = ball;

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
    };

    function timerBar(e) {
      if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
        e.preventDefault();
        const timerId2  = setInterval( function(){
          if (timer < 60 && winner) {
            clearInterval(timerId2);
          } else if (timer < 60) {
            timer += 1;
            ctx2.fillStyle = "black";
            ctx2.fillRect(590, 0, 11, 10);
            let time = 60 - timer;
            ctx2.fillStyle = "white";
            ctx2.fillRect((timer*10)-10, 0, 11, 10);
            ctx2.fillStyle = "black";
            ctx2.font = "10px serif";
            ctx2.fillText(`${time}`, (timer*10)-10 , 8);
            ctx2.fillStyle = "white";
            ctx2.fillRect((timer*10)-20, 0, 10, 10);
          } else {
            clearInterval(timerId2);
            youLose();
            window.removeEventListener("keydown", moveBall);
          }
          }, 1000)
        }
    };

    function setup(){
      ctx2.fillStyle = "black";
      ctx2.fillRect(0, 0, 600, 10);
      ctx.fillStyle = "rgb(61, 254, 213)";
      ctx.fillRect(cellSpacing, height - (cellSpacing + cellSize), cellSize, cellSize);
      ctx.fillStyle = "rgb(230, 46, 90)";
      ctx.fillRect(width - cellSpacing - cellSize, cellSpacing, cellSize, cellSize);
    }

    function handleRestart(e){
      e.preventDefault();
      timer = 0;
      start = (width - cellSpacing)/(cellSize + cellSpacing) * (((height - cellSpacing)/(cellSize + cellSpacing)) - 1);
      window.removeEventListener("keydown", moveBall);
      window.removeEventListener("keydown", timerBar);
      outer.removeEventListener("click", handleRestart);
      maze.cleanMaze();
      ball.initialPosition([cellSize, height - cellSize]);
      setup();
      ball.draw();
      window.addEventListener("keydown", moveBall);
      window.addEventListener("keydown", timerBar, {once: true})
      outer.addEventListener("click", handleRestart);
    }

    const timerId = setInterval(function() {
      let done;
      let k = 0;
      while (++k < 50) {
        done = maze.exploreFrontier();
        if (done) break;
      }
      if (done) {
        clearInterval(timerId);
        setup();
        ball.draw();
        window.addEventListener("keydown", moveBall);
        window.addEventListener("keydown", timerBar, {once: true})
        outer.addEventListener("click", handleRestart);
      }
      return done;
    }, 50);

  }

  render(){
    return (
        <div className="maze">
          <div className="buttons">
            <button onClick={this.handleRefresh.bind(this)}>New</button>
            <button className="restart" >Restart</button>
          </div>
          <div className="game">
            <div className="labyrinth">
              <div className="startpoint">
                <img className="startarrow" src="./images/start.png" alt="starting point"/>
                <canvas className="canvas" ref={this.canvas} width="800" height="500"/>
              </div>
              <img className="endarrow" src="./images/end.png" alt="ending point"/>
            </div>
            <canvas className="clock" ref={this.clock} width="600" height="10"/>
          </div>
        </div>
    )
  }
}
