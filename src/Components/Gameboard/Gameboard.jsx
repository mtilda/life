import React from "react";
import Cell from "../Cell/Cell";
import "./Gameboard.css";

export default ({ cellMatrix }) =>
    <div id="gameboard">
        { cellMatrix ?
            cellMatrix.map( (row, rowIndex) =>
                row.map( (cell, columnIndex) =>
                    <Cell columnIndex={columnIndex} rowIndex={rowIndex} isAlive={cell} />
            ))
            :
            <></>
        }
    </div>