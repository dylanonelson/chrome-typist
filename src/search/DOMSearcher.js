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
    return 15;
  }

  set matches(matches) {
    this._matches = matches;
  }

  search(query) {
    this.clearMatches();
    const matcher = NodeMatcherFactory(query);

    const d = window.document;
    if (!d || !d.body) return 0;

    for (const node of d.getElementsByTagName('*')) {
      if (matcher.matches(node)) {
        this.matches.push(
          MatchFactory({ node })
        );
      }
    }

    this.highlightMatches();
    return this.matches.length;
  }

  highlightMatches() {
    if (this.matches.length > this.MAX_NUMBER_MATCHES) return;

    this.matches.forEach(match => {
      match.highlight();
    });
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
