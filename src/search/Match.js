module.exports = class Match {

  constructor({ node }) {
    this.node = node;
  }

  set node(node) {
    this._node = node;
  }

  get node() {
    return this._node;
  }

  set highlightNode(node) {
    this._highlightNode = node;
  }

  get highlightNode() {
    return this._highlightNode;
  }

  highlight() {
    let parent = this.node.parentNode
    this.highlightNode = document.createElement('mark');
    this.highlightNode.appendChild(this.node);
    parent.appendChild(this.highlightNode);
  }

  clear() {
    let parent;
    if (!(parent = this.highlightNode.parentNode)) return;
    parent.appendChild(this.node);
    this.highlightNode.remove();
  }

}
