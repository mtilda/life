import { useState } from 'react';
import useWindowDimensions from '../Hooks/useWindowDimensions';
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

  const windowDimensions = useWindowDimensions();

  return (
    <>
      <Gameboard
        width={windowDimensions.width}
        height={windowDimensions.height}
        matrixWidth={Math.floor(windowDimensions.width / 10)}
        matrixHeight={Math.floor(windowDimensions.height / 10)}
        mutationRate={0.00001}
        trail={0.5}
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
