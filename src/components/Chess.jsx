import { useEffect, useState } from "react";
import "./Chess.css";
import Square from "./Square";
import Board from "./Board";
import solvePuzzle from "./Algorithm";

const Chess = () => {
  const [board, setBoard] = useState([]);
  const [boardSize, setBoardSize] = useState(8);
  const [animation_speed, setAnimationSpeed] = useState(50);
  const [solutions, setSolutions] = useState(null); // {results, animations}

  function resetBoard() {
    const squares = new Array(boardSize);
    for (let i = 0; i < boardSize; i++) {
      let row = new Array(boardSize);
      for (let j = 0; j < boardSize; j++) row[j] = new Square(i, j);
      squares[i] = row;
    }
    setBoard(squares);
    setSolutions(null); // erase previous solution each time resetBoard is called
  }

  useEffect(resetBoard, [boardSize]);

  function getRandomIndex(max) {
    return Math.floor(Math.random() * (max + 1));
  }

  function toggleDisabled(disabledValue) {
    let btnsAndInputs = document.querySelectorAll(".toggle-disabled"); // get all btns and input fields in input bar
    for (let i = 0; i < btnsAndInputs.length; i++)
      btnsAndInputs[i].disabled = disabledValue;
  }

  function solveNQueen() {
    let results = [];
    if (!solutions) {
      // no solutions
      const resultsAndAnimations = solvePuzzle(board);
      setSolutions(resultsAndAnimations);

      results = resultsAndAnimations["results"];
    } else {
      // if solution is already fetched
      results = solutions["results"];
    }
    let finalBoard;
    while (
      (finalBoard = results[getRandomIndex(results.length - 1)]) === board
    ); // generate different result every time
    setBoard(finalBoard);
  }

  function visualize() {
    let animations = [];
    if (!solutions) {
      // no solutions
      const resultsAndAnimations = solvePuzzle(board);
      setSolutions(resultsAndAnimations);

      animations = resultsAndAnimations["animations"];
    } else {
      // if solution is already fetched
      animations = solutions["animations"];
    }
    toggleDisabled(true); // disable all btns and input fields while animation is running
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        setBoard(animations[i]);
      }, i * animation_speed);
    }
    // enable all btns and input fields after animation is over
    setTimeout(() => {
      toggleDisabled(false);
    }, animations.length * animation_speed);
  }

  return (
    <div className="theme">
      <div className="text-center display-6">N-Queens</div>
      <div className="mt-sm-3">
        <Board board={board} />
      </div>
      <div className="d-sm-flex mt-5 p-5 justify-content-around align-items-center text-center input-bar">
        {/* Reset board */}
        <button
          className="btn btn-dark mx-auto toggle-disabled"
          onClick={resetBoard}
        >
          Clear
        </button>

        {/* Animation Delay input */}
        <div className="form-control m-auto" style={{ maxWidth: 250 }}>
          <label htmlFor="customRange1" className="form-label">
            <span className="text-secondary">Animation Delay: </span>
            <span className="font-weight-bold text-success">
              {`${animation_speed} ms`}
            </span>
          </label>
          <input
            type="range"
            className="form-range toggle-disabled form-range-track-bg-warning"
            min="1"
            max="1000"
            step="1"
            id="customRange1"
            value={animation_speed}
            onChange={(e) => setAnimationSpeed(e.target.value)}
          />
        </div>

        {/* Board size input */}
        <div className="form-control m-auto" style={{ maxWidth: 250 }}>
          <label htmlFor="customRange2" className="form-label">
            <span className="text-secondary">Size of Board: </span>
            <span className="font-weight-bold text-success">
              {`${boardSize} x ${boardSize}`}
            </span>
          </label>
          <input
            type="range"
            className="form-range toggle-disabled form-range-track-bg-warning"
            min="4"
            max="12"
            step="1"
            id="customRange2"
            value={boardSize}
            onChange={(e) => setBoardSize(e.target.value)}
          />
        </div>

        <button
          className="btn btn-secondary mx-2 mx-sm-auto toggle-disabled"
          onClick={solveNQueen}
        >
          Solve
        </button>

        <button
          className="btn btn-dark mx-2 mx-sm-auto toggle-disabled"
          onClick={visualize}
        >
          Visualize
        </button>
      </div>
      <div className="possible-solutions text-center mt-sm-2">
        {solutions && (
          <span className="h4">
            Possible solutions: {solutions["results"].length}
          </span>
        )}
      </div>
    </div>
  );
};

export default Chess;
