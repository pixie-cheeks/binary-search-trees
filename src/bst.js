const createNode = (data) => ({
  data,
  left: null,
  right: null,
});

const buildTree = (array) => {
  if (array.length === 0) return null;

  const mid = Math.floor(array.length / 2);
  const root = createNode(array[mid]);

  root.left = buildTree(array.slice(0, mid));
  root.right = buildTree(array.slice(mid + 1));

  return root;
};

const createTree = (inputArray) => {
  // Filter duplicates and sort the array
  const cleanedArray = inputArray
    .filter((element, index, array) => array.indexOf(element) === index)
    .sort((a, b) => a - b);

  return { root: buildTree(cleanedArray) };
};

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

const myTree = createTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

prettyPrint(myTree.root);
