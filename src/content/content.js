import CmdlineIframe from '../cmdline/iframe';
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

  onCmdlineBrowse() {
    this.searcher.currentMatch().focus();
    this.cmdline.hide();
  }

  onCmdlineNext() {
    console.log(this.searcher.currentMatch());
    this.searcher.currentMatch().unfocus();
    this.searcher.nextMatch().focus();
  }

  onCmdlinePrevious() {
    this.searcher.currentMatch().unfocus()
    this.searcher.previousMatch().focus();
  }

  onCmdlineSelect() {
    this.searcher.currentMatch().select();
    this.searcher.clearMatches();
    this.cmdline.hide();
  }
}

new ContentCorrespondent().start();
