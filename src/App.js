import { useState } from 'react';
import Header from './Components/Header/Header';
import TickCounter from './Components/TickCounter/TickCounter';
import { GameboardContainer as Gameboard } from './Components/Gameboard/Gameboard.container';
import './App.css';

export default () => {
  const [tick, setTick] = useState(0);
  const [play, setPlay] = useState(true);
  const [reset, setReset] = useState(true);

  const handlePlay = () => {
    setPlay(true);
  };

  const handlePause = () => {
    setPlay(false);
  };

  const handleReset = () => {
    setReset(true);
  };

  const dismissReset = () => {
    setReset(false);
  };

  return (
    <div className='app'>
      <Header play={play} handlePlay={handlePlay} handlePause={handlePause} handleReset={handleReset} />
      <TickCounter tick={tick} />
      <Gameboard matrixSize={64} play={play} reset={reset} dismissReset={dismissReset} tick={tick} setTick={setTick} />
    </div>
  );
};
