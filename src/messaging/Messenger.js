module.exports = class Messenger {

  constructor(options) {
    this.correspondent = options.correspondent;
  }

  start() {
    chrome.runtime.onMessage.addListener((request) => {
      if (
        (request.to === this.correspondent.name) ||
        (request.to === 'all')
      )
        this.correspondent.trigger(request.message, request.info);
    })

    if (typeof chrome.commands !== 'undefined') {
      chrome.commands.onCommand.addListener(function(command) {
        this.correspondent.trigger('command:' + command);
      }.bind(this))
    }
  }

  sendMessage (to, data) {
    let msg = this.buildMessage(to, data);

    if (typeof chrome.tabs !== 'undefined') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, msg);
      });
    } else {
      chrome.runtime.sendMessage(msg);
    }
  }

  buildMessage(to, data) {
    let msg = {
      to: to
    }

    for (var p in data) {
      if (p !== 'to') {
        msg[p] = data[p];
      }
    }

    return msg;
  }

}
