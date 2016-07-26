import './match.css'

class Match {

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
    if (typeof this._highlightNode !== 'undefined')
      return this._highlightNode;

    this._highlightNode = document.createElement('mark');
    this._highlightNode.className = 'unfocused';
    return this._highlightNode;
  }

  highlight() {
    let parent;
    if (!(parent = this.node.parentNode)) return;
    parent.insertBefore(this.highlightNode, this.node);
    this.highlightNode.appendChild(this.node);
  }

  clear() {
    let parent;
    if (!(parent = this.highlightNode.parentNode)) return;
    parent.insertBefore(this.node, this.highlightNode);
    this.highlightNode.remove();
  }

  focus() {
    this.highlightNode.className = 'focused';
    this.highlightNode.scrollIntoViewIfNeeded(true);
  }

  unfocus() {
    this.highlightNode.className = 'unfocused';
  }

}

class TextMatch extends Match {

  select() {
    this.node.parentNode.click();
  }

  copy() {
    let range = document.createRange();
    range.selectNode(this.node);
    window.getSelection().addRange(range);
    document.execCommand('copy');
  }

}

class InputMatch extends Match {

  select() {
    setTimeout(() => { this.node.focus(); }, 0)
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
