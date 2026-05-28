import { useState, useCallback, useEffect } from 'react';
import MinesweeperCell from '../components/MinesweeperCell';

const DIFFICULTIES = {
  superEasy: { rows: 4, cols: 4, mines: 2, label: 'Super Easy' },
  easy: { rows: 9, cols: 9, mines: 10, label: 'Easy' },
  medium: { rows: 16, cols: 16, mines: 40, label: 'Medium' },
  hard: { rows: 16, cols: 30, mines: 99, label: 'Hard' },
};

function createBoard(rows, cols) {
  return new Array(rows).fill(null).map(() =>
    new Array(cols).fill(null).map(() => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborCount: 0,
    }))
  );
}

function placeMines(board, rows, cols, mineCount, firstRow, firstCol) {
  const next = board.map(row => row.map(cell => ({ ...cell })));
  let placed = 0;
  while (placed < mineCount) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!next[r][c].isMine && !(Math.abs(r - firstRow) <= 1 && Math.abs(c - firstCol) <= 1)) {
      next[r][c].isMine = true;
      placed++;
    }
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (next[r][c].isMine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && next[nr][nc].isMine) count++;
        }
      }
      next[r][c].neighborCount = count;
    }
  }
  return next;
}

function revealFrom(board, rows, cols, startR, startC) {
  const next = board.map(row => row.map(cell => ({ ...cell })));
  const stack = [[startR, startC]];
  while (stack.length > 0) {
    const [r, c] = stack.pop();
    if (r < 0 || r >= rows || c < 0 || c >= cols) continue;
    if (next[r][c].isRevealed || next[r][c].isFlagged) continue;
    next[r][c].isRevealed = true;
    if (next[r][c].neighborCount === 0 && !next[r][c].isMine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          stack.push([r + dr, c + dc]);
        }
      }
    }
  }
  return next;
}

function checkWin(board) {
  return board.every(row => row.every(cell => cell.isMine || cell.isRevealed));
}

function revealAllMines(board) {
  return board.map(row => row.map(cell => cell.isMine ? { ...cell, isRevealed: true } : cell));
}

export default function Minesweeper() {
  const [difficulty, setDifficulty] = useState('easy');
  const [board, setBoard] = useState(() => createBoard(9, 9));
  const [status, setStatus] = useState('idle'); // idle | playing | won | lost
  const [flagCount, setFlagCount] = useState(0);
  const [time, setTime] = useState(0);

  const { rows, cols, mines } = DIFFICULTIES[difficulty];

  useEffect(() => {
    if (status !== 'playing') return;
    const id = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [status]);

  const startNew = useCallback((diff = difficulty) => {
    const { rows: r, cols: c } = DIFFICULTIES[diff];
    setBoard(createBoard(r, c));
    setStatus('idle');
    setFlagCount(0);
    setTime(0);
  }, [difficulty]);

  const handleDifficultyChange = (diff) => {
    setDifficulty(diff);
    startNew(diff);
  };

  const handleClick = (r, c) => {
    if (status === 'won' || status === 'lost') return;
    if (board[r][c].isRevealed || board[r][c].isFlagged) return;

    let current = board;
    if (status === 'idle') {
      current = placeMines(board, rows, cols, mines, r, c);
      setStatus('playing');
    }

    if (current[r][c].isMine) {
      const revealed = revealAllMines(current);
      setBoard(revealed);
      setStatus('lost');
      return;
    }

    const next = revealFrom(current, rows, cols, r, c);
    if (checkWin(next)) {
      setBoard(next);
      setStatus('won');
    } else {
      setBoard(next);
    }
  };

  const handleRightClick = (e, r, c) => {
    e.preventDefault();
    if (status === 'won' || status === 'lost') return;
    if (board[r][c].isRevealed) return;
    const next = board.map(row => row.map(cell => ({ ...cell })));
    const wasFlagged = next[r][c].isFlagged;
    next[r][c].isFlagged = !wasFlagged;
    setBoard(next);
    setFlagCount(f => wasFlagged ? f - 1 : f + 1);
  };

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const statusMessage = status === 'won' ? 'You won! 🎉' : status === 'lost' ? 'Game over 💥' : null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-light text-slate-800 mb-6">Minesweeper</h1>

      <div className="flex gap-2 mb-6">
        {Object.entries(DIFFICULTIES).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => handleDifficultyChange(key)}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              difficulty === key
                ? 'bg-slate-800 text-white'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex justify-between items-center mb-4 px-1">
          <div className="flex items-center gap-1 text-slate-700 text-sm font-medium w-20">
            <span>🚩</span>
            <span>{mines - flagCount}</span>
          </div>

          <button
            onClick={() => startNew()}
            className="text-xl hover:scale-110 transition-transform select-none"
            title="New game"
          >
            {status === 'won' ? '😎' : status === 'lost' ? '😵' : '🙂'}
          </button>

          <div className="flex items-center gap-1 text-slate-700 text-sm font-medium w-20 justify-end">
            <span>⏱</span>
            <span>{formatTime(time)}</span>
          </div>
        </div>

        {statusMessage && (
          <div className={`text-center text-sm font-medium mb-3 py-1 rounded ${
            status === 'won' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {statusMessage}
          </div>
        )}

        <div
          className="border-2 border-slate-300 rounded select-none"
          style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1.75rem)` }}
        >
          {board.map((row, r) =>
            row.map((cell, c) => (
              <MinesweeperCell
                key={`${r}-${c}`}
                cell={cell}
                onClick={() => handleClick(r, c)}
                onRightClick={(e) => handleRightClick(e, r, c)}
              />
            ))
          )}
        </div>
      </div>
      <br />
      {status == 'lost' && (
        <button onClick={() => startNew()} className="text-red-700 text-sm font-medium w-20" title="New game">
          Try again ?
        </button>
      )}

      <p className="mt-4 text-xs text-slate-400">Left click to reveal · Right click to flag</p>
    </div>
  );
}
