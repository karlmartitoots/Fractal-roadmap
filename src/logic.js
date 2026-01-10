export const toggleNode = (node, targetId) => {
  const setAll = (n, status) => {
    return {
      ...n,
      completed: status,
      subTasks: n.subTasks.map(child => setAll(child, status))
    };
  };

  if (node.id === targetId) {
    // Found the target node, toggle it and all its descendants
    return setAll(node, !node.completed);
  }

  // Recurse into children
  let childrenChanged = false;
  const newSubTasks = node.subTasks.map(child => {
    const newChild = toggleNode(child, targetId);
    if (newChild !== child) {
      childrenChanged = true;
    }
    return newChild;
  });

  if (childrenChanged) {
    // If any child changed, we need to re-evaluate our own completion status
    const hasChildren = newSubTasks.length > 0;
    const allChildrenComplete = hasChildren && newSubTasks.every(c => c.completed);

    // If we have children, our status is determined by them.
    // If we don't (shouldn't happen here if we just recursed, but safety first), keep old state.
    const newCompleted = hasChildren ? allChildrenComplete : node.completed;

    return {
      ...node,
      subTasks: newSubTasks,
      completed: newCompleted
    };
  }

  return node;
};

export const deleteNode = (node, targetId) => {
  // If we are trying to delete the node itself (root case),
  // the caller needs to handle this, but for recursion safety:
  if (node.id === targetId) return null;

  // Check if target is a direct child
  const childIndex = node.subTasks.findIndex(c => c.id === targetId);

  if (childIndex !== -1) {
    // Found it, remove it
    const newSubTasks = [...node.subTasks];
    newSubTasks.splice(childIndex, 1);

    // Recalculate self
    const hasChildren = newSubTasks.length > 0;
    const allChildrenComplete = hasChildren && newSubTasks.every(c => c.completed);
    const newCompleted = hasChildren ? allChildrenComplete : node.completed;

    return {
      ...node,
      subTasks: newSubTasks,
      completed: newCompleted
    };
  }

  // Not a direct child, recurse
  let childrenChanged = false;
  const newSubTasks = node.subTasks.map(child => {
    const newChild = deleteNode(child, targetId);
    if (newChild !== child) {
        childrenChanged = true;
    }
    return newChild;
  });

  if (childrenChanged) {
    const hasChildren = newSubTasks.length > 0;
    const allChildrenComplete = hasChildren && newSubTasks.every(c => c.completed);
    const newCompleted = hasChildren ? allChildrenComplete : node.completed;

    return {
      ...node,
      subTasks: newSubTasks,
      completed: newCompleted
    };
  }

  return node;
};
