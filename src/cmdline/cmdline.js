var body = require('./cmdline.html');
require('./cmdline.css');
document.body = body;

var query = document.getElementById('query');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'Yo') {
    // WTF?
    setTimeout(function () {
      query.focus();
    }, 0);
  }
});

function sendMessage (data) {
  var msg = {
    from: 'cmdline'
  }

  for (var p in data) {
    if (p !== 'from') {
      msg[p] = data[p];
    }
  }

  //window.parent.postMessage(msg);
}

query.addEventListener('keyup', (e) => {
  sendMessage({
    query: query.value,
    test: 'test'
  })
});
