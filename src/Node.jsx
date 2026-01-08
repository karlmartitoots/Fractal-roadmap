import React, { useState } from 'react';

const Node = ({ node, onZoomIn, onZoomOut, onAddSubTask }) => {
  const [newSubTaskTitle, setNewSubTaskTitle] = useState('');

  const handleAddSubTask = () => {
    if (newSubTaskTitle.trim()) {
      onAddSubTask(newSubTaskTitle.trim());
      setNewSubTaskTitle('');
    }
  };

  return (
    <div className="p-4 sm:p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-0">{node.title}</h1>
        <button
          onClick={onZoomOut}
          className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Zoom Out
        </button>
      </div>
      <ul className="mb-6">
        {node.subTasks.map(subTask => (
          <li
            key={subTask.id}
            onClick={() => onZoomIn(subTask.id)}
            className="cursor-pointer text-base sm:text-lg p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
          >
            {subTask.title}
          </li>
        ))}
      </ul>
      <div className="flex flex-col sm:flex-row">
        <input
          type="text"
          value={newSubTaskTitle}
          onChange={(e) => setNewSubTaskTitle(e.target.value)}
          placeholder="Add a new sub-task"
          className="flex-grow p-3 border border-gray-300 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 sm:mb-0"
        />
        <button
          onClick={handleAddSubTask}
          className="px-4 sm:px-6 py-3 font-semibold text-white bg-blue-500 rounded-md sm:rounded-r-md sm:rounded-l-none hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Node;
