import Correspondent from 'messaging/Correspondent';
import Dispatcher from 'messaging/Dispatcher';
import Commands from '../commands';

class BackgroundCorrespondent extends Correspondent {

  start() {
    this.dispatcher = new Dispatcher({ correspondent: this });
    this.dispatcher.start();
  }

  get name() {
    return 'background';
  }

  onCmdlineCommand(name) {
    switch (name) {
      case Commands.CLOSE_UNPINNED: {
        chrome.tabs.query({ pinned: false, active: false }, tabs =>
          chrome.tabs.remove(tabs.map(tab => tab.id)));
        break;
      }
      default: {
        // do nothing
      }
    }
  }

  onMoveTab({ target }) {
    chrome.tabs.query({ active: true }, tabs => {
      chrome.tabs.move(tabs[0].id, { index: target });
    });
  }

}

new BackgroundCorrespondent().start();
