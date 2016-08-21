import './match.css';

class Match {

  constructor({ node }) {
    this.node = node;
    this.parent = node.parentNode;
  }

  set highlightNode(node) {
    this._highlightNode = node;
  }

  get highlightNode() {
    if (typeof this._highlightNode !== 'undefined') {
      return this._highlightNode;
    }

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
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNode(this.node);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
  }

  open() {
    if (typeof this.parent.href === 'string') {
      window.open(this.parent.href, '_blank');
    }
  }

  select() {
    if (typeof this.parent.click === 'function') {
      this.parent.click();
    }
  }

}

class InputMatch extends Match {

  get nodeName() {
    return this.node.nodeName;
  }

  copy() {
    this.node.select();
    document.execCommand('copy');
  }

  select() {
    setTimeout(() => { this.node.select(); }, 0);
  }

}

class BlockInputMatch extends InputMatch {

  clear() {
    this.node.style.outline = this.originalOutline;
  }

  focus() {
    this.node.style.outline = '1px solid orange';
  }

  highlight() {
    this.originalOutline = window.getComputedStyle(this.node).outline;
    this.node.style.outline = '1px solid yellow';
  }

  unfocus() {
    this.node.style.outline = '1px solid yellow';
  }

}

const MatchFactory = ({ node }) => {
  switch (node.nodeType) {
    // ELEMENT_NODE (either an input or a textarea)
    case 1:
      if (window.getComputedStyle(node).display === 'block') {
        return new BlockInputMatch({ node });
      }
      return new InputMatch({ node });
    // TEXT_NODE
    case 3:
      return new TextMatch({ node });
    default:
      throw new Error(`Cannot generate match with node type ${node.nodeType}`);
  }
};

export default MatchFactory;
