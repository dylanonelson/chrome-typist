import MatchFactory from './MatchFactory';
import NodeMatcherFactory from './NodeMatcherFactory';

class DOMSearcher {

  get matches() {
    if (typeof this._matches !== 'undefined') {
      return this._matches;
    }
    this._matches = [];
    return this._matches;
  }

  get MAX_NUMBER_MATCHES() {
    return 50;
  }

  set matches(matches) {
    this._matches = matches;
  }

  addMatch(node) {
    this.matches.push(
      MatchFactory({ node })
    );
  }

  getAllNodes() {
    const nodes = [];

    const elementWalker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_ELEMENT,
      null,
      false
    );

    const textWalker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    [elementWalker, textWalker].forEach((walker) => {
      let node = walker.nextNode();
      while (node) {
        nodes.push(node);
        node = walker.nextNode();
      }
    });

    return nodes;
  }

  search(query) {
    this.clearMatches();
    const matcher = NodeMatcherFactory(query);

    const d = window.document;
    if (!d || !d.body) return 0;

    for (const node of this.getAllNodes()) {
      if (matcher.matches(node)) {
        this.addMatch(node);
      }
    }

    const length = this.matches.length;

    if (length > this.MAX_NUMBER_MATCHES) {
      this.clearMatches();
    } else {
      this.highlightMatches();
    }

    return length;
  }

  highlightMatches() {
    this.matches.forEach(match => match.highlight());
  }

  clearMatches() {
    this.matches = [];
  }

  currentMatch(callback) {
    if (
      (typeof callback !== 'function') ||
      (typeof this.matches[0] === 'undefined')
    ) {
      return;
    }

    callback(this.matches[0]);
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

export default DOMSearcher;
