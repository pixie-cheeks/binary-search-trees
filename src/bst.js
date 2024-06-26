import Queue from './queue.js';

const createNode = (data) => ({
  data,
  left: null,
  right: null,
});

class Tree {
  constructor(inputArray) {
    // Filter duplicates and sort the array
    this.root = Tree.buildTree(
      inputArray
        .filter((element, index, array) => array.indexOf(element) === index)
        .sort((a, b) => a - b),
    );
  }

  static buildTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const root = createNode(array[mid]);

    root.left = Tree.buildTree(array.slice(0, mid));
    root.right = Tree.buildTree(array.slice(mid + 1));

    return root;
  }

  insert(value) {
    return Tree.#insertRec(value, this.root);
  }

  static #insertRec(value, root) {
    if (root === null) {
      return createNode(value);
    }

    if (value > root.data) {
      root.right = Tree.#insertRec(value, root.right);
    } else if (value < root.data) {
      // Explicit if-clause for duplicates
      root.left = Tree.#insertRec(value, root.left);
    }

    return root;
  }

  deleteItem(value) {
    this.root = Tree.#deleteItemRec(value, this.root);
  }

  static #deleteItemRec(value, root) {
    if (root === null) return root;

    if (value === root.data) {
      if (!root.right && !root.left) return null;
      if (!root.right) return root.left;
      if (!root.left) return root.right;

      let replacement = root.right;
      while (replacement.left) {
        replacement = replacement.left;
      }
      root.data = replacement.data;
      root.right = Tree.#deleteItemRec(replacement.data, root.right);
    }

    if (value > root.data) root.right = Tree.#deleteItemRec(value, root.right);
    else root.left = Tree.#deleteItemRec(value, root.left);

    return root;
  }

  find(value) {
    return Tree.#findRec(value, this.root);
  }

  static #findRec(value, root) {
    if (root === null) return root;

    if (value > root.data) {
      return Tree.#findRec(value, root.right);
    }
    if (value < root.data) {
      return Tree.#findRec(value, root.left);
    }

    return root;
  }

  levelOrder(callback, recursive = false) {
    let method = null;
    if (recursive) {
      method = Tree.#recLevelOrderHelper;
    } else {
      method = Tree.#levelOrderIter;
    }

    if (callback) return method(this.root, callback);

    const values = [];
    method(this.root, (node) => values.push(node.data));
    return values;
  }

  static #levelOrderIter(root, callback) {
    if (root === null) return;

    const queue = new Queue();
    queue.enqueue(root);

    while (!queue.isEmpty()) {
      const currentNode = queue.dequeue();

      if (currentNode.left) queue.enqueue(currentNode.left);
      if (currentNode.right) queue.enqueue(currentNode.right);

      callback(currentNode);
    }
  }

  static #recLevelOrderHelper(root, callback) {
    const queue = new Queue();
    queue.enqueue(root);
    Tree.#levelOrderRec(callback, queue);
  }

  static #levelOrderRec(callback, queue) {
    const root = queue.dequeue();
    callback(root);

    if (root.left) queue.enqueue(root.left);
    if (root.right) queue.enqueue(root.right);

    if (!queue.isEmpty()) Tree.#levelOrderRec(callback, queue);
  }

  inOrder(callback) {
    if (callback) return this.#inOrderHelp(callback);

    const values = [];
    this.#inOrderHelp((node) => values.push(node.data));

    return values;
  }

  #inOrderHelp(callback, root = this.root) {
    if (root === null) return;
    if (root.left) this.#inOrderHelp(callback, root.left);
    callback(root);
    if (root.right) this.#inOrderHelp(callback, root.right);
  }

  preOrder(callback) {
    if (callback) return this.#preOrderHelp(callback);

    const values = [];
    this.#preOrderHelp((node) => values.push(node.data));

    return values;
  }

  #preOrderHelp(callback, root = this.root) {
    if (root === null) return;
    callback(root);
    if (root.left) this.#preOrderHelp(callback, root.left);
    if (root.right) this.#preOrderHelp(callback, root.right);
  }

  postOrder(callback) {
    if (callback) return this.#postOrderHelp(callback);

    const values = [];
    this.#postOrderHelp((node) => values.push(node.data));

    return values;
  }

  #postOrderHelp(callback, root = this.root) {
    if (root === null) return;
    if (root.left) this.#postOrderHelp(callback, root.left);
    if (root.right) this.#postOrderHelp(callback, root.right);
    callback(root);
  }

  height(node) {
    if (node == null) return 0;
    const increment = node === this.root ? 0 : 1;

    return (
      Math.max(this.height(node.left), this.height(node.right)) + increment
    );
  }

  depth(node) {
    return Tree.#findDepth(node.data, this.root);
  }

  /* eslint-disable no-param-reassign */
  static #findDepth(value, root, edges = 0) {
    if (root === null || root.data === value) return 0;

    if (root.data > value) {
      edges += Tree.#findDepth(value, root.left, edges);
    }
    if (root.data < value) {
      edges += Tree.#findDepth(value, root.right, edges);
    }

    return edges + 1;
  }
  /* eslint-enable no-param-reassign */

  isBalanced() {
    return this.#isBalancedRec(this.root);
  }

  #isBalancedRec(node) {
    if (node === null) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.#isBalancedRec(node.left) &&
      this.#isBalancedRec(node.right)
    );
  }

  rebalance() {
    this.root = Tree.buildTree(this.inOrder());
  }
}

export default Tree;
