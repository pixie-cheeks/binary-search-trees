import Tree from './bst.js';

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
const getRandomNum = () => Math.floor(Math.random() * 100);
const getRandomNumArray = (length) =>
  Array(length)
    .fill(null)
    .map(() => getRandomNum());

const myTree = new Tree(getRandomNumArray(9));
prettyPrint(myTree.root);
console.table({
  isBalanced: myTree.isBalanced(),
  levelOrder: myTree.levelOrder(),
  preOrder: myTree.preOrder(),
  inOrder: myTree.inOrder(),
  postOrder: myTree.postOrder(),
});

myTree.insert(getRandomNum());
myTree.insert(getRandomNum());
myTree.insert(getRandomNum());
myTree.insert(getRandomNum());
myTree.insert(getRandomNum());
myTree.insert(getRandomNum());

prettyPrint(myTree.root);
console.table({
  isBalanced: myTree.isBalanced(),
  levelOrder: myTree.levelOrder(),
  preOrder: myTree.preOrder(),
  inOrder: myTree.inOrder(),
  postOrder: myTree.postOrder(),
});
myTree.rebalance();

prettyPrint(myTree.root);
console.table({
  isBalanced: myTree.isBalanced(),
  levelOrder: myTree.levelOrder(),
  preOrder: myTree.preOrder(),
  inOrder: myTree.inOrder(),
  postOrder: myTree.postOrder(),
});
