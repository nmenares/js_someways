import React from "react";
import { MazeObj } from "./maze_generator";
import { Ball } from "./ball";

let width = 800;
let height = 500;

export class Maze extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasClass: "canvas opacity-10",
    };
    this.updateClass = this.updateClass.bind(this);
    this.canvas = React.createRef();
    this.maze = undefined;
    this.ball = undefined;
  }

  updateClass(value) {
    this.setState({
      canvasClass: value,
    });
  }

  componentDidMount() {
    const ctx = this.canvas.current.getContext("2d");
    const setClass = this.updateClass;

    const cellSize = 10;
    const cellSpacing = 5;

    const start_pos = [cellSize, height - cellSize];

    let start =
      ((width - cellSpacing) / (cellSize + cellSpacing)) *
      ((height - cellSpacing) / (cellSize + cellSpacing) - 1);
    let opacity = 10;
    let outer = document.getElementsByClassName("restart")[0];
    let game_over = false;

    const maze = new MazeObj(width, height, cellSize, cellSpacing, ctx);
    const ball = new Ball({
      pos: start_pos,
      radius: cellSpacing - 1,
      ctx: ctx,
    });
    this.maze = maze;
    this.ball = ball;

    let winner = false;
    let playing = false;

    const youWin = () => {
      ctx.fillStyle = "#231942";
      ctx.globalAlpha = 1;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#f0e6ef";
      ctx.globalAlpha = 1;
      ctx.textAlign = "center";
      ctx.font = "64px monospace";
      ctx.fillText("You Win!", width / 2, height / 2);
      winner = true;
      setClass("canvas opacity-10");
      game_over = true;
    };

    const youLose = () => {
      ctx.fillStyle = "#231942";
      ctx.globalAlpha = 1;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#f0e6ef";
      ctx.globalAlpha = 1;
      ctx.textAlign = "center";
      ctx.font = "64px monospace";
      ctx.fillText("Game Over", width / 2, height / 2);
      game_over = true;
    };

    function moveBall(e) {
      if (e.keyCode === 37) {
        //west
        e.preventDefault();
        if (maze.cells[start]["W"] === true) {
          start = start - 1;
          ball.move(ball.pos[0] - (cellSize + cellSpacing), ball.pos[1]);

          if (start === (width - cellSpacing) / (cellSize + cellSpacing) - 1) {
            youWin();
            window.removeEventListener("keydown", moveBall);
          }
        }
      } else if (e.keyCode === 38) {
        //north
        e.preventDefault();
        if (maze.cells[start]["N"] === true) {
          start = start - (width - cellSpacing) / (cellSize + cellSpacing);
          ball.move(ball.pos[0], ball.pos[1] - (cellSize + cellSpacing));

          if (start === (width - cellSpacing) / (cellSize + cellSpacing) - 1) {
            youWin();
            window.removeEventListener("keydown", moveBall);
          }
        }
      } else if (e.keyCode === 39) {
        //east
        e.preventDefault();
        if (maze.cells[start]["E"] === true) {
          start = start + 1;
          ball.move(ball.pos[0] + (cellSize + cellSpacing), ball.pos[1]);

          if (start === (width - cellSpacing) / (cellSize + cellSpacing) - 1) {
            youWin();
            window.removeEventListener("keydown", moveBall);
          }
        }
      } else if (e.keyCode === 40) {
        //south
        e.preventDefault();
        if (maze.cells[start]["S"] === true) {
          start = start + (width - cellSpacing) / (cellSize + cellSpacing);
          ball.move(ball.pos[0], ball.pos[1] + (cellSize + cellSpacing));

          if (start === (width - cellSpacing) / (cellSize + cellSpacing) - 1) {
            youWin();
            window.removeEventListener("keydown", moveBall);
          }
        }
      }
    }

    function opacityControler(e) {
      if (
        e.keyCode === 37 ||
        e.keyCode === 38 ||
        e.keyCode === 39 ||
        e.keyCode === 40
      ) {
        e.preventDefault();
        if (!playing) {
          playing = true;
          const timerId2 = setInterval(function () {
            if (winner) {
              clearInterval(timerId2);
            } else if (opacity >= 0) {
              opacity -= 1;
              setClass("canvas opacity-" + opacity);
            } else {
              clearInterval(timerId2);
              youLose();
              window.removeEventListener("keydown", moveBall);
            }
          }, 6000);
        }
      }
    }

    function setup() {
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#d6eadf";
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.arc(start_pos[0], start_pos[1], 30, 0, 2 * Math.PI, true);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#95b8d1";
      ball.draw();
      window.addEventListener("keydown", moveBall);
      window.addEventListener("keydown", opacityControler, { once: true });
      outer.addEventListener("click", handleRestart);
    }

    function handleRestart(e) {
      e.preventDefault();
      winner = false;
      opacity = 10;
      window.removeEventListener("keydown", moveBall);
      window.removeEventListener("keydown", opacityControler);
      outer.removeEventListener("click", handleRestart);
      maze.cleanMaze();
      ball.initialPosition(start_pos);
      setup();
    }

    const timerId = setInterval(function () {
      let done;
      let k = 0;
      while (++k < 50) {
        done = maze.exploreFrontier();
        if (done) break;
      }
      if (done) {
        clearInterval(timerId);
        setup();
      }
      return done;
    }, 50);
  }

  render() {
    return (
      <div className="maze">
        <div className="game">
          <div className="labyrinth">
            <div className="startpoint">
              <canvas
                className={this.state.canvasClass}
                ref={this.canvas}
                width={width}
                height={height}
              />
            </div>
            <div className="buttons">
              <button className="restart">&#10227;</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
