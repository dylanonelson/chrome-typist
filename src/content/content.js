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

  onCmdlineBrowse(which) {
    this.searcher.currentMatch(match => match.unfocus());

    this.searcher[`${which}Match`](match => {
      match.focus();
      this.sendMessage('cmdline', 'currentMatch', match.nodeName);
    });
  }

  onCmdlineQuery(value) {
    let number = this.searcher.search(value);
    this.sendMessage('cmdline', 'search', {
      numberOfMatches: number,
      overMaxNumber: number > this.searcher.MAX_NUMBER_MATCHES
    })
  }

  onCmdlineOpen() {
    this.searcher.currentMatch(match => match.open())
    this.searcher.clearMatches();
    this.cmdline.hide();
  }

  onCmdlineSelect() {
    this.searcher.currentMatch(match => match.select())
    this.searcher.clearMatches();
    this.cmdline.hide();
  }

  onCmdlineYank() {
    this.searcher.currentMatch(match => match.copy())
    this.searcher.clearMatches();
    this.cmdline.hide();
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

}

new ContentCorrespondent().start();
