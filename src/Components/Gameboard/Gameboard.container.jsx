import React, { useState, useEffect } from "react";
import Gameboard from "./Gameboard";

export const GameboardContainer = () => {
    const [ cellMatrix, setCellMatrix ] = useState(
        Array(50).fill().map(x => Array(50).fill(false))
    );
    
    // set initial state of cellMatrix
    useEffect( () =>
        setCellMatrix(Array(50).fill().map((x,i) => Array(50).fill(false)))
    ,[]);
    
    // update cellMatrix
    useEffect(() => {
        const interval = setInterval( () => {
            let newCellMatrix = Array(50).fill().map((x,i) => cellMatrix[i]);
            newCellMatrix
                [Math.floor(Math.random() * 50)]
                [Math.floor(Math.random() * 50)]
            = true;
            setCellMatrix(newCellMatrix);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const willSurvive = (rowIndex, columnIndex) => {
        
    }

    

    return <Gameboard cellMatrix={cellMatrix} />;
}