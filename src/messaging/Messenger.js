import { GLOBAL_DEBUG_OPTION_NAME } from 'config';

class Messenger {

  constructor(options) {
    this.correspondent = options.correspondent;
  }

  start() {
    chrome.runtime.onMessage.addListener((request) => {
      if ((
        (request.to === this.correspondent.name) ||
        (request.to === 'all')
      ) &&
        (request.from !== this.correspondent.name)
      ) {
        /* eslint-disable no-console */
        if (window[GLOBAL_DEBUG_OPTION_NAME] === true) {
          console.log(`${this.correspondent.name} receives message:`);
          console.log(request.message);
          console.log(request.data);
        }
        /* eslint-enable no-console */

        this.correspondent.trigger(request.message, request.data);
      }
    });

    if (chrome.commands !== undefined) {
      chrome.commands.onCommand.addListener((command) => {
        this.correspondent.trigger(`command:${command}`);
      });
    }
  }

  sendMessage(to, message, data) {
    const msg = this.buildMessage(to, message, data);

    /* eslint-disable no-console */
    if (window[GLOBAL_DEBUG_OPTION_NAME] === true) {
      console.log(`${this.correspondent.name} sends message:`);
      console.log(msg);
    }
    /* eslint-enable no-console */

    if (this.correspondent.name === 'background') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, msg);
      });
    } else {
      chrome.runtime.sendMessage(msg);
    }
  }

  buildMessage(to, message, data) {
    const msg = {
      to,
      from: this.correspondent.name,
      message: `${this.correspondent.name}:${message}`,
      data,
    };

    return msg;
  }

}

export default Messenger;
