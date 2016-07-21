import './content.css';
import CmdlineIframe from '../cmdline/CmdlineIframe';
import Correspondent from '../messaging/Correspondent';
import DOMSearcher from '../search/DOMSearcher';
import Messenger from '../messaging/Messenger';

class ContentCorrespondent extends Correspondent {

  start() {
    this.cmdline = new CmdlineIframe();
    this.searcher = new DOMSearcher();
  }

  get name() {
    return 'content';
  }

  onCommandCmdline() {
    if (this.cmdline.showing) {
      this.cmdline.hide();
      this.sendMessage('cmdline', 'hide');
    } else {
      this.cmdline.show();
      this.sendMessage('cmdline', 'show');
    }
  }

  onQuery(value) {
    this.searcher.search(value);
  }

}

new ContentCorrespondent().start();
