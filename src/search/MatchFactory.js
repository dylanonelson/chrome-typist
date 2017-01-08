import './match.css';
import NodeMatcherFactory from './NodeMatcherFactory';

const matchTag = `${chrome.runtime.id}-nodeid`;
const highlightTag = `${chrome.runtime.id}-highlighted`;
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

let index = 1;

class Match {

  constructor({ node }) {
    this.node = node;
  }

  get node() {
    return this._node;
  }

  set node(node) {
    this._node = node;
  }

  // The DOM APIs do not guarantee a unique id for any given node. Match objects
  // generate one to avoid duplicating matches.
  get nodeid() {
    if (typeof this.node[matchTag] === 'undefined') {
      this.node[matchTag] = ++index;
    }

    return this.node[matchTag];
  }

  get nodeName() {
    return this.node.nodeName;
  }

  get focusedNodes() {
    if (typeof this._focusedNodes !== 'undefined') {
      return this._focusedNodes;
    }

    this._focusedNodes = [];
    return this._focusedNodes;
  }

  set focusedNodes(fn) {
    this._focusedNodes = fn;
  }

}

class ElementMatch extends Match {

  clear() {
    this.node.style['background-color'] = this.originalBackgroundColor;
    this.node.style['background-image'] = this.originalBackgroundImage;
    this.node[highlightTag] = false;
  }

  copy() {
    copyText(this.node.textContent);
  }

  focus() {
    this.node.style['background-color'] = 'orange';
    this.node.scrollIntoViewIfNeeded(true);
  }

  focusChild() {
    let nodeIn = this.focusedNodes.pop();

    // If the node in focus is no longer on the same branch of the tree as the
    // previously focused child, clear the stack of previously focused nodes and
    // focus on the first child instead of picking off of it.
    if (!this.node.contains(nodeIn)) {
      this.focusedNodes = [];
      nodeIn = this.node.children[0];
    }

    this.refocus(nodeIn);
  }

  focusNextSibling() {
    const nextSibling = this.node.nextElementSibling;
    this.refocus(nextSibling);
  }

  focusParent() {
    const nodeOut = this.node.parentNode;

    if (nodeOut && nodeOut !== document) {
      this.focusedNodes.push(this.node);
      this.refocus(nodeOut);
    }
  }

  focusPreviousSibling() {
    const previousSibling = this.node.previousElementSibling;
    this.refocus(previousSibling);
  }

  highlight() {
    if (this.node[highlightTag]) return;
    this.node[highlightTag] = true;

    if (typeof this.node.style === 'undefined') this.node.style = {};

    this.originalBackgroundColor = this.node.style['background-color'];
    this.originalBackgroundImage = this.node.style['background-image'];

    this.node.style['background-color'] = 'yellow';
    this.node.style['background-image'] = 'none';
  }

  open() {
    if (typeof this.node.href === 'string') {
      window.open(this.node.href, '_blank');
    }
  }

  unfocus() {
    this.node.style['background-color'] = 'yellow';
  }

  refocus(node) {
    const matcher = NodeMatcherFactory(null);

    if (node && matcher.isVisible(node)) {
      this.clear();
      this.node = node;
      this.highlight();
      this.focus();
    }
  }
  select() {
    this.node.click();
  }

  softSelect() {
    if (this.node.tabIndex === -1) {
      this.node.tabIndex = 0;
    }

    this.node.focus();
  }

  softYank() {
    if (typeof this.node.href === 'string') {
      copyText(this.node.href);
    }
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
    case 'input': {
      return new InputMatch({ node });
    }
    case 'textarea': {
      return new TextareaMatch({ node });
    }
    case 'select': {
      return new SelectMatch({ node });
    }
    default: {
      return new ElementMatch({ node });
    }
  }
};

const MatchFactory = ({ node }) => {
  switch (node.nodeType) {
    case Node.ELEMENT_NODE: {
      return ElementMatchFactory({ node });
    }
    case Node.TEXT_NODE: {
      return ElementMatchFactory({ node: node.parentNode });
    }
    default: {
      throw new Error(`Cannot generate match with node type ${node.nodeType}`);
    }
  }
};

export default MatchFactory;
