import MatchFactory from './MatchFactory';
import NodeMatcherFactory from './NodeMatcherFactory';

class DOMSearcher {

  constructor() {
    chrome.storage.sync.get([
      'maxMatches',
    ], (items) => {
      this.MAX_NUMBER_MATCHES = items.maxMatches;
    });
  }

  get matches() {
    if (typeof this._matches === 'undefined') {
      this._matches = {};
    }

    return this._matches;
  }

  set matches(matches) {
    this._matches = matches;
  }

  get matchIndex() {
    if (typeof this._matchIndex === 'undefined') {
      this._matchIndex = [];
    }

    return this._matchIndex;
  }

  set matchIndex(matchIndex) {
    this._matchIndex = matchIndex;
  }

  get MAX_NUMBER_MATCHES() {
    return this._max_number_matches || 50;
  }

  set MAX_NUMBER_MATCHES(num) {
    this._max_number_matches = num;
  }

  addMatch(node) {
    const match = MatchFactory({ node });
    this.matches[match.nodeid] = match;
  }

  clearMatches() {
    this.matchIndex.forEach(node => this.matches[node].clear());
  }

  currentMatch(callback) {
    if (
      (typeof callback === 'function') ||
      (typeof this.matches[0] !== 'undefined')
    ) {
      const nodeid = this.matchIndex[0];
      callback(this.matches[nodeid]);
    }
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

  highlightMatches() {
    this.matchIndex.forEach(node => this.matches[node].highlight());
  }

  indexMatches() {
    this.matchIndex = Object.keys(this.matches);
  }

  nextMatch(callback) {
    this.matchIndex.push(this.matchIndex.shift());
    return this.currentMatch(callback);
  }

  previousMatch(callback) {
    this.matchIndex.unshift(this.matchIndex.pop());
    return this.currentMatch(callback);
  }

  resetMatches() {
    this.matches = {};
    this.matchIndex = [];
  }

  search(query) {
    this.clearMatches();
    this.resetMatches();
    const matcher = NodeMatcherFactory(query);

    const d = window.document;
    if (!d || !d.body) return 0;

    for (const node of this.getAllNodes()) {
      if (matcher.matches(node)) {
        this.addMatch(node);
      }
    }

    this.indexMatches();
    const length = this.matchIndex.length;

    if (length > this.MAX_NUMBER_MATCHES) {
      this.resetMatches();
    } else {
      this.highlightMatches();
    }

    return length;
  }

}

export default DOMSearcher;
