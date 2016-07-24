import Match from './Match'

class DOMSearcher {

  get query() {
    return this._query;
  }

  set query(query) {
    this._query = new RegExp(query, 'i');
  }

  get matches() {
    if (typeof this._matches !== 'undefined') {
      return this._matches;
    } else {
      this._matches = [];
      return this._matches;
    }
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
            this.query.test(n.value)
          ) &&
          (
            // Check if the node is visible
            (n.parentNode.offsetWidth !== 0) &&
            (n.parentNode.offsetHeight !== 0)
          )
        ) {
          return NodeFilter.FILTER_ACCEPT
        }
      }
    }, false)

    let node;
    while (node = nodeIterator.nextNode()) {
      if (node.parentNode.tagName.toLowerCase() !== 'script')
        this.matches.push(
          new Match({ node: node })
        );
    }

    console.log(this.matches);
    this.highlightMatches();
  }

  highlightMatches() {
    if (this.matches.length > 10) return;

    this.matches.forEach((match) => {
      match.highlight();
    })
  }

  clearMatches() {
    if (this.matches.length <= 10) {
      this.matches.forEach((match) => {
        match.clear();
      });
    }

    this.matches = [];
  }

  currentMatch() {
    return this.matches[0];
  }

  nextMatch() {
    this.matches.push(this.matches.shift());
    return this.currentMatch();
  }

  previousMatch() {
    this.matches.unshift(this.matches.pop());
    return this.currentMatch();
  }

}

export default DOMSearcher
