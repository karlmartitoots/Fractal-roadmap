import React, { useState } from 'react';
import { motion } from 'framer-motion';

const listVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  },
};

const Node = ({ node, onZoomIn, onZoomOut, onAddSubTask, onMagic, onToggle, onDelete }) => {
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
        <div className="flex items-center mb-4 sm:mb-0">
          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mr-4 ${node.completed ? 'line-through opacity-50' : ''}`}>{node.title}</h1>
          <button
            onClick={() => onMagic(node.id)}
            className="text-xl p-2 rounded-full hover:bg-yellow-100 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
            title="Auto-generate subtasks"
            aria-label="Auto-generate subtasks"
          >
            ✨
          </button>
        </div>
        <button
          onClick={onZoomOut}
          className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Zoom Out
        </button>
      </div>
      <motion.ul
        className="mb-6"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {node.subTasks.map(subTask => (
          <motion.li
            key={subTask.id}
            variants={itemVariants}
            onClick={() => onZoomIn(subTask.id)}
            className="cursor-pointer text-base sm:text-lg p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150 flex justify-between items-center group"
          >
            <div className="flex items-center flex-grow">
               <input
                type="checkbox"
                checked={subTask.completed || false}
                onChange={() => {
                    onToggle(subTask.id);
                }}
                onClick={(e) => e.stopPropagation()}
                className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              />
              <span className={`flex-grow ${subTask.completed ? 'line-through opacity-50' : ''}`}>{subTask.title}</span>
            </div>
            <div className="flex items-center">
                <button
                onClick={(e) => {
                    e.stopPropagation();
                    onMagic(subTask.id);
                }}
                className="text-lg p-2 rounded-full hover:bg-yellow-100 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 mr-2"
                title="Auto-generate subtasks"
                aria-label="Auto-generate subtasks"
                >
                ✨
                </button>
                 <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(subTask.id);
                }}
                className="text-lg p-2 rounded-full hover:bg-red-100 text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 opacity-0 group-hover:opacity-100"
                title="Delete task"
                aria-label="Delete task"
                >
                ✕
                </button>
            </div>
          </motion.li>
        ))}
      </motion.ul>
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
