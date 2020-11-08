import React from "react";
import Cell from "../Cell/Cell";
import "./Gameboard.css";

export default ({ cellMatrix, matrixSize }) =>
    <div
        id="gameboard"
        style={{
            gridTemplateColumns: `repeat(${matrixSize},1fr)`,
            gridTemplateRows: `repeat(${matrixSize},1fr)`
        }}
    >
        { cellMatrix ?
            cellMatrix.map( (row, rowIndex) =>
                row.map( (cell, columnIndex) =>
                    <Cell column={columnIndex} row={rowIndex} isAlive={cell} />
            ))
            :
            <></>
        }
    </div>