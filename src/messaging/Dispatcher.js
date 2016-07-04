var Messenger = require('./Messenger');

module.exports = class Dispatcher extends Messenger {

  sendMessage(to, msg) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        to: to,
        message: msg
      });
    });
  }

}
