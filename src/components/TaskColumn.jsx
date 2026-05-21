import React from 'react';
import TaskCard from './TaskCard';

export default function TaskColumn({
  column,
  tasks,
  draggedTaskId,
  editingId,
  editTitle,
  editContent,
  editDate,
  editAuthor,
  onDragOver,
  onDrop,
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
  getColumnTasks,
}) {
  const columnTasks = getColumnTasks(column.id);

  return (
    <section
      className={`${column.color} rounded-xl p-6 min-h-96 transition-colors`}
      aria-labelledby={`column-${column.id}`}
      onDragOver={onDragOver}
      onDrop={onDrop(column.id)}
    >
      <h2
        id={`column-${column.id}`}
        className="text-lg font-light text-slate-700 mb-4 pb-4 border-b border-slate-200"
      >
        {column.title}
      </h2>

      <div className="space-y-3">
        {columnTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            isEditing={editingId === task.id}
            editTitle={editTitle}
            editContent={editContent}
            editDate={editDate}
            editAuthor={editAuthor}
            isDragging={draggedTaskId === task.id}
            onDragStart={() => onDragStart(task)}
            onEdit={() => onEdit(task)}
            onTitleChange={onTitleChange}
            onContentChange={onContentChange}
            onDateChange={onDateChange}
            onAuthorChange={onAuthorChange}
            onSave={() => onSave(task.id)}
            onCancel={onCancel}
            onDelete={() => onDelete(task.id)}
            getColorClass={getColorClass}
          />
        ))}

        {columnTasks.length === 0 && (
          <p className="text-slate-400 text-center py-8 font-light text-sm">
            Drop tasks here
          </p>
        )}
      </div>
    </section>
  );
}
