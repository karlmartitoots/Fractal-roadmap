import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import initialData from './initialData';
import Breadcrumb from './Breadcrumb';
import Node from './Node';
import { toggleNode, deleteNode } from './logic';

const variants = {
  enter: (direction) => ({
    scale: direction === 'in' ? 0.9 : 1.1,
    opacity: 0,
  }),
  center: {
    scale: 1,
    opacity: 1,
  },
  exit: (direction) => ({
    scale: direction === 'in' ? 1.1 : 0.9,
    opacity: 0,
  }),
};

function App() {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('fractal-navigator-data');
    return savedData ? JSON.parse(savedData) : initialData;
  });

  const [currentNodeId, setCurrentNodeId] = useState('root');
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [direction, setDirection] = useState('in');

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
    setDirection('in');
    setCurrentNodeId(nodeId);
  };

  const handleZoomOut = () => {
    if (breadcrumb.length > 1) {
      setDirection('out');
      setCurrentNodeId(breadcrumb[breadcrumb.length - 2].id);
    }
  };

  const handleBreadcrumbNavigate = (nodeId) => {
    if (nodeId !== currentNodeId) {
       // Breadcrumb navigation is effectively zooming out (or staying at root)
       setDirection('out');
       setCurrentNodeId(nodeId);
    }
  }

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
    if (targetNodeId !== currentNodeId) {
        setDirection('in');
        setCurrentNodeId(targetNodeId);
    }
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
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 overflow-hidden">
      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        <Breadcrumb path={breadcrumb} onNavigate={handleBreadcrumbNavigate} />
        <AnimatePresence mode="wait" custom={direction}>
            {currentNode && (
                <motion.div
                    key={currentNode.id}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-full"
                >
                    <Node
                    node={currentNode}
                    onZoomIn={handleZoomIn}
                    onZoomOut={handleZoomOut}
                    onAddSubTask={addSubTask}
                    onMagic={handleMagic}
                    onToggle={handleToggleComplete}
                    onDelete={handleDelete}
                    />
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
