import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export default ({
  children,
  width = null,
  height = null,
  matrixWidth,
  matrixHeight,
  originOffsetY = 30,
  originOffsetX = 30,
  scale = 1,
  mutationRate = 0,
  trail = 0,
  play = true,
  reset = false,
  dismissReset = () => {},
  tick = 0,
  setTick = () => {}
}) => {
  const [cellMatrix, setCellMatrix] = useState(
    Array(matrixHeight).fill().map(x => Array(matrixWidth).fill(false))
  );

  // handle reset
  useEffect(() => {
    if (reset) {
      seedMatrix();
      dismissReset();
    }
  }, [reset]);

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
    }, 50);
    return () => clearInterval(interval);
  });

  // set initial state of cellMatrix
  const seedMatrix = () => {
    const newCellMatrix = [];
    for (let i = 0; i < matrixHeight; i++) {
      newCellMatrix.push([]);
      for (let j = 0; j < matrixWidth; j++) {
        newCellMatrix[i][j] = Math.random() < 0.1;
        // newCellMatrix[i][j] = Math.pow(Math.random(), 2) * Math.round(Math.pow(i - matrixHeight / 2, 2) + Math.pow(j - matrixWidth / 2, 2)) < 5;
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

    if (cellMatrix[row][column] || Math.random() < mutationRate) { // if this cell is alive
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
    const canvasWidth = canvasRef.current && canvasRef.current.clientWidth;
    const canvasHeight = canvasRef.current && canvasRef.current.clientHeight;
    let pixelsPerCell = null;
    if (canvasWidth > canvasHeight) {
      pixelsPerCell = scale * canvasWidth / matrixWidth;
    } else {
      pixelsPerCell = scale * canvasHeight / matrixHeight;
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawCellMatrix(
      ctx,
      canvasWidth,
      canvasHeight,
      pixelsPerCell
    );
  }, [cellMatrix, matrixWidth, matrixHeight]);

  // draw the cell matrix on the canvas
  const drawCellMatrix = (
    ctx,
    canvasWidth,
    canvasHeight,
    pixelsPerCell
  ) => {
    // clear the canvas
    if (trail) {
      ctx.globalCompositeOperation = 'destination-in';
      ctx.fillStyle = `rgba(256,256,256,${trail})`;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    } else {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }
    // draw each cell
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(211,211,211,1)';
    cellMatrix.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        cell && ctx.fillRect(
          pixelsPerCell * columnIndex + originOffsetX,
          pixelsPerCell * rowIndex + originOffsetY,
          pixelsPerCell,
          pixelsPerCell);
      });
    });
  };

  return (
    <Container width={width} height={height}>
      <Canvas
        width={canvasRef.current && canvasRef.current.clientWidth}
        height={canvasRef.current && canvasRef.current.clientHeight}
        ref={canvasRef}
      />
      <ChildrenContainer>{children}</ChildrenContainer>
    </Container>
  );
};

const Container = styled.div`{
  position: relative;
  width: ${({ width }) => width ? width + 'px' : '100%'};
  height: ${({ height }) => height ? height + 'px' : '100%'};
  margin: auto auto;
}`;

const Canvas = styled.canvas`{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}`;

const ChildrenContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;
