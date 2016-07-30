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
    this.sendMessage('cmdline', 'search:result', {
      numberOfMatches: number,
      overMaxNumber: number > this.searcher.MAX_NUMBER_MATCHES
    })
  }

  onCmdlineOpen() {
    this.searcher.currentMatch(match => match.open())
    this.searcher.clearMatches();
    this.cmdline.blur();
  }

  onCmdlineSelect() {
    this.searcher.currentMatch(match => match.select())
    this.searcher.clearMatches();
    this.cmdline.blur();
  }

  onCmdlineYank() {
    this.searcher.currentMatch(match => match.copy())
    this.searcher.clearMatches();
    this.cmdline.blur();
  }

  onCmdlineModeInactive() {
    this.cmdline.blur();
    this.searcher.clearMatches();
  }

  onCmdlineModeRegex() {
    this.cmdline.focus();
  }

}

new ContentCorrespondent().start();
