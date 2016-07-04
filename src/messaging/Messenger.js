module.exports = class Messenger {

  constructor(options) {
    this.correspondent = options.correspondent;
  }

  start() {
    chrome.runtime.onMessage.addListener((request) => {
      if (request.to === this.correspondent.name)
        this.correspondent.trigger(request.message, request.info);
    })
  }

  sendMessage (to, data) {
    var msg = {
      from: this.correspondent.name,
      to: to
    }

    for (var p in data) {
      if (p !== 'from') {
        msg[p] = data[p];
      }
    }

    if (typeof chrome.tabs !== 'undefined') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, msg);
      });
    } else {
      chrome.runtime.sendMessage(msg);
    }
  }

}
