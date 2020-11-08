import React, { useState, useEffect } from "react";
import Gameboard from "./Gameboard";

export const GameboardContainer = () => {
    const [ cellMatrix, setCellMatrix ] = useState(
        Array(64).fill().map(x => Array(64).fill(false))
    );
    
    // set initial state of cellMatrix
    useEffect( () => {
        let newCellMatrix = Array(64).fill().map((x,i) => cellMatrix[i]);
        for ( let i = 0; i < cellMatrix.length ; i++ ) {
            for ( let j = 0; j < cellMatrix[i].length; j++ ) {
                newCellMatrix[i][j] = Math.random() < 0.08;
            }
        }
    }
    ,[]);
    
    // update cellMatrix
    useEffect(() => {
        const interval = setInterval( () => {
            let newCellMatrix = Array(64).fill().map((x,i) => cellMatrix[i]);
            for ( let i = 0; i < cellMatrix.length ; i++ ) {
                for ( let j = 0; j < cellMatrix[i].length; j++ ) {
                    newCellMatrix[i][j] = willSurvive(i,j);
                }
            }
            setCellMatrix(newCellMatrix);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const mod = (n, m) => {
        return ((n % m) + m) % m;
    }

    // get the state of a specified cell
    const getCell = (row,column) => {
        // no wrap
        // return cellMatrix[row] && cellMatrix[row][column] || false;

        // toroidal
        let modRow = mod(row, cellMatrix.length);
        let modColumn = mod(column, cellMatrix[modRow].length);
        return cellMatrix[modRow][modColumn];
    }

    // will this cell survive this round?
    const willSurvive = (row, column) => {
        // count this cell's neightbors
        let neighborCount = 0;
        if (getCell(row - 1, column - 1)) neighborCount++;
        if (getCell(row - 1, column)) neighborCount++;
        if (getCell(row - 1, column + 1)) neighborCount++;
        if (getCell(row, column - 1)) neighborCount++;
        if (getCell(row, column + 1)) neighborCount++;
        if (getCell(row + 1, column - 1)) neighborCount++;
        if (getCell(row + 1, column)) neighborCount++;
        if (getCell(row + 1, column + 1)) neighborCount++;
        
        // if this cell is alive
        if (cellMatrix[row][column]) {
            // starvation
            if (neighborCount < 2) {
                return false;
            }
            // stasis
            else if (neighborCount === 2 || neighborCount === 3) {
                return true;
            }
            // overpopulation
            else if (neighborCount > 3) {
                return false;
            }
        }
        // reproduction
        else if (neighborCount === 3) {
            return true;
        }
    }

    return <Gameboard cellMatrix={cellMatrix} />;
}