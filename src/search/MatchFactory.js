import './match.css';

class Match {

  constructor({ node }) {
    this.node = node;
    this.parent = node.parentNode;
  }

  get highlightNode() {
    if (typeof this._highlightNode !== 'undefined') {
      return this._highlightNode;
    }

    this._highlightNode = document.createElement('mark');
    this._highlightNode.className = 'unfocused';
    return this._highlightNode;
  }

  set highlightNode(node) {
    this._highlightNode = node;
  }

  get node() {
    return this._node;
  }

  set node(node) {
    this._node = node;
  }

}

class TextMatch extends Match {

  get nodeName() {
    return this.parent.nodeName;
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

  copy() {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNode(this.node);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
  }

  highlight() {
    if (!this.parent) return;
    this.parent.insertBefore(this.highlightNode, this.node);
    this.highlightNode.appendChild(this.node);
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

  softSelect() {
    if (this.parent.tabIndex === -1) {
      this.parent.tabIndex = 0;
    }

    this.parent.focus();
  }

  unfocus() {
    this.highlightNode.className = 'unfocused';
  }

}

const copyText = (text) => {
  const placeholder = document.createElement('div');
  placeholder.style.position = 'fixed';
  placeholder.style.top = -10000;
  document.body.appendChild(placeholder);
  placeholder.textContent = text;
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNode(placeholder);
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand('copy');
  document.body.removeChild(placeholder);
};

class ElementMatch extends Match {

  get nodeName() {
    return this.node.nodeName;
  }

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

  softSelect() {
    if (this.node.tabIndex === -1) {
      this.node.tabIndex = 0;
    }

    this.node.focus();
  }

}

class InputMatch extends ElementMatch {

  copy() {
    copyText(this.node.value);
  }

  select() {
    let callback = () => {};

    switch (this.node.getAttribute('type').toLowerCase()) {
      case 'text':
        callback = () => this.node.select();
        break;
      case 'password':
        callback = () => this.node.select();
        break;
      case 'search':
        callback = () => this.node.select();
        break;
      case 'radio':
        callback = () => { this.node.checked = !this.node.checked; };
        break;
      default:
        callback = () => this.node.click();
    }

    setTimeout(callback, 0);
  }

}

class TextareaMatch extends ElementMatch {

  copy() {
    copyText(this.node.value);
  }

  select() {
    setTimeout(() => this.node.select(), 0);
  }

}

class SelectMatch extends ElementMatch {

  copy() {
    const text = (() => {
      const children = this.node.childNodes;

      for (let i = 0; i < children.length; i++) {
        const child = children[i];

        if (child.value === this.node.value) {
          return child.textContent;
        }
      }

      return '';
    })();

    copyText(text);
  }

  select() {
    setTimeout(() => this.node.focus(), 0);
  }

}

const ElementMatchFactory = ({ node }) => {
  switch (node.tagName.toLowerCase()) {
    case 'input':
      return new InputMatch({ node });
    case 'textarea':
      return new TextareaMatch({ node });
    case 'select':
      return new SelectMatch({ node });
    default:
      throw new Error(`Cannot generate match for tag name ${node.tagName}`);
  }
};

const MatchFactory = ({ node }) => {
  switch (node.nodeType) {
    // ELEMENT_NODE
    case 1:
      return ElementMatchFactory({ node });
    // TEXT_NODE
    case 3:
      return new TextMatch({ node });
    default:
      throw new Error(`Cannot generate match with node type ${node.nodeType}`);
  }
};

export default MatchFactory;
