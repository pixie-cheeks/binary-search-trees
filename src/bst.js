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
    console.log(value);
    return this.root;
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const myTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

myTree.insert(69);
prettyPrint(myTree.root);
