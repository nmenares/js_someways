import React from 'react';
import { MazeObj } from './maze_generator';
import { Ball } from './ball';

class Maze extends React.Component{
  constructor(props){
    super(props);
    this.canvas = React.createRef();
    this.ctx = undefined;
  }

  componentDidMount(){
    const ctx = this.canvas.current.getContext("2d");
    const width = 800;
    const height = 500;
    const cellSize = 10;
    const cellSpacing = 5;

    const maze = new MazeObj(width, height, cellSize, cellSpacing, ctx);

    const timerId = setInterval(function() {
      let done;
      let k = 0;
      while (++k < 50) {
        done = maze.exploreFrontier();
        if (done) break;
      }
      if (done) {
        const ball = new Ball({ pos: [cellSize, height - cellSize], radius: cellSpacing - 1, ctx: ctx});
        ball.draw();
        window.addEventListener("keydown", (e) => {
          if (e.keyCode === 37) { //left
            ball.move( ball.pos[0] - (cellSize + cellSpacing), ball.pos[1])
          } else if (e.keyCode === 38) { //up
            ball.move( ball.pos[0], ball.pos[1] - (cellSize + cellSpacing))
          } else if (e.keyCode === 39) { //right
            ball.move( ball.pos[0] + (cellSize + cellSpacing), ball.pos[1])
          } else if (e.keyCode === 40) { //down
            ball.move( ball.pos[0], ball.pos[1] + (cellSize + cellSpacing))
          }
        })
        clearInterval(timerId);
      }
      return done;
    }, 50);

  }

  render(){
    return (
      <div>
        <canvas className="canvas" ref={this.canvas} width="800" height="500"/>
      </div>
    )
  }
}

export default Maze;
