const NUMBER_COLORS = ['', 'text-blue-600', 'text-green-600', 'text-red-600', 'text-blue-900', 'text-red-900', 'text-teal-600', 'text-slate-800', 'text-slate-500'];

export default function MinesweeperCell({ cell, onClick, onRightClick }) {
  const { isRevealed, isFlagged, isMine, neighborCount } = cell;

  if (isRevealed && isMine) {
    return (
      <div className="w-7 h-7 flex items-center justify-center bg-red-400 border border-red-500 text-sm">
        💣
      </div>
    );
  }

  if (isRevealed) {
    return (
      <div className={`w-7 h-7 flex items-center justify-center bg-slate-200 border border-slate-300 text-xs font-bold ${NUMBER_COLORS[neighborCount]}`}>
        {neighborCount > 0 ? neighborCount : ''}
      </div>
    );
  }

  return (
    <button
      className="w-7 h-7 flex items-center justify-center bg-slate-400 hover:bg-slate-350 active:bg-slate-200 border border-slate-500 text-sm transition-colors"
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      {isFlagged ? '🚩' : ''}
    </button>
  );
}
