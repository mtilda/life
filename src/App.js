import react, { useState } from "react";
import Header from "./Components/Header/Header";
import { GameboardContainer as Gameboard } from "./Components/Gameboard/Gameboard.container";
import "./App.css";

export default () => {
  const [play, setPlay] = useState(true);
  const [reset, setReset] = useState(true);

  const handlePlay = () => {
    setPlay(true);
  }
  
  const handlePause = () => {
    setPlay(false);
  }

  const handleReset = () => {
    setReset(true);
  }

  const dismissReset = () => {
    setReset(false);
  }

  return (
    <div className="App">
      <Header play={play} handlePlay={handlePlay} handlePause={handlePause} handleReset={handleReset} />
      <Gameboard matrixSize={128} play={play} reset={reset} dismissReset={dismissReset} />
    </div>
  );
}