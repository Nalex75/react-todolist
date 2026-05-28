import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <nav className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-light text-slate-800 hover:text-slate-600 transition-colors">
            Task Manager
          </Link>
          <div className="flex gap-6">
            <Link
              to="/"
              className="text-slate-600 hover:text-slate-800 transition-colors font-light"
            >
              Home
            </Link>
            <Link
              to="/tasks"
              className="text-slate-600 hover:text-slate-800 transition-colors font-light"
            >
              My Tasks
            </Link>
            <Link
              to="/tic-tac-toe"
              className="text-slate-600 hover:text-slate-800 transition-colors font-light"
            >
              Tic-Tac-Toe
            </Link>
            <Link
              to="/minesweeper"
              className="text-slate-600 hover:text-slate-800 transition-colors font-light"
            >
              Minesweeper
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
