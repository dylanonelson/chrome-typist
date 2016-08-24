class NodeMatcher {

  constructor(query) {
    // If the query is null or undefined, JavaScript will coerce the value into
    // a string, so we default to an empty string if it's falsy.
    this.query = new RegExp(query || '', 'i');
  }

  isVisible(node) {
    return (
      (node.offsetHeight !== 0) &&
      (node.offsetWidth !== 0)
    );
  }

  matches(node) {
    // Text nodes
    if (
      node.nodeType === 3 &&
      this.query.test(node.data) &&
      this.isVisible(node.parentNode)
    ) {
      return true;
    }

    // Element nodes (textareas & inputs)
    if (
      node.nodeType === 1 && (
        this.query.test(node.value) ||
        this.query.test(node.placeholder)
      ) && (
      this.isVisible(node)
      )
    ) {
      return true;
    }

    return false;
  }
}

const NodeMatcherFactory = (query) => new NodeMatcher(query);

export default NodeMatcherFactory;
