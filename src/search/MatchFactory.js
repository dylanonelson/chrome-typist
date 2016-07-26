import './match.css'

class Match {

  constructor({ node }) {
    this.node = node;
    this.parent = node.parentNode;
  }

  set highlightNode(node) {
    this._highlightNode = node;
  }

  get highlightNode() {
    if (typeof this._highlightNode !== 'undefined')
      return this._highlightNode;

    this._highlightNode = document.createElement('mark');
    this._highlightNode.className = 'unfocused';
    return this._highlightNode;
  }

  set node(node) {
    this._node = node;
  }

  get node() {
    return this._node;
  }

  clear() {
    if (!this.parent) return;
    this.parent.insertBefore(this.node, this.highlightNode);
    this.highlightNode.remove();
  }

  focus() {
    this.highlightNode.className = 'focused';
    this.highlightNode.scrollIntoViewIfNeeded(true);
  }

  highlight() {
    if (!this.parent) return;
    this.parent.insertBefore(this.highlightNode, this.node);
    this.highlightNode.appendChild(this.node);
  }

  unfocus() {
    this.highlightNode.className = 'unfocused';
  }

}

class TextMatch extends Match {

  get nodeName() {
    return this.parent.nodeName;
  }

  copy() {
    let range = document.createRange();
    let selection = window.getSelection();
    range.selectNode(this.node);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
  }

  open() {
    if (typeof this.parent.href === 'string')
      window.open(this.parent.href, '_blank');
  }

  select() {
    if (typeof this.parent.click === 'function')
      this.parent.click();
  }

}

class InputMatch extends Match {

  get nodeName() {
    return this.node.nodeName;
  }

  select() {
    setTimeout(() => { this.node.select(); }, 0)
  }

  copy() {
    this.node.select();
    document.execCommand('copy');
  }

}

const MatchFactory = ({ node }) => {
  switch (node.nodeType) {
    // ELEMENT_NODE (either an input or a textarea)
    case 1:
      return new InputMatch({ node });
      break;
    // TEXT_NODE
    case 3:
      return new TextMatch({ node });
      break;
    default:
      throw new Error(`Cannot generate match with node type ${node.nodeType}`);
  }
}

export default MatchFactory
