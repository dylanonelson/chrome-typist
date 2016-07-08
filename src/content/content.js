require('./content.css');
var Messenger = require('../messaging/Messenger');
var Correspondent = require('../messaging/Correspondent');
var DOMSearcher = require('../search/DOMSearcher');
const hiddenStyle = 'display:none;'
const displayedStyle = 'display:block;'

var vimClickIframe;

class ContentCorrespondent extends Correspondent {

  start() {
    this.buildIframe();
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
    new DOMSearcher(value).start();
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
