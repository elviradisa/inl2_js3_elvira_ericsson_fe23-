import React from "react";

// exporterar Cell som är en funktionskomponent
// propen cell innehåller info om cellens tillstång
// propen onClick är en callbackfunktion som hanterar klickningar
export default function Cell ({cell = {}, onClick}) {
    console.log(cell)
    let displayValue = '';
 
    // om en cell har en eller flera grann-minor sätts displayValue till det antalet
    if (cell.visible) {
        if (cell.numberOfNeighbouringMines > 0) {
            displayValue = cell.numberOfNeighbouringMines;
        }
    }

    // anropas när cellen klickas
    // skickar med index till föräldern så den vet vilken cell som blev klickad
    const clickHandler = () => {
        onClick(cell.index); 
    };

    // returnerar en knapp för varje cell 
    return (
        // CSS för cellerna
        <button style= {{
            height: '30px',
            width: '30px'
        }}
            // clickHandler kopplas till knappens onClick-event och anropas vid klick
            onClick={clickHandler}
            // gör att knappen inte går att klicka på om den redan visats
            disabled={cell.visible}

        >{displayValue}</button>
    );
}

