import Messenger from './Messenger';

class Dispatcher extends Messenger {

  start() {
    chrome.runtime.onMessage.addListener((request) => {
      if (request.to !== this.correspondent.name) {
        this.sendMessage(request.to, request.message, request.data);
      }
    });

    chrome.commands.onCommand.addListener((command) => {
      this.sendMessage('all', `command:${command}`);
    });
  }

  sendMessage(to, message, data) {
    const msg = this.buildMessage(to, message, data);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, msg);
    });
  }

}

export default Dispatcher;
