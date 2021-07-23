/**
 * https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof/
 * 输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
 */

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  const rootNodeValue = preorder.length ? preorder[0] : null;
  const rootNode = new TreeNode(rootNodeValue);
  // 左右子树的中序遍历
  const leftTreeNodeInorder = inorder.slice(0, inorder.indexOf(rootNodeValue));
  const rightTreeNodeInorder = inorder.slice(
    inorder.indexOf(rootNodeValue) + 1,
    inorder.length
  );
  // 判断是否有左子节点
  if (!leftTreeNodeInorder.length) {
    rootNode.left = null;
  } else {
    const leftTreeNodePreorder = preorder.slice(
      1,
      leftTreeNodeInorder.length + 1
    );
    rootNode.left = buildTree(leftTreeNodePreorder, leftTreeNodeInorder);
  }
  // 判断是否有右子节点
  if (!rightTreeNodeInorder.length) {
    rootNode.right = null;
  } else {
    const rightTreeNodePreorder = preorder.slice(
      leftTreeNodeInorder.length + 1,
      preorder.length + 1
    );
    rootNode.right = buildTree(rightTreeNodePreorder, rightTreeNodeInorder);
  }
  return rootNode;
};

const result = buildTree([1, 2, 4, 7, 3, 5, 6, 8], [4, 7, 2, 1, 5, 3, 8, 6]);
console.log(result);
