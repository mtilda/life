import { useState } from 'react';
import useWindowDimensions from '../Hooks/useWindowDimensions';
import Header from '../Components/Header/Header';
import TickCounter from '../Components/TickCounter/TickCounter';
import Gameboard from '../Components/Gameboard/Gameboard';

export default () => {
  const { width, height } = useWindowDimensions();
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
    <div style={{ width: '100vw', height: '100vh' }}>
      <Gameboard
        // width={width}
        // height={height}
        matrixWidth={Math.floor(width / 10)}
        matrixHeight={Math.floor(height / 10)}
        originOffsetY={0}
        originOffsetX={0}
        scale={1}
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
    </div>
  );
};
