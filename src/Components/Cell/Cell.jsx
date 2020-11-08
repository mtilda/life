import React from "react";
import "./Cell.css";

export default ({ row, column, isAlive }) =>
    <div className="cell" id={`cell-${row}-${column}`} style={{
        backgroundColor: isAlive ? "lightgray" : "lightslategray"
    }} />