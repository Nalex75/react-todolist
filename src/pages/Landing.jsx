import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl font-light text-slate-800 mb-6">
            Organize Your Work
          </h1>
          <p className="text-xl text-slate-600 font-light mb-4">
            A simple, intuitive task manager that helps you stay on top of your work. Drag, drop, and organize your tasks with ease.
          </p>
          <p className="text-lg text-slate-500 font-light mb-12">
            Assign tasks to team members, set deadlines, and track progress all in one place.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-light text-slate-800 mb-2">Drag & Drop</h3>
              <p className="text-slate-600 font-light text-sm">
                Easily move tasks between columns to organize your workflow.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-lg font-light text-slate-800 mb-2">Assign Tasks</h3>
              <p className="text-slate-600 font-light text-sm">
                Assign tasks to team members and track who's responsible.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">📅</div>
              <h3 className="text-lg font-light text-slate-800 mb-2">Set Deadlines</h3>
              <p className="text-slate-600 font-light text-sm">
                Add dates to tasks so you never miss a deadline.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            to="/tasks"
            className="inline-block px-8 py-4 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-light text-lg"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
