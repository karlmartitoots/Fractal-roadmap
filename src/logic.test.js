import { describe, it, expect } from 'vitest';
import { toggleNode, deleteNode } from './logic';

describe('Tree Logic', () => {
  const getInitialTree = () => ({
    id: 'root',
    title: 'Root',
    completed: false,
    subTasks: [
      {
        id: '1',
        title: 'Child 1',
        completed: false,
        subTasks: [
            { id: '1-1', title: 'Grandchild 1', completed: false, subTasks: [] },
            { id: '1-2', title: 'Grandchild 2', completed: false, subTasks: [] }
        ]
      },
      {
        id: '2',
        title: 'Child 2',
        completed: true, // Already done
        subTasks: []
      }
    ]
  });

  describe('toggleNode', () => {
    it('toggles a leaf node to completed', () => {
      const tree = getInitialTree();
      const newTree = toggleNode(tree, '2'); // Was true, becomes false
      expect(newTree.subTasks[1].completed).toBe(false);
    });

    it('toggles a leaf node to completed and updates parent if all siblings done', () => {
      // Setup: 1-1 done, 1-2 not done. Toggle 1-2. Parent 1 should become done.
      let tree = getInitialTree();
      tree = toggleNode(tree, '1-1'); // Make 1-1 done
      expect(tree.subTasks[0].subTasks[0].completed).toBe(true);
      expect(tree.subTasks[0].completed).toBe(false); // Parent still false

      tree = toggleNode(tree, '1-2'); // Make 1-2 done
      expect(tree.subTasks[0].subTasks[1].completed).toBe(true);
      expect(tree.subTasks[0].completed).toBe(true); // Parent should be true now
    });

    it('toggles a parent node and updates all descendants (downstream)', () => {
      let tree = getInitialTree();
      tree = toggleNode(tree, '1'); // Toggle Child 1 (was false, now true)

      const child1 = tree.subTasks[0];
      expect(child1.completed).toBe(true);
      expect(child1.subTasks[0].completed).toBe(true);
      expect(child1.subTasks[1].completed).toBe(true);
    });

    it('unchecks a parent if a child is unchecked (upstream)', () => {
      // Setup: All of Child 1 is done.
      let tree = getInitialTree();
      tree = toggleNode(tree, '1'); // Make all true
      expect(tree.subTasks[0].completed).toBe(true);

      // Now uncheck one grandchild
      tree = toggleNode(tree, '1-1');
      expect(tree.subTasks[0].subTasks[0].completed).toBe(false);
      expect(tree.subTasks[0].completed).toBe(false); // Parent should be false
    });

    it('recurses upstream to root', () => {
        // Setup: Root has Child 1 (incomplete) and Child 2 (complete).
        // Complete Child 1. Root should become complete.
        let tree = getInitialTree();
        // Complete Child 1's children first? Or just toggle Child 1?
        // Toggling Child 1 makes it complete AND its children complete.
        tree = toggleNode(tree, '1');

        expect(tree.subTasks[0].completed).toBe(true);
        expect(tree.subTasks[1].completed).toBe(true);
        expect(tree.completed).toBe(true); // Root should be true
    });
  });

  describe('deleteNode', () => {
    it('deletes a leaf node', () => {
      let tree = getInitialTree();
      tree = deleteNode(tree, '2');
      expect(tree.subTasks).toHaveLength(1);
      expect(tree.subTasks[0].id).toBe('1');
    });

    it('deletes a parent node (and its children)', () => {
      let tree = getInitialTree();
      tree = deleteNode(tree, '1');
      expect(tree.subTasks).toHaveLength(1);
      expect(tree.subTasks[0].id).toBe('2');
    });

    it('updates parent completion status after deletion', () => {
        // Setup: Child 1 has gc1 (incomplete) and gc2 (complete - let's set it).
        // If we delete gc1, Child 1 only has gc2 (complete), so Child 1 should become complete.
        let tree = getInitialTree();
        // Manually set gc2 to complete for setup
        tree.subTasks[0].subTasks[1].completed = true;

        tree = deleteNode(tree, '1-1'); // Delete the incomplete one

        expect(tree.subTasks[0].subTasks).toHaveLength(1);
        expect(tree.subTasks[0].subTasks[0].id).toBe('1-2');
        expect(tree.subTasks[0].completed).toBe(true); // Parent became complete
    });
  });
});
