import MatchFactory from './MatchFactory'

class DOMSearcher {

  get query() {
    return this._query;
  }

  set query(query) {
    if (query) {
      this._query = new RegExp(query, 'i');
    } else {
      this._query = new RegExp('', 'i');
    }
  }

  get matches() {
    if (typeof this._matches !== 'undefined') {
      return this._matches;
    } else {
      this._matches = [];
      return this._matches;
    }
  }

  get MAX_NUMBER_MATCHES() {
    return 15;
  }

  set matches(matches) {
    this._matches = matches;
  }

  search(query) {
    this.query = query;
    this.clearMatches();

    let d = window.document;
    if (!d || !d.body) return;

    let nodeIterator = d.createNodeIterator(document.body, NodeFilter.SHOW_ALL, {
      acceptNode: (n) => {
        if (
          (
            // Check if the text matches the query
            this.query.test(n.data) ||
            this.query.test(n.value) ||
            this.query.test(n.placeholder)
          ) && (
            // Check if the node is visible
            (
              // Text nodes should have visible parents
              (n.nodeType === 3) &&
              (n.parentNode.offsetWidth !== 0) &&
              (n.parentNode.offsetHeight !== 0)
            ) || (
              // Element nodes should be visible
              (n.nodeType === 1) &&
              (n.offsetWidth !== 0) &&
              (n.offsetHeight !== 0)
            )
          ) && (
            // Check that node is either an element (1) or text (3)
            (n.nodeType == 1) ||
            (n.nodeType == 3)
          )
        ) {
          return NodeFilter.FILTER_ACCEPT
        }
      }
    }, false)

    let node;
    while (node = nodeIterator.nextNode()) {
      this.matches.push(
        MatchFactory({ node })
      )
    }

    console.log(this.matches);
    this.highlightMatches();
    return this.matches.length;
  }

  highlightMatches() {
    if (this.matches.length > this.MAX_NUMBER_MATCHES) return;

    this.matches.forEach(match => {
      match.highlight();
    })
  }

  clearMatches() {
    if (this.matches.length <= this.MAX_NUMBER_MATCHES) {
      this.matches.forEach(match => {
        match.clear();
      });
    }

    this.matches = [];
  }

  currentMatch(callback) {
    if (
      (typeof callback !== 'function') ||
      (typeof this.matches[0] === 'undefined')
    )
      return;

    return callback(this.matches[0]);
  }

  nextMatch(callback) {
    this.matches.push(this.matches.shift());
    return this.currentMatch(callback);
  }

  previousMatch(callback) {
    this.matches.unshift(this.matches.pop());
    return this.currentMatch(callback);
  }

}

export default DOMSearcher
