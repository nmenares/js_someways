import React from 'react';

class Clock extends React.Component{
  constructor(props){
    super(props);
    this.clock = React.createRef();
    this.ctx = undefined;
  }

  componentDidMount(){
    const ctx = this.clock.current.getContext("2d");
    let start = 0;

    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
        const timerId = setInterval( function(){
          if (start < 600){
            ctx.fillStyle = "black";
            ctx.fillRect(589, 0, 11, 10);
            ctx.fillStyle = "white";
            ctx.font = "10px serif";
            let timer = 60 - (start / 10);
            ctx.fillText(`${timer}`, 590 , 8);
            ctx.fillStyle = "white";
            ctx.fillRect(start-1, 0, 11, 10)
            start = start + 10
          }else{
            clearInterval(timerId);
          }
          }, 1000)

        }
      }, {once: true})
  }

  render(){
    return (
      <div>
        <canvas className="clock" ref={this.clock} width="600" height="10"/>
      </div>
    )
  }


};

export default Clock;
