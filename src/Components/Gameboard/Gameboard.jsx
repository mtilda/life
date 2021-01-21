import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export default ({ width, height, matrixWidth, matrixHeight, play, reset, dismissReset, tick, setTick }) => {
  const [cellMatrix, setCellMatrix] = useState(
    Array(matrixHeight).fill().map(x => Array(matrixWidth).fill(false))
  );

  // handle reset
  useEffect(() => {
    if (reset) {
      seedMatrix();
      dismissReset();
    }
  }, [reset, matrixWidth, matrixHeight]);

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
    for (let i = 0; i < matrixHeight; i++) {
      newCellMatrix.push([]);
      for (let j = 0; j < matrixWidth; j++) {
        // newCellMatrix[i][j] = Math.random() < 0.1;
        newCellMatrix[i][j] = Math.pow(Math.random(), 2) * Math.round(Math.pow(i - matrixHeight / 2, 2) + Math.pow(j - matrixWidth / 2, 2)) < 5;
        // newCellMatrix[i][j] = Math.round(Math.sqrt(Math.pow(i - matrixHeight / 2, 2) + Math.pow(j - matrixWidth / 2, 2))) % 5 === 0;
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

    if (cellMatrix[row][column] || Math.random() < 0.0001) { // if this cell is alive
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

  const canvasRef = useRef(null);

  // refresh canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    draw(
      context,
      canvasRef.current && 4 * canvasRef.current.clientWidth,
      canvasRef.current && 4 * canvasRef.current.clientHeight,
      matrixWidth,
      matrixHeight
    );
  }, [cellMatrix, matrixWidth, matrixHeight]);

  // draw the cell matrix on the canvas
  const draw = (context, canvasWidth, canvasHeight, matrixWidth, matrixHeight) => {
    const scale = {
      x: canvasWidth / matrixWidth,
      y: canvasHeight / matrixHeight
    };
    // clear the canvas
    context.fillStyle = 'rgba(112,128,144,0.3)';
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    // draw each cell
    context.fillStyle = 'rgba(211,211,211,1)';
    cellMatrix.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        cell && context.fillRect(columnIndex * scale.x, rowIndex * scale.y, scale.x, scale.y);
      });
    });
  };

  return (
    <Container width={width} height={height}>
      <Canvas
        width={canvasRef.current && 4 * canvasRef.current.clientWidth}
        height={canvasRef.current && 4 * canvasRef.current.clientHeight}
        ref={canvasRef}
      />
    </Container>
  );
};

const Container = styled.div`{
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
  margin: auto auto;
  background-color: slategray;
}`;

const Canvas = styled.canvas`{
  width: 100%;
  height: 100%;
}`;
