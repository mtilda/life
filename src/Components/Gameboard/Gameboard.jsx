import React from "react";
import Cell from "../Cell/Cell";
import "./Gameboard.css";

export default ({ cellMatrix }) =>
    <div id="gameboard">
        { cellMatrix ?
            cellMatrix.map( (row, rowIndex) =>
                row.map( (cell, columnIndex) =>
                    <Cell column={columnIndex} row={rowIndex} isAlive={cell} />
            ))
            :
            <></>
        }
    </div>