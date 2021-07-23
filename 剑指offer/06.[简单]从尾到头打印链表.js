/**
 * https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/
 * 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function (head) {
  let result = [];
  function forEachListNode(node, handle) {
    if (!node) {
      return;
    }
    if (node.next) {
      forEachListNode(node.next, handle);
    }
    handle(node.val);
  }
  forEachListNode(head, function (nodeVal) {
    result.push(nodeVal);
  });
  return result;
};

function ListNode(val) {
  this.val = val;
  this.next = null;
}

const head = new ListNode(0);
const node_1 = new ListNode(1);
const node_2 = new ListNode(2);
const node_3 = new ListNode(3);

head.next = node_1;
node_1.next = node_2;
node_2.next = node_3;

const result = reversePrint(head);
console.log("result: ", result);
