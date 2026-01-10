import React, { useState, useEffect } from 'react';
import initialData from './initialData';
import Breadcrumb from './Breadcrumb';
import Node from './Node';
import { toggleNode, deleteNode } from './logic';

function App() {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('fractal-navigator-data');
    return savedData ? JSON.parse(savedData) : initialData;
  });

  const [currentNodeId, setCurrentNodeId] = useState('root');
  const [breadcrumb, setBreadcrumb] = useState([]);

  useEffect(() => {
    localStorage.setItem('fractal-navigator-data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const buildBreadcrumb = (node, nodeId, path = []) => {
      if (node.id === nodeId) {
        return [...path, node];
      }
      for (const subTask of node.subTasks) {
        const newPath = buildBreadcrumb(subTask, nodeId, [...path, node]);
        if (newPath.length > path.length + 1) {
          return newPath;
        }
      }
      return path;
    };

    const newBreadcrumb = buildBreadcrumb(data, currentNodeId);
    setBreadcrumb(newBreadcrumb);
  }, [currentNodeId, data]);

  const handleZoomIn = (nodeId) => {
    setCurrentNodeId(nodeId);
  };

  const handleZoomOut = () => {
    if (breadcrumb.length > 1) {
      setCurrentNodeId(breadcrumb[breadcrumb.length - 2].id);
    }
  };

  const addSubTask = (title) => {
    const newNode = {
      id: Date.now().toString(),
      title,
      subTasks: [],
    };

    const findAndAdd = (node, parentId) => {
      if (node.id === parentId) {
        return {
          ...node,
          subTasks: [...node.subTasks, newNode],
        };
      }
      return {
        ...node,
        subTasks: node.subTasks.map(subTask => findAndAdd(subTask, parentId)),
      };
    };

    setData(findAndAdd(data, currentNodeId));
  };

  const handleMagic = (targetNodeId) => {
    const newSubTasks = [
      { id: Date.now().toString() + '-1', title: 'Magic Subtask 1', subTasks: [] },
      { id: Date.now().toString() + '-2', title: 'Magic Subtask 2', subTasks: [] },
      { id: Date.now().toString() + '-3', title: 'Magic Subtask 3', subTasks: [] },
    ];

    const findAndAddMagic = (node, targetId) => {
      if (node.id === targetId) {
        return {
          ...node,
          subTasks: [...node.subTasks, ...newSubTasks],
        };
      }
      return {
        ...node,
        subTasks: node.subTasks.map(subTask => findAndAddMagic(subTask, targetId)),
      };
    };

    setData(findAndAddMagic(data, targetNodeId));
  };

  const handleToggleComplete = (targetId) => {
    setData(prevData => toggleNode(prevData, targetId));
  };

  const handleDelete = (targetId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
        setData(prevData => deleteNode(prevData, targetId));
    }
  };

  const currentNode = breadcrumb[breadcrumb.length -1];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        <Breadcrumb path={breadcrumb} onNavigate={handleZoomIn} />
        {currentNode && (
            <Node
            node={currentNode}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onAddSubTask={addSubTask}
            onMagic={handleMagic}
            onToggle={handleToggleComplete}
            onDelete={handleDelete}
            />
        )}
      </div>
    </div>
  );
}

export default App;
