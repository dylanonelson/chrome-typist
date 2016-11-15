class NodeMatcher {

  constructor(query) {
    // If the query is null or undefined, JavaScript will coerce the value into
    // a string. Default to a regex that's impossible to match so that empty
    // queries don't match every node.
    this.query = new RegExp(query || '(?!a)a', 'i');
  }

  // Ignore text nodes that are children of text fields, scripts, and CSS
  isSearchableText(node) {
    const tagName = node.parentNode.nodeName.toLowerCase();

    return [
      'textarea',
      'input',
      'select',
      'script',
      'style',
    ].indexOf(tagName) === -1;
  }

  isVisible(node) {
    return (
      (node.offsetHeight !== 0) &&
      (node.offsetWidth !== 0)
    );
  }

  matches(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return this.matchTextNode(node);
    }

    // Match against inputs, textareas, and selects. Disregard others.
    if (node.nodeType === Node.ELEMENT_NODE) {
      switch (node.tagName.toLowerCase()) {
        case 'input':
          return this.matchTextField(node);
        case 'textarea':
          return this.matchTextField(node);
        case 'select':
          return this.matchSelect(node);
        default:
          // do nothing
      }
    }

    return false;
  }

  matchTextField(node) {
    // JavaScript will coerce `undefined` into a string, so nodes without
    // a value or placeholder property will match the wrong queries. Default
    // test value to an empty string.
    return (
      (
        this.query.test(node.value || '') ||
        this.query.test(node.placeholder || '')
      ) && (
        this.isVisible(node)
      )
    );
  }

  matchTextNode(node) {
    return (
      this.query.test(node.data) &&
      this.isVisible(node.parentNode) &&
      this.isSearchableText(node)
    );
  }

  matchSelect(node) {
    // See above comment re matching undefined values.
    return (
      (
        this.query.test(node.textContent || '') ||
        this.query.test(node.value || '')
      ) && (
        this.isVisible(node)
      )
    );
  }

}

const NodeMatcherFactory = (query) => new NodeMatcher(query);

export default NodeMatcherFactory;
