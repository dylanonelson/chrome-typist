import './cmdline.css';
import Cmdline from './Cmdline.jsx'
import Correspondent from '../messaging/Correspondent';
import Messenger from '../messaging/Messenger';
import React from 'react'
import ReactDOM from 'react-dom'

const settings = {
}

class CmdlineCorrespondent extends Correspondent {

  start() {
    document.addEventListener('DOMContentLoaded', () => {

      let root = document.createElement('div');
      document.body.appendChild(root);

      chrome.storage.sync.get([
        'fontFamily',
        'backgroundColor',
        'infoColor',
        'textColor',
        'warningColor'
      ], (items) => {

        Object.assign(settings, items);

        ReactDOM.render(
          <Cmdline
            settings={settings}
            onQueryKeyUp={(e) => {
              this.sendMessage('content', 'query', this.query.value);
              if (e.which === 13) {
                this.sendMessage('content', 'browse', 'current');
                document.getElementById('browse').focus();
              }
            }}
            onBrowseKeyUp={(e) => {
              if (e.which === 78 && !e.getModifierState('Shift')) {
                this.sendMessage('content', 'browse', 'next');
              }
              if (e.which === 78 && e.getModifierState('Shift')) {
                this.sendMessage('content', 'browse', 'previous');
              }
              if (e.which === 13 && !e.getModifierState('Shift')) {
                this.sendMessage('content', 'select');
              }
              if (e.which === 13 && e.getModifierState('Shift')) {
                this.sendMessage('content', 'open');
              }
              if (e.which === 89) {
                this.sendMessage('content', 'yank');
              }
            }}
          />,
          root
        );

      })
    });
  }

  get info() {
    return document.getElementById('info')
  }

  get numberOfMatches() {
    return document.getElementById('number-of-matches');
  }

  get currentMatch() {
    return document.getElementById('current-match');
  }

  // Name property is used by the messenger object.
  get name() {
    return 'cmdline'
  }

  get query() {
    return document.getElementById('query');
  }

  blurInput() {
    this.query.blur();
  }

  focusInput() {
    this.currentMatch.innerHTML = '';

    setTimeout(function () {
      this.query.select();
    }.bind(this), 0);
  }

  onCurrentMatch(nodeName) {
    this.currentMatch.innerHTML = `&lt;${nodeName.toLowerCase()}&gt;`;
  }

  onHide() {
    this.blurInput();
  }

  onSearch({ numberOfMatches, overMaxNumber }) {
    this.numberOfMatches.innerHTML = numberOfMatches;
    this.numberOfMatches.style.color =
      (overMaxNumber ? settings.warningColor || 'red' : '');
  }

  onShow() {
    this.focusInput();
  }

}

new CmdlineCorrespondent().start();
