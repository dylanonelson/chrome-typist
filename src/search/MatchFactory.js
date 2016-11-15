import './match.css';

class Match {

  constructor({ node }) {
    this.node = node;
    this.parent = node.parentNode;
  }

  get node() {
    return this._node;
  }

  set node(node) {
    this._node = node;
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

  get focusedNodes() {
    if (typeof this._focusedNodes !== 'undefined') {
      return this._focusedNodes;
    }

    this._focusedNodes = [];
    return this._focusedNodes;
  }

  clear() {
    this.node.style['background-color'] = this.originalBackgroundColor;
    this.node.style['background-image'] = this.originalBackgroundImage;
  }

  copy() {
    copyText(this.node.textContent);
  }

  focus() {
    this.node.style['background-color'] = 'orange';
    this.node.scrollIntoViewIfNeeded(true);
  }

  focusIn() {
    const nodeIn = this.focusedNodes.pop();

    if (nodeIn) {
      this.clear();
      this.node = nodeIn;
      this.highlight();
      this.focus();
    }
  }

  focusOut() {
    const nodeOut = this.node.parentNode;

    if (nodeOut && nodeOut !== document) {
      this.clear();
      this.focusedNodes.push(this.node);
      this.node = nodeOut;
      this.highlight();
      this.focus();
    }
  }

  highlight() {
    this.originalBackgroundColor = this.node.style['background-color'];
    this.originalBackgroundImage = this.node.style['background-image'];

    this.node.style['background-color'] = 'yellow';
    this.node.style['background-image'] = 'none';
  }

  unfocus() {
    this.node.style['background-color'] = 'yellow';
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
