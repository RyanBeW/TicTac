import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./assets/WINING_COMBINATIONS"
import GameOver from "./components/GameOver"
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

  const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function App() {
  const [gameTurns, setGameTurns] = useState([])
  const activePlayer = deriveActivePlayer(gameTurns)
  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for( const turn of gameTurns) {
    const {square,player} = turn
    const {row, col} = square
    gameBoard[row][col] = player;
  }
  let winner = undefined
  const hasDraw = gameTurns.length === 9 && !winner;
  {console.log(gameTurns)}
  for (const combination of WINNING_COMBINATIONS){
    const firstSquare = gameBoard[combination[0].row][combination[0].column]
    const secondSquare = gameBoard[combination[1].row][combination[1].column]
    const thirdSquare = gameBoard[combination[2].row][combination[2].column]

    if( firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare){
      winner = firstSquare
    }
  }
  
   //const [activePlayer, setActivePlayer] = useState('X')

  function HandlerSelectedSquare(rowIndex, colIndex) {
    
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [
        {
          square: {row: rowIndex, col: colIndex},
          player:currentPlayer}
          ,...prevTurns]
        
        return updatedTurns
    })

  }
  function handleRestart() {
    setGameTurns([])
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player initialName="Player 2" symbol="0" isActive={activePlayer === '0'}/>
        </ol>
        {(hasDraw || winner) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={HandlerSelectedSquare} board={gameBoard}/>

      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
