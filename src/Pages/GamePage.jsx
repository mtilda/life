import { useState } from 'react';
import Header from '../Components/Header/Header';
import TickCounter from '../Components/TickCounter/TickCounter';
import Gameboard from '../Components/Gameboard/Gameboard';

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
    <>
      <Gameboard
        width={1600}
        height={800}
        matrixWidth={1024}
        matrixHeight={512}
        mutationRate={0.00001}
        trail={0.2}
        play={play}
        reset={reset}
        dismissReset={dismissReset}
        tick={tick}
        setTick={setTick}
      >
        <Header play={play} handlePlay={handlePlay} handlePause={handlePause} handleReset={handleReset} />
        <TickCounter tick={tick} />
      </Gameboard>
    </>
  );
};
