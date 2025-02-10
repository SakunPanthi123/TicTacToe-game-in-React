import { useState } from "react";
import "./index.css";

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(board);

  function handleClick(i) {
    if (board[i] || winner) return;
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXisNext(!xIsNext);
  }

  function renderSquare(i) {
    return (
      <div
        onClick={() => handleClick(i)}
        className="bg-pink-200 border border-pink-400 p-4 text-3xl text-center cursor-pointer select-none rounded hover:bg-pink-300 transition w-full h-24 aspect-square flex items-center justify-center"
      >
        {board[i]}
      </div>
    );
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXisNext(true);
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (!board.includes(null)) {
    status = "Draw!";
  } else {
    status = `Next Player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 relative">
      <div className="max-w-md mx-auto p-6 bg-pink-50 rounded-lg shadow-lg border border-pink-200">
        <h1 className="text-4xl font-bold text-center text-pink-700 mb-4">
          Tic Tac Toe
        </h1>
        <p className="text-xl text-center text-pink-600 mb-4">{status}</p>
        <div className="grid grid-cols-3 gap-4">
          {board.map((_, i) => renderSquare(i))}
        </div>
        <button
          onClick={resetGame}
          className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded shadow transition"
        >
          Reset Game
        </button>
      </div>
      {winner && <CelebrationOverlay />}
    </div>
  );
}

function calculateWinner(squares) {
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
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function CelebrationOverlay() {
  // Render multiple balloon and confetti emoji with inline animations.
  const balloons = Array.from({ length: 10 }).map((_, i) => {
    // Randomize left position and animation delay
    const left = Math.floor(Math.random() * 90) + 5;
    const delay = Math.random() * 1;
    return (
      <span
        key={`balloon-${i}`}
        className="absolute text-4xl animate-[moveUp_3s_ease-in-out_infinite]"
        style={{ left: `${left}%`, animationDelay: `${delay}s` }}
      >
        🎈
      </span>
    );
  });

  const confetti = Array.from({ length: 20 }).map((_, i) => {
    const left = Math.floor(Math.random() * 90) + 5;
    const delay = Math.random() * 1;
    return (
      <span
        key={`confetti-${i}`}
        className="absolute text-3xl animate-[fall_2s_ease-in-out_infinite]"
        style={{ left: `${left}%`, animationDelay: `${delay}s` }}
      >
        🎊
      </span>
    );
  });

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-pink-100 opacity-30"></div>
      {balloons}
      {confetti}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-6xl animate-pulse">🎉</div>
      </div>
    </div>
  );
}

export default TicTacToe;
