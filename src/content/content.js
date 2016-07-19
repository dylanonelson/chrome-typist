import './content.css';
import Correspondent from '../messaging/Correspondent';
import DOMSearcher from '../search/DOMSearcher';
import Messenger from '../messaging/Messenger';

const displayedStyle = 'display:block;'
const hiddenStyle = 'display:none;'

var vimClickIframe;

class ContentCorrespondent extends Correspondent {

  start() {
    this.buildIframe();
    this.searcher = new DOMSearcher();
  }

  get name() {
    return 'content';
  }

  buildIframe() {
    vimClickIframe = document.createElement('iframe');
    vimClickIframe.setAttribute('src', `chrome-extension://${chrome.runtime.id}/dist/cmdline.html`);
    vimClickIframe.setAttribute('style', hiddenStyle);
    vimClickIframe.setAttribute('id', 'typist-cmdline');
    document.body.appendChild(vimClickIframe);
  }

  onBackgroundShow() {
    this.activateCmdline();
  }

  onBackgroundHide() {
    this.hideCmdline();
  }

  onQuery(value) {
    this.searcher.search(value);
  }

  onCmdlineBrowse() {
    this.searcher.focusMatch();
  }

  onCmdlineNext() {
    this.searcher.focusMatch('previous');
  }

  onCmdlinePrevious() {
    this.search.focusMatch('next');
  }

  activateCmdline() {
    vimClickIframe.setAttribute('style', displayedStyle);
    vimClickIframe.focus();
  }

  hideCmdline() {
    vimClickIframe.setAttribute('style', hiddenStyle);
  }

}

new ContentCorrespondent().start();
