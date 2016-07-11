class DOMSearcher {

  constructor(query) {
    this.query = new RegExp(query, 'ig');
  }

  start() {
    this.search();
    this.highlightMatches();
  }

  search() {
    let d = window.document;
    let matches = new Array();

    if (!d || !d.body) return;

    let nodeIterator = d.createNodeIterator(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => {
        if (this.query.test(n.data))
          return NodeFilter.FILTER_ACCEPT
      }
    }, false)

    var node;
    while (node = nodeIterator.nextNode()) {
      matches.push(node);
    }

    this.matches = matches;
    console.log(matches);
  }

  highlightMatches() {
    this.matches.forEach((node) => {
      if (node.parentNode && this.matches.length < 10) {
        let highlightNode = document.createElement('div');
        highlightNode.className = 'typist-highlight';
        let range = document.createRange();
        range.selectNodeContents(node);
        range.surroundContents(highlightNode);
      }
    })
  }

}

export default DOMSearcher
