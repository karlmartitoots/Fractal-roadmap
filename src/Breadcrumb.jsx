import React from 'react';

const Breadcrumb = ({ path, onNavigate }) => {
  return (
    <nav className="mb-4 text-sm sm:text-base md:text-lg">
      <div className="flex flex-wrap items-center">
        {path.map((node, index) => (
          <span key={node.id} className="inline-flex items-center">
            <button
              onClick={() => onNavigate(node.id)}
              className="text-blue-500 hover:underline"
            >
              {node.title}
            </button>
            {index < path.length - 1 && <span className="mx-2">/</span>}
          </span>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumb;
