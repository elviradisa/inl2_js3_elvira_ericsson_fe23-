import React from "react";
import Cell from "./Cell";

export default function MineCell ({cell, onClick, gameOver}) {
    let cellCopy = {...cell};

    if (gameOver && cell.hasMine) {
        cellCopy.displayValue = 'X';
    }

    return <Cell cell={cellCopy} onClick={onClick}></Cell>;
    
}