import React from 'react';
import './Header.css';

export default ({ play, handlePlay, handlePause, handleReset }) =>
  <header>
    <h1>Conway's Game of Life</h1>
    <div className='nav-wrapper'>
      <nav>
        <ul>
          <li><button onClick={handlePlay} className={`${play ? 'play' : ''}`}>play</button></li>
          <li><button onClick={handlePause}>pause</button></li>
          <li><button onClick={handleReset}>reset</button></li>
        </ul>
      </nav>
    </div>
  </header>;
