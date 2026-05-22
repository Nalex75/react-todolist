import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-light mb-4">Task Manager</h3>
            <p className="text-slate-400 font-light text-sm">
              Organize your work with drag-and-drop task management.
            </p>
          </div>
          <div>
            <h4 className="text-slate-200 font-light mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400 font-light text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/tasks" className="hover:text-white transition-colors">My Tasks</a></li>
              <li><a href="/tic-tac-toe" className="hover:text-white transition-colors">Tic-Tac-Toe</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-200 font-light mb-4">Features</h4>
            <ul className="space-y-2 text-slate-400 font-light text-sm">
              <li>Drag & Drop Tasks</li>
              <li>Task Assignments</li>
              <li>Date Tracking</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8">
          <p className="text-slate-400 font-light text-sm text-center">
            © {currentYear} Task Manager. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
