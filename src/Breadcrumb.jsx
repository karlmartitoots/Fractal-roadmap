import React from 'react';

const Breadcrumb = ({ path, onNavigate }) => {
  return (
    <nav className="mb-4 text-sm sm:text-base md:text-lg">
      <div className="flex flex-wrap items-center">
        {path.map((node, index) => {
          const total = node.subTasks ? node.subTasks.length : 0;
          const completed = node.subTasks ? node.subTasks.filter(t => t.completed).length : 0;
          const isComplete = total > 0 && total === completed;

          return (
            <span key={node.id} className="inline-flex items-center">
              <button
                onClick={() => onNavigate(node.id)}
                className={`hover:underline ${isComplete ? 'text-green-600 font-medium' : 'text-blue-500'}`}
              >
                {node.title}
                {total > 0 && <span className="ml-1 text-xs opacity-80">({completed}/{total})</span>}
              </button>
              {index < path.length - 1 && <span className="mx-2 text-gray-400">/</span>}
            </span>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumb;
