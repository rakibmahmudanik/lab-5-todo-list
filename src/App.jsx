import React, { useState, useEffect } from 'react';

function App() {
  // Use React's useState hook to manage tasks
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('lab5_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved tasks', e);
      }
    }
    return [
      { id: 1, text: 'Learn React fundamentals and hooks', completed: true },
      { id: 2, text: 'Configure Tailwind CSS with Vite', completed: true },
      { id: 3, text: 'Build interactive Todo List UI', completed: false },
      { id: 4, text: 'Test application in the browser', completed: false },
    ];
  });

  const [inputVal, setInputVal] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  // Persist tasks in localStorage
  useEffect(() => {
    localStorage.setItem('lab5_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to add new tasks to the list
  const handleAddTask = (e) => {
    e.preventDefault();
    const trimmed = inputVal.trim();
    if (!trimmed) return;

    const newTask = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
    setInputVal('');
  };

  // Function to mark tasks as completed or incomplete
  const handleToggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to delete tasks from the list
  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Function to clear all completed tasks
  const handleClearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  // Filter tasks based on active tab
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // Calculate the number of remaining tasks
  const remainingCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-blue-50 py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-xl">
        {/* Header Section */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600 text-white rounded-2xl shadow-lg mb-4">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight sm:text-4xl">
            Todo List Application
          </h1>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            Lab 5 &bull; Built with React.js, Vite &amp; Tailwind CSS
          </p>
        </header>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden backdrop-blur-sm">
          {/* Add Task Form */}
          <div className="p-6 bg-slate-50/50 border-b border-slate-100">
            <form onSubmit={handleAddTask} className="flex gap-3">
              <input
                type="text"
                placeholder="What needs to be done?"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 shadow-sm"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Add</span>
              </button>
            </form>
          </div>

          {/* Filter Bar & Counters */}
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            {/* Display number of remaining tasks */}
            <div className="font-semibold text-slate-600 flex items-center gap-2">
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-bold">
                {remainingCount}
              </span>
              <span>{remainingCount === 1 ? 'task remaining' : 'tasks remaining'}</span>
            </div>

            {/* Filter buttons */}
            <div className="inline-flex p-1 bg-slate-200/70 rounded-lg">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-white text-indigo-700 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({tasks.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('active')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  filter === 'active'
                    ? 'bg-white text-indigo-700 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Active ({remainingCount})
              </button>
              <button
                type="button"
                onClick={() => setFilter('completed')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  filter === 'completed'
                    ? 'bg-white text-indigo-700 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Completed ({completedCount})
              </button>
            </div>
          </div>

          {/* Task List: Dynamically displayed using map() */}
          <ul className="divide-y divide-slate-100 max-h-[460px] overflow-y-auto">
            {filteredTasks.length === 0 ? (
              <li className="py-12 px-6 text-center text-slate-400">
                <svg
                  className="w-12 h-12 mx-auto mb-3 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="font-medium text-slate-500">No tasks found</p>
                <p className="text-xs text-slate-400 mt-1">
                  {filter === 'completed'
                    ? 'No completed tasks yet. Finish a task!'
                    : filter === 'active'
                    ? 'All tasks are completed! Good job!'
                    : 'Your task list is empty. Add a task above.'}
                </p>
              </li>
            ) : (
              filteredTasks.map((task) => (
                <li
                  key={task.id}
                  className={`group px-6 py-4 flex items-center justify-between transition-colors duration-150 hover:bg-slate-50/80 ${
                    task.completed ? 'bg-slate-50/40' : ''
                  }`}
                >
                  {/* Mark task as completed or incomplete */}
                  <label className="flex items-center gap-3 cursor-pointer flex-1 mr-4 select-none">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id)}
                      className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition"
                    />
                    <span
                      className={`text-sm md:text-base break-all transition-all duration-200 ${
                        task.completed
                          ? 'line-through text-slate-400 italic'
                          : 'text-slate-700 font-medium'
                      }`}
                    >
                      {task.text}
                    </span>
                  </label>

                  {/* Delete task button */}
                  <button
                    type="button"
                    onClick={() => handleDeleteTask(task.id)}
                    title="Delete task"
                    className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors duration-150"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </li>
              ))
            )}
          </ul>

          {/* Footer Controls */}
          {tasks.length > 0 && (
            <div className="px-6 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>
                Total: <strong className="text-slate-700">{tasks.length}</strong> tasks
              </span>
              {completedCount > 0 && (
                <button
                  type="button"
                  onClick={handleClearCompleted}
                  className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition cursor-pointer"
                >
                  Clear completed ({completedCount})
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <footer className="mt-8 text-center text-xs text-slate-400">
          <p>Built for React.js Lab 5 &bull; State management with React Hooks</p>
        </footer>
      </div>
    </main>
  );
}

export default App;

