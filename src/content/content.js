import CmdlineIframe from 'iframe/iframe';
import Commands from 'commands';
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

  browse(which) {
    this.searcher.currentMatch(match => match.unfocus());
    this.searcher[`${which}Match`](match => match.focus());
    this.sendCurrentMatch();
  }

  onCmdlineCommand(command) {
    switch (command) {
      case Commands.BACK: {
        window.history.back();
        break;
      }
      case Commands.BROWSE_FIRST: {
        this.browse('current');
        break;
      }
      case Commands.BROWSE_LAST: {
        this.browse('previous');
        break;
      }
      case Commands.BROWSE_NEXT: {
        this.browse('next');
        break;
      }
      case Commands.BROWSE_PREVIOUS: {
        this.browse('previous');
        break;
      }
      case Commands.FOCUS_NEXT_SIBLING: {
        this.searcher.currentMatch(match => match.focusNextSibling());
        this.sendCurrentMatch();
        break;
      }
      case Commands.FOCUS_PREVIOUS_SIBLING: {
        this.searcher.currentMatch(match => match.focusPreviousSibling());
        this.sendCurrentMatch();
        break;
      }
      case Commands.FOCUS_CHILD: {
        this.searcher.currentMatch(match => match.focusChild());
        this.sendCurrentMatch();
        break;
      }
      case Commands.FOCUS_PARENT: {
        this.searcher.currentMatch(match => match.focusParent());
        this.sendCurrentMatch();
        break;
      }
      case Commands.FORWARD: {
        window.history.forward();
        break;
      }
      case Commands.OPEN: {
        this.searcher.currentMatch(match => match.open());
        break;
      }
      case Commands.SELECT: {
        this.searcher.currentMatch(match => match.select());
        break;
      }
      case Commands.SOFT_SELECT: {
        this.searcher.currentMatch(match => match.softSelect());
        break;
      }
      case Commands.YANK: {
        this.searcher.currentMatch(match => match.copy());
        break;
      }
      case Commands.YANK_META: {
        this.searcher.currentMatch(match => match.softYank());
        break;
      }
      default: {
        // do nothing
      }
    }
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

  onCommandExit() {
    if (document.activeElement) {
      document.activeElement.blur();
    }
  }

  sendCurrentMatch() {
    this.searcher.currentMatch((match) => {
      this.sendMessage('cmdline', 'browse:current', match.nodeName);
    });
  }

}

new ContentCorrespondent().start();
