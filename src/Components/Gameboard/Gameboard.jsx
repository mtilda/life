import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Cell from '../Cell/Cell';

const GameBoard = styled.div`{
  width: 100vw;
  max-width: calc(100vh - 150px);
  height: 100vw;
  max-height: calc(100vh - 150px);
  padding: 20px;
  margin: 10px auto;
  display: grid;
  grid-template-rows: repeat(${({ matrixSize }) => matrixSize},1fr);
  grid-template-columns: repeat(${({ matrixSize }) => matrixSize},1fr);
  gap: 1px;
  background-color: slategray;
}`;

export default ({ matrixSize, play, reset, dismissReset, tick, setTick }) => {
  const [cellMatrix, setCellMatrix] = useState(
    Array(matrixSize).fill().map(x => Array(matrixSize).fill(false))
  );

  // handle reset
  useEffect(() => {
    if (reset) {
      seedMatrix();
      dismissReset();
    }
  }
  , [reset, matrixSize]);

  // update cellMatrix
  useEffect(() => {
    const interval = setInterval(() => {
      if (play) {
        const newCellMatrix = [];

        for (let i = 0; i < cellMatrix.length; i++) {
          newCellMatrix.push([]);
          for (let j = 0; j < cellMatrix[i].length; j++) {
            newCellMatrix[i].push(willSurvive(i, j));
          }
        }

        setTick(tick + 1);
        setCellMatrix(newCellMatrix);
      }
    }, 0);
    return () => clearInterval(interval);
  });

  // set initial state of cellMatrix
  const seedMatrix = () => {
    const newCellMatrix = [];
    for (let i = 0; i < matrixSize; i++) {
      newCellMatrix.push([]);
      for (let j = 0; j < matrixSize; j++) {
        newCellMatrix[i][j] = Math.random() < 0.1;
        // newCellMatrix[i][j] = Math.pow(Math.random(), 2) * Math.round(Math.pow(i - matrixSize / 2, 2) + Math.pow(j - matrixSize / 2, 2)) < 5;
        // newCellMatrix[i][j] = Math.round(Math.sqrt(Math.pow(i - matrixSize / 2, 2) + Math.pow(j - matrixSize / 2, 2))) % 5 === 0;
        // newCellMatrix[i][j] = i * j % 7 === 0;
      }
    }
    setTick(0);
    setCellMatrix(newCellMatrix);
  };

  const mod = (n, m) => {
    return ((n % m) + m) % m;
  };

  // get the state of a specified cell
  const getCell = (row, column) => {
    // no wrap
    // return cellMatrix[row] && cellMatrix[row][column] || false;

    // toroidal
    const modRow = mod(row, cellMatrix.length);
    const modColumn = mod(column, cellMatrix[modRow].length);
    return cellMatrix[modRow][modColumn];
  };

  // will this cell survive this round?
  const willSurvive = (row, column) => {
    // count this cell's neightbors
    // [
    //   [1, 1, 1],
    //   [1, 0, 1],
    //   [1, 1, 1]
    // ];
    let neighborCount = 0;
    let i = 0;
    while (i <= 8) {
      if (getCell(row - 1 + Math.floor(i / 3), column - 1 + i % 3)) neighborCount++;
      i += i === 3 ? 2 : 1; // skip self
    }

    if (cellMatrix[row][column] || Math.random() < 0.001) { // if this cell is alive
      if (neighborCount < 2) { // starvation
        return false;
      } else if (neighborCount === 2 || neighborCount === 3) { // stasis
        return true;
      } else if (neighborCount > 3) { // overpopulation
        return false;
      }
    } else if (neighborCount === 3) { // reproduction
      return true;
    } else return false;
  };

  return (
    <GameBoard matrixSize={matrixSize}>
      {cellMatrix
        ? cellMatrix.map((row, rowIndex) =>
            row.map((cell, columnIndex) =>
              <Cell key={rowIndex * row.length + columnIndex} column={columnIndex} row={rowIndex} isAlive={cell} />
            ))
        : <></>}
    </GameBoard>
  );
};
