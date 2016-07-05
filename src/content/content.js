require('./content.css');
var Messenger = require('../messaging/Messenger');
var Correspondent = require('../messaging/Correspondent');
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
    vimClickIframe.setAttribute('src', 'chrome-extension://pfginjoddahjoklagemdmajifkjdaafn/dist/cmdline.html');
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

  onBackgroundQuery(value) {
  }

  onQuery(value) {
    console.log(value);
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
