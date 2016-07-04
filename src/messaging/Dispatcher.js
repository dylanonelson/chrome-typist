var Messenger = require('./Messenger');

module.exports = class Dispatcher extends Messenger {

  start() {
    chrome.runtime.onMessage.addListener((request) => {
      if (request.to !== this.correspondent.name)
        this.sendMessage(request.to, request);
    })

    chrome.commands.onCommand.addListener((command) => {
      this.sendMessage('all', { message: 'command:' + command });
    })
  }

  sendMessage(to, data) {
    let msg = this.buildMessage(to, data);

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, msg);
    });
  }

}
