import React from 'react';
import { Maze } from './maze';
import Clock from './clock';

const Someways = () => (
  <div>
    <header className="navbar">
     <div className="sub_navbar">
       <img src="../images/someways.png" alt="Someways"/>
       <h1>SomeWays</h1>
     </div>
     <div className="sub_navbar">
       <a href="https://github.com/nmenares/js_someways" target="_blank"><img src="../images/GitHub.png" alt="GitHub"/></a>
       <a href="https://www.linkedin.com/in/nmenares/" target="_blank"><img src="../images/in.png" alt="Linkedin"/></a>
     </div>
    </header>
    <div className="body">
      <div className="sidebar">
        <h3>Find the ways hitting the arrow keys.</h3>
        <img src="../images/arrowkeys.png" alt="someways"/>
        <h4>You only have 60 seconds!</h4>
      </div>
      <div className="content">
        <Maze />
      </div>
    </div>
  </div>
);

export default Someways;
