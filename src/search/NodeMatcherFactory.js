class NodeMatcher {

  constructor(query) {
    // If the query is null or undefined, JavaScript will coerce the value into
    // a string, so we default to an empty string if it's falsy.
    this.query = new RegExp(query || '', 'i');
  }

  matches(node) {
    if (
        (
          // Check if the text matches the query
          this.query.test(node.data) ||
          this.query.test(node.value) ||
          this.query.test(node.placeholder)
        ) && (
          // Check if the node is visible
          (
            // Text nodes should have visible parents
            (node.nodeType === 3) &&
            (node.parentNode.offsetWidth !== 0) &&
            (node.parentNode.offsetHeight !== 0)
          ) || (
            // Element nodes should be visible
            (node.nodeType === 1) &&
            (node.offsetWidth !== 0) &&
            (node.offsetHeight !== 0)
          )
        ) && (
          // Check that node is either an element (1) or text (3)
          (node.nodeType === 1) ||
          (node.nodeType === 3)
        )
      ) {
      return true;
    }

    return false;
  }

}

const NodeMatcherFactory = (query) => new NodeMatcher(query);

export default NodeMatcherFactory;
