import React from 'react';
import { MazeObj } from './maze_generator';
import { Ball } from './ball';


const width = 800;
const height = 500;
let amount_of_food = 0;


export class Maze extends React.Component{
  constructor(props){
    super(props);
    this.canvas = React.createRef();
    this.clock = React.createRef();
    this.counter = React.createRef();
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
    const ctx3 = this.counter.current.getContext("2d");
    const cellSize = 10;
    const cellSpacing = 5;
    const cellWidth = Math.floor((width - cellSpacing) / (cellSize + cellSpacing));
    const cellHeight = Math.floor((height - cellSpacing) / (cellSize + cellSpacing));
    const start_positions = [[cellSize, height - cellSize], [cellSize, cellSize], [width - cellSize, height - cellSize]];
    const random_index = Math.floor(Math.random() * start_positions.length);
    const third = Math.floor(cellWidth * cellHeight / 3);
    const food = [third + Math.floor(Math.random() * third - 1)];
    let food_copy = food.map (el => el);

    let start_pos = [start_positions[random_index][0], start_positions[random_index][1]];
    const start_array = [(width - cellSpacing)/(cellSize + cellSpacing) * (((height - cellSpacing)/(cellSize + cellSpacing)) - 1), 0, ((width - cellSpacing)/(cellSize + cellSpacing)) * ((height - cellSpacing)/(cellSize + cellSpacing)) -1 ];
    let start = start_array[random_index];
    let timer = 0;
    let outer  = document.getElementsByClassName('restart') [0];
    let stop_prior_time = false;
    let game_over = false;
    let eaten = 0;

    const maze = new MazeObj(width, height, cellSize, cellSpacing, ctx);
    const ball = new Ball({ pos: start_pos, radius: cellSpacing - 1, ctx: ctx});
    this.maze = maze;
    this.ball = ball;

    let winner = false;

    const youWin = () => {
      ctx.fillStyle = "black";
      ctx.globalAlpha=0.5;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "white";
      ctx.globalAlpha=1;
      ctx.textAlign = "center";
      ctx.font = "64px monospace";
      ctx.fillText("You Win!", width/2 , height/2);
      winner = true;
      game_over = true;
      ctx3.fillStyle = "white";
      ctx3.fillRect(0, 0, 400, 40);
      ctx3.fillStyle = "black";
      ctx3.textAlign = "center";
      ctx3.font = "20px monospace";
      ctx3.fillText(`Congratulations, you win!`, 200 , 30);
    };

    const youLose = () => {
      ctx.fillStyle = "black";
      ctx.globalAlpha=0.5;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "white";
      ctx.globalAlpha=1;
      ctx.textAlign = "center";
      ctx.font = "64px monospace";
      ctx.fillText("Game Over", width/2 , height/2);
      game_over = true;
      ctx3.fillStyle = "white";
      ctx3.fillRect(0, 0, 400, 40);
      ctx3.fillStyle = "black";
      ctx3.textAlign = "center";
      ctx3.font = "20px monospace";
      ctx3.fillText(`You lose :(`, 200 , 30);
    };

    function moveBall(e){
      if (e.keyCode === 37) { //west
        e.preventDefault();
        if(maze.cells[start]["W"] === true) {
          start = start - 1;
          ball.move( ball.pos[0] - (cellSize + cellSpacing), ball.pos[1]);
          if(food_copy.includes(start)) {
            amount_of_food += 1;
            food_counter();
            food_copy = food_copy.filter(el => el != start);
            fillCell(start);
            ctx.fillStyle = "rgb(153, 105, 241)";
            ball.draw();
            eaten += 1;
          }
          if(start === ((width - cellSpacing)/(cellSize + cellSpacing))-1  && eaten === 1){
            youWin();
            window.removeEventListener("keydown", moveBall);
          } else if (start === ((width - cellSpacing)/(cellSize + cellSpacing))-1){
            ctx3.fillStyle = "black";
            ctx3.fillRect(0, 0, 400, 40);
            ctx3.fillStyle = "white";
            ctx3.textAlign = "center";
            ctx3.font = "20px monospace";
            ctx3.fillText(`Go to green square first!`, 200 , 30);
          }
        }
      } else if (e.keyCode === 38) { //north
        e.preventDefault();
        if(maze.cells[start]["N"] === true) {
          start = start - (width - cellSpacing)/(cellSize + cellSpacing);
          ball.move( ball.pos[0], ball.pos[1] - (cellSize + cellSpacing));
          if(food_copy.includes(start)) {
            amount_of_food += 1;
            food_counter();
            food_copy = food_copy.filter(el => el != start);
            fillCell(start);
            ctx.fillStyle = "rgb(153, 105, 241)";
            ball.draw();
            eaten += 1;
          }
          if(start === ((width - cellSpacing)/(cellSize + cellSpacing))-1  && eaten === 1){
            youWin();
            window.removeEventListener("keydown", moveBall);
          } else if (start === ((width - cellSpacing)/(cellSize + cellSpacing))-1){
            ctx3.fillStyle = "black";
            ctx3.fillRect(0, 0, 400, 40);
            ctx3.fillStyle = "white";
            ctx3.textAlign = "center";
            ctx3.font = "20px monospace";
            ctx3.fillText(`Go to green square first!`, 200 , 30);
          }
        }
      } else if (e.keyCode === 39) { //east
        e.preventDefault();
        if(maze.cells[start]["E"] === true) {
          start = start + 1;
          ball.move( ball.pos[0] + (cellSize + cellSpacing), ball.pos[1]);
          if(food_copy.includes(start)) {
            amount_of_food += 1;
            food_counter();
            food_copy = food_copy.filter(el => el != start);
            fillCell(start);
            ctx.fillStyle = "rgb(153, 105, 241)";
            ball.draw();
            eaten += 1;
          }
          if(start === ((width - cellSpacing)/(cellSize + cellSpacing))-1  && eaten === 1){
            youWin();
            window.removeEventListener("keydown", moveBall);
          } else if (start === ((width - cellSpacing)/(cellSize + cellSpacing))-1){
            ctx3.fillStyle = "black";
            ctx3.fillRect(0, 0, 400, 40);
            ctx3.fillStyle = "white";
            ctx3.textAlign = "center";
            ctx3.font = "20px monospace";
            ctx3.fillText(`Go to green square first!`, 200 , 30);
          }
        }
      } else if (e.keyCode === 40) { //south
        e.preventDefault();
        if(maze.cells[start]["S"] === true) {
          start = start + (width - cellSpacing)/(cellSize + cellSpacing);
          ball.move( ball.pos[0], ball.pos[1] + (cellSize + cellSpacing));
          if(food_copy.includes(start)) {
            amount_of_food += 1;
            food_counter();
            food_copy = food_copy.filter(el => el != start);
            fillCell(start);
            ctx.fillStyle = "rgb(153, 105, 241)";
            ball.draw();
            eaten += 1;
          }
          if(start === ((width - cellSpacing)/(cellSize + cellSpacing))-1  && eaten === 1){
            youWin();
            window.removeEventListener("keydown", moveBall);
          } else if (start === ((width - cellSpacing)/(cellSize + cellSpacing))-1){
            ctx3.fillStyle = "black";
            ctx3.fillRect(0, 0, 400, 40);
            ctx3.fillStyle = "white";
            ctx3.textAlign = "center";
            ctx3.font = "20px monospace";
            ctx3.fillText(`Go to green square first!`, 200 , 30);
          }
        }
      }
    };

    function timerBar(e) {
      if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
        e.preventDefault();
        const timerId2  = setInterval( function(){
          if (stop_prior_time === true){
            clearInterval(timerId2);
            stop_prior_time = false;
          } else if (timer < 60 && winner) {
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

    function fillFood(index){
      let i = index % cellWidth;
      let j = Math.floor(index / cellWidth);
      ctx.fillStyle="rgb(245, 118, 221)";
      ctx.globalAlpha=0.4;
      ctx.beginPath();
      ctx.arc(i * cellSize + (i + 2) * cellSpacing, j * cellSize + (j + 2) * cellSpacing, 15, 0, 2 * Math.PI, true);
      ctx.fill();
      ctx.globalAlpha=1;
      ctx.fillStyle="rgb(110, 245, 82)";
      ctx.fillRect(i * cellSize + (i + 1) * cellSpacing, j * cellSize + (j + 1) * cellSpacing, cellSize, cellSize);
      ctx.fillStyle="rgb(245, 118, 221)";
      ctx.fillRect(i * cellSize + (i + 1) * cellSpacing+3, j * cellSize + (j + 1) * cellSpacing +3 , cellSize-6, cellSize-6);
    };

    function fillCell(index){
      let i = index % cellWidth;
      let j = Math.floor(index / cellWidth);
      ctx.fillStyle="white";
      ctx.fillRect(i * cellSize + (i + 1) * cellSpacing, j * cellSize + (j + 1) * cellSpacing, cellSize, cellSize);
    };

    function food_counter(){
      if (amount_of_food < 1) {
        ctx3.fillStyle = "white";
        ctx3.fillRect(0, 0, 400, 40);
        ctx3.fillStyle = "Black";
        ctx3.textAlign = "center";
        ctx3.font = "20px monospace";
        ctx3.fillText(`Go to green square!`, 200 , 30);
      } else {
        ctx3.fillStyle = "white";
        ctx3.fillRect(0, 0, 400, 40);
        ctx3.fillStyle = "Black";
        ctx3.textAlign = "center";
        ctx3.font = "20px monospace";
        ctx3.fillText(`Go to the exit!`, 200 , 30);
      }
    }

    function setup(){
      food_counter();
      ctx.globalAlpha=1;
      ctx2.fillStyle = "black";
      ctx2.fillRect(0, 0, 600, 10);
      ctx.fillStyle = "rgb(61, 254, 213)";
      ctx.globalAlpha=0.6;
      ctx.beginPath();
      ctx.arc(start_pos[0], start_pos[1], 20, 0, 2 * Math.PI, true);
      ctx.fill();
      ctx.globalAlpha=1;
      food.forEach(cell => fillFood(cell));
      ctx.globalAlpha=1;
      ctx.fillStyle = "rgb(153, 105, 241)";
      ball.draw();
      window.addEventListener("keydown", moveBall);
      window.addEventListener("keydown", timerBar, {once: true})
      outer.addEventListener("click", handleRestart);
    }

    function handleRestart(e){
      e.preventDefault();
      game_over === true ? stop_prior_time = false : stop_prior_time = true;
      winner = false;
      timer = 0;
      eaten = 0;
      amount_of_food = 0;
      start = start_array[random_index];
      start_pos = [start_positions[random_index][0], start_positions[random_index][1]];
      food_copy = food.map (el => el);
      window.removeEventListener("keydown", moveBall);
      window.removeEventListener("keydown", timerBar);
      outer.removeEventListener("click", handleRestart);
      maze.cleanMaze();
      ball.initialPosition(start_pos);
      setup();
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
            <canvas className="counter" ref={this.counter} width="400" height="40"/>
          </div>
          <div className="game">
            <div className="labyrinth">
              <div className="startpoint">
                <canvas className="canvas" ref={this.canvas} width={width} height={height}/>
              </div>
              <img className="endarrow" src="./images/end.png" alt="ending point"/>
            </div>
            <canvas className="clock" ref={this.clock} width="600" height="10"/>
          </div>
        </div>
    )
  }
}
