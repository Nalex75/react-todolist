import React, { useState } from 'react';

export default function TodoApp() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design new feature', column: 'todo' },
    { id: 2, title: 'Review code', column: 'doing' },
    { id: 3, title: 'Fix bugs', column: 'done' },
  ]);

  const [input, setInput] = useState('');
  const [draggedTask, setDraggedTask] = useState(null);

  const addTask = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newTask = {
        id: Date.now(),
        title: input,
        column: 'todo',
      };
      setTasks([...tasks, newTask]);
      setInput('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (column) => {
    if (draggedTask) {
      setTasks(
        tasks.map(task =>
          task.id === draggedTask.id ? { ...task, column } : task
        )
      );
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

  const getColumnTasks = (column) => tasks.filter(task => task.column === column);

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-blue-50' },
    { id: 'doing', title: 'Doing', color: 'bg-orange-50' },
    { id: 'done', title: 'Done', color: 'bg-green-50' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-light text-slate-800 mb-2">My Tasks</h1>
          <p className="text-slate-500 font-light">Drag and drop to organize your work</p>
        </div>

        {/* Add Task Form */}
        <form onSubmit={addTask} className="mb-8">
          <div className="flex gap-2 max-w-md">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent font-light"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-light"
            >
              Add
            </button>
          </div>
        </form>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(column => (
            <div
              key={column.id}
              className={`${column.color} rounded-xl p-6 min-h-96 transition-colors`}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
            >
              <h2 className="text-lg font-light text-slate-700 mb-4 pb-4 border-b border-slate-200">
                {column.title}
              </h2>

              <div className="space-y-3">
                {getColumnTasks(column.id).map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task)}
                    className={`${getColorClass(task.column)} p-4 rounded-lg border-2 cursor-move hover:shadow-md transition-shadow select-none group`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <p className="text-slate-800 font-light flex-1">{task.title}</p>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}

                {getColumnTasks(column.id).length === 0 && (
                  <p className="text-slate-400 text-center py-8 font-light text-sm">
                    Drop tasks here
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}