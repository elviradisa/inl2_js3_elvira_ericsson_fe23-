import React from "react";
import createBoard from "./utils.js"
import Cell from "./Cell.jsx";
console.log(createBoard)

class BoardComponent extends React.Component {
    // skapar komponentens initiala state
    constructor(props) {
        super(props);
        this.state = {
            // innehåller spelbräda som skickats med från createBord
            board: createBoard(25, 5), 
            // flaggar för om spelaren vunnit eller förlorat
            gameOver: false,
            gameWon: false
        };
    }

    // sätter cellens property till visible för att visa att den är klickad
    showCell(i) {
        const { board } = this.state;
        board[i].visible = true;
        // uppdaterar state så att spelbrädet får den uppdaterade cellen
        this.setState({ board });
    }

    // metod som har hand om när en cell klickats
    // i är indexet för den klickade cellen
    clickHandler = (i) => {
        const {board, gameOver, gameWon} = this.state;
        // om spelaren vunnit, förlorat eller en cell redan är klickad så kan man inte klicka igen
        if (gameOver || gameWon || board[i].visible) return; 

        // om cellen har en mina sätts gameOver till true i stsaten
        if (board[i].hasMine) {
            this.setState({ gameOver: true });
        } else {
            // om cellen inte har en mina anropas showCell för att visa cellen
            // och checkWIn för o kolla om spelaren vunnit
            this.showCell(i);
            this.checkWin();
        }
    }

    // kollar om spelaren vunnit genom att kolla om alla celler utan miner är synliga
    checkWin() {
        const { board } = this.state;
        const gameWon = board.every(cell => cell.hasMine || cell.visible);

        // om alla celler utan minor har visats så uppdateras state så att gameWon är true
        if (gameWon) {
            this.setState({ gameWon: true });
        }
    }

    render() {
        const { board, gameOver, gameWon } = this.state;

        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {/* visar Game Over om spelaren förlorat */}
                {gameOver && <div style={{
                    position: 'absolute',
                    backgroundColor: 'white',
                    padding: '15px',
                    borderRadius: '5px',
                    color: 'red'
                    }}>Game Over!</div>}
                {/* visar Game Win om spelaren vunnit */}
                {gameWon && <div style={{
                    position: 'absolute',
                    backgroundColor: 'white',
                    padding: '15px',
                    borderRadius: '5px',
                    color: 'green'
                    }}>You Win!</div>}

                {/* CSS för spelbrädet */}
                <div style = {{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: '2px',
                    width: '160px',
                    marginTop: '60px'
                    }}>
                    {/*
                        går över varje cell, och tilldelar ett key-attrubit för att göra varje cell unik,
                        cellens data, och onCLick-event som skickar index till clickHandler när cellen klickas
                    */}
                    {board.map((cell, i) => (
                        <Cell
                            key={i}
                            cell={cell}
                            onClick={() => this.clickHandler(i)}
                        ></Cell>
                    ))}
                </div>
            </div>
        );
    }
}

export default BoardComponent;