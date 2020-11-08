import Header from "./Components/Header/Header";
import { GameboardContainer as Gameboard } from "./Components/Gameboard/Gameboard.container";
import "./App.css";

export default () => {
  return (
    <div className="App">
      <Header />
      <Gameboard matrixSize={128} />
    </div>
  );
}