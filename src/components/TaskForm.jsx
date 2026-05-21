import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../constants';

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask({
        title: title.trim(),
        content: content.trim(),
        date: date || null,
        author: author || null,
      });
      setTitle('');
      setContent('');
      setDate('');
      setAuthor('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="max-w-2xl">
        {/* Title */}
        <div className="mb-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title (required)..."
            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent font-light"
            required
          />
        </div>

        {/* Content */}
        <div className="mb-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Task description (optional)..."
            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent font-light resize-none"
            rows="2"
          />
        </div>

        {/* Date and Author Row */}
        <div className="flex gap-3 mb-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent font-light"
          />
          <select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent font-light"
          >
            <option value="">No author</option>
            {TEAM_MEMBERS.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-light"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
