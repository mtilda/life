import React from "react";
import "./Cell.css";

export default ({ rowIndex, columnIndex, isAlive }) =>
    <div className="cell" id={`cell-${rowIndex}-${columnIndex}`} style={{
        backgroundColor: isAlive ? "lightgray" : "lightslategray"
    }} />