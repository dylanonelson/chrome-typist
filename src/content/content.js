import CmdlineIframe from 'iframe/iframe';
import Correspondent from 'messaging/Correspondent';
import DOMSearcher from 'search/DOMSearcher';

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
      this.sendMessage('cmdline', 'browse:current', match.nodeName);
    });
  }

  onCmdlineQuery(value) {
    const number = this.searcher.search(value);
    this.sendMessage('cmdline', 'search:result', {
      numberOfMatches: number,
      overMaxNumber: number > this.searcher.MAX_NUMBER_MATCHES,
    });
  }

  onCmdlineModeInactive() {
    this.searcher.clearMatches();
    this.sendMessage('cmdline', 'browse:current', null);
    this.cmdline.hide();
    this.cmdline.blur();
  }

  onCmdlineModeRegex() {
    this.cmdline.show();
    this.cmdline.focus();
    this.sendMessage('cmdline', 'focus');
  }

  onCmdlineOpen() {
    this.searcher.currentMatch(match => match.open());
    this.onCmdlineModeInactive();
  }

  onCmdlineSelect() {
    this.searcher.currentMatch(match => match.select());
    this.onCmdlineModeInactive();
  }

  onCmdlineYank() {
    this.searcher.currentMatch(match => match.copy());
    this.onCmdlineModeInactive();
  }

  onCommandExit() {
    if (document.activeElement) {
      document.activeElement.blur();
    }
  }

}

new ContentCorrespondent().start();
