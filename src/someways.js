import React from 'react';
import { Maze } from './maze';
import Clock from './clock';

const Someways = () => (
  <div>
    <header className="navbar">
     NAVBAR
    </header>
    <div className="game">
      <Maze />
      <Clock />
    </div>
  </div>
);

export default Someways;
