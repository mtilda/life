import React, { useState, useEffect } from "react";
import Gameboard from "./Gameboard";

export const GameboardContainer = () => {
    const [ cellMatrix, setCellMatrix ] = useState(
        Array(matrixSize).fill().map(x => Array(64).fill(false))
    );
    
    // set initial state of cellMatrix
    useEffect( () => {
        const newCellMatrix = [];
        for ( let i = 0; i < 64; i++ ) {
            newCellMatrix.push([]);
            for ( let j = 0; j < 64; j++ ) {
                // newCellMatrix[i][j] = Math.random() * Math.round(Math.pow(i-32,2)+Math.pow(j-32,2)) < 2;
                newCellMatrix[i][j] = Math.random() < 0.1;
            }
        }
        setCellMatrix(newCellMatrix);
    }
    ,[]);
    
    // update cellMatrix
    useEffect(() => {
        const interval = setInterval( () => {
            const newCellMatrix = [];

            for ( let i = 0; i < cellMatrix.length ; i++ ) {
                newCellMatrix.push([]);
                for ( let j = 0; j < cellMatrix[i].length; j++ ) {
                    newCellMatrix[i].push(willSurvive(i,j));
                }
            }

            setCellMatrix(newCellMatrix);
        }, 0);
        return () => clearInterval(interval);
    });

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
        if (getCell(row - 1, column - 1))   neighborCount++;
        if (getCell(row - 1, column))       neighborCount++;
        if (getCell(row - 1, column + 1))   neighborCount++;
        if (getCell(row, column - 1))       neighborCount++;
        if (getCell(row, column + 1))       neighborCount++;
        if (getCell(row + 1, column - 1))   neighborCount++;
        if (getCell(row + 1, column))       neighborCount++;
        if (getCell(row + 1, column + 1))   neighborCount++;
        
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
        else return false;
    }

    return <Gameboard cellMatrix={cellMatrix} />;
}