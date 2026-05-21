import React from 'react';
import TaskEditor from './TaskEditor';

export default function TaskCard({
  task,
  isEditing,
  editTitle,
  editContent,
  editDate,
  editAuthor,
  isDragging,
  onDragStart,
  onEdit,
  onTitleChange,
  onContentChange,
  onDateChange,
  onAuthorChange,
  onSave,
  onCancel,
  onDelete,
  getColorClass,
}) {
  return (
    <article
      draggable={!isEditing}
      onDragStart={onDragStart}
      className={`${getColorClass(task.column)} p-4 rounded-lg border-2 ${isEditing ? 'cursor-default' : 'cursor-move'} hover:shadow-md transition-shadow select-none group ${isDragging ? 'opacity-50' : ''}`}
      aria-label={`Task: ${task.title}`}
    >
      {isEditing ? (
        <TaskEditor
          editTitle={editTitle}
          editContent={editContent}
          editDate={editDate}
          editAuthor={editAuthor}
          onTitleChange={onTitleChange}
          onContentChange={onContentChange}
          onDateChange={onDateChange}
          onAuthorChange={onAuthorChange}
          onSave={onSave}
          onCancel={onCancel}
        />
      ) : (
        <div>
          <div className="flex justify-between items-start gap-2 mb-2">
            <p
              className="text-slate-800 font-light flex-1 cursor-pointer hover:underline"
              onClick={onEdit}
            >
              {task.title}
            </p>
            <button
              onClick={onDelete}
              className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity text-sm"
            >
              ✕
            </button>
          </div>
          {task.content && (
            <p className="text-slate-700 font-light text-sm mb-2">{task.content}</p>
          )}
          {(task.date || task.author) && (
            <div className="space-y-1 text-xs">
              {task.date && (
                <p className="text-slate-600">📅 {new Date(task.date).toLocaleDateString()}</p>
              )}
              {task.author && (
                <p className="text-slate-600">👤 {task.author}</p>
              )}
            </div>
          )}
          <button
            onClick={onEdit}
            className="mt-2 text-xs text-slate-500 hover:text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            edit
          </button>
        </div>
      )}
    </article>
  );
}
