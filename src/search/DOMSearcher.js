module.exports = class DOMSearcher {

  constructor(query) {
    this.query = new RegExp(query, 'ig');
  }

  search(regexp) {
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

    console.log(matches);
  }

}
