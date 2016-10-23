class NodeMatcher {

  constructor(query) {
    // If the query is null or undefined, JavaScript will coerce the value into
    // a string. Default to a regex that's impossible to match so that empty
    // queries don't match every node.
    this.query = new RegExp(query || '(?!a)a', 'i');
  }

  isVisible(node) {
    return (
      (node.offsetHeight !== 0) &&
      (node.offsetWidth !== 0)
    );
  }

  matches(node) {
    // Text nodes
    if (node.nodeType === 3) {
      return this.matchTextNode(node);
    }

    // Element nodes
    // Match against inputs, textareas, and selects. Disregard others.
    if (node.nodeType === 1) {
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
      this.isVisible(node.parentNode)
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
