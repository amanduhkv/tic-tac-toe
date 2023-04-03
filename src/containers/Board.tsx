import { validateHeaderValue } from "http";
import { useEffect, useState } from "react";
import Square from "../components/Square";

type Player = 'X' | 'O' | 'Tie' | null

function calcWinner(squares: Player[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a ,b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currPlayer, setCurrPlayer] = useState<'X' | 'O'>(
    Math.round(Math.random() * 1) === 1 ? 'X' : 'O'
  );
  const [winner, setWinner] = useState<Player>(null);

  function reset() {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrPlayer(Math.round(Math.random() * 1) === 1 ? 'X' : 'O');
  }

  function setSquareValue (index: number) {
    const newData = squares.map((val, i) => {
      if(i === index) return currPlayer;
      return val;
    });
    setSquares(newData);
    setCurrPlayer(currPlayer === 'X' ? 'O' : 'X');
  }

  useEffect(() => {
    const w = calcWinner(squares)

    if(w) setWinner(w);

    if(!w && !squares.filter((square) => !square).length) setWinner('Tie');
  })

  return (
    <div>
      <p>
        {!winner ? `Current Player: ${currPlayer}` : ''}
      </p>
      <p>
        {winner === 'Tie' ? "It's a TIE!" : `Winner: ${winner}`}
      </p>
      <button className="reset" onClick={reset}>Reset</button>
      <div className="grid">
        {Array(9).fill(null).map((_, i) => {
          return <Square
            key={i}
            winner={winner}
            onClick={() => setSquareValue(i)}
            value={squares[i]}
          />
        })}
      </div>
    </div>
  )
}

export default Board;
