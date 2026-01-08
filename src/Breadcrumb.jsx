import React from 'react';

const Breadcrumb = ({ path, onNavigate }) => {
  return (
    <nav className="mb-4 text-lg">
      {path.map((node, index) => (
        <span key={node.id}>
          <button
            onClick={() => onNavigate(node.id)}
            className="text-blue-500 hover:underline"
          >
            {node.title}
          </button>
          {index < path.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
