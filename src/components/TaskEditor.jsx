import React from 'react';
import { TEAM_MEMBERS } from '../constants';

export default function TaskEditor({
  editTitle,
  editContent,
  editDate,
  editAuthor,
  onTitleChange,
  onContentChange,
  onDateChange,
  onAuthorChange,
  onSave,
  onCancel,
}) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        value={editTitle}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-800 font-light text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
      />
      <textarea
        value={editContent}
        onChange={(e) => onContentChange(e.target.value)}
        className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-800 font-light text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 resize-none"
        rows="2"
        placeholder="Task description (optional)"
      />
      <input
        type="date"
        value={editDate}
        onChange={(e) => onDateChange(e.target.value)}
        className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-800 font-light text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
      />
      <select
        value={editAuthor}
        onChange={(e) => onAuthorChange(e.target.value)}
        className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-800 font-light text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
      >
        <option value="">No author</option>
        {TEAM_MEMBERS.map((member) => (
          <option key={member} value={member}>
            {member}
          </option>
        ))}
      </select>
      <div className="flex gap-2">
        <button
          onClick={onSave}
          className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors font-light"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="flex-1 px-3 py-2 bg-slate-400 text-white text-sm rounded-md hover:bg-slate-500 transition-colors font-light"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
