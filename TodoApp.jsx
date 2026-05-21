import React, { useState } from 'react';
import TaskForm from './src/components/TaskForm';
import TaskColumn from './src/components/TaskColumn';
import { COLUMNS } from './src/constants';

export default function TodoApp() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design new feature', content: 'New feature specs', column: 'todo', date: null, author: null },
    { id: 2, title: 'Review code', content: 'We need to do X, Y, Z', column: 'doing', date: '2026-05-25', author: 'Mr 🅱️' },
    { id: 3, title: 'Fix bugs', content: '', column: 'done', date: null, author: null },
  ]);

  const [draggedTask, setDraggedTask] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editAuthor, setEditAuthor] = useState('');

  const addTask = ({ title, content, date, author }) => {
    const newTask = {
      id: Date.now(),
      title,
      content,
      column: 'todo',
      date,
      author,
    };
    setTasks([...tasks, newTask]);
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditContent(task.content || '');
    setEditDate(task.date || '');
    setEditAuthor(task.author || '');
  };

  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, title: editTitle, content: editContent, date: editDate || null, author: editAuthor || null }
          : task,
      ),
    );
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (columnId) => (e) => {
    e.preventDefault();
    if (draggedTask) {
      setTasks(tasks.map((task) => (task.id === draggedTask.id ? { ...task, column: columnId } : task)));
      setDraggedTask(null);
    }
  };

  const getColorClass = (column) => {
    switch (column) {
      case 'todo':
        return 'bg-blue-100 border-blue-300';
      case 'doing':
        return 'bg-orange-100 border-orange-300';
      case 'done':
        return 'bg-green-100 border-green-300';
      default:
        return 'bg-blue-100 border-blue-300';
    }
  };

  const getColumnTasks = (column) => tasks.filter((task) => task.column === column);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-light text-slate-800 mb-2">My Tasks</h1>
          <p className="text-slate-500 font-light">Drag and drop to organize your work</p>
        </div>

        {/* Add Task Form */}
        <TaskForm onAddTask={addTask} />

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLUMNS.map((column) => (
            <TaskColumn
              key={column.id}
              column={column}
              tasks={tasks}
              draggedTaskId={draggedTask?.id}
              editingId={editingId}
              editTitle={editTitle}
              editContent={editContent}
              editDate={editDate}
              editAuthor={editAuthor}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragStart={handleDragStart}
              onEdit={startEdit}
              onTitleChange={setEditTitle}
              onContentChange={setEditContent}
              onDateChange={setEditDate}
              onAuthorChange={setEditAuthor}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onDelete={deleteTask}
              getColorClass={getColorClass}
              getColumnTasks={getColumnTasks}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
