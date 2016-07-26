import './cmdline.css';
import Correspondent from '../messaging/Correspondent';
import Messenger from '../messaging/Messenger';
import main from './main.html';

class CmdlineCorrespondent extends Correspondent {

  start() {
    document.addEventListener('DOMContentLoaded', this.setupCmdline);
    document.addEventListener('DOMContentLoaded', this.listenForInput.bind(this));
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

  listenForInput() {
    this.query.addEventListener('keyup', (e) => {
      this.sendMessage('content', 'query', this.query.value)
      if (e.which === 13) {
        this.sendMessage('content', 'browse', 'current');
        document.getElementById('browse').focus();
      }
    })

    document.getElementById('browse').addEventListener('keyup', (e) => {
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
    })
  }

  onCurrentMatch(nodeName) {
    this.currentMatch.innerHTML = `&lt;${nodeName.toLowerCase()}&gt;`;
  }

  onHide() {
    this.blurInput();
  }

  onSearch({ numberOfMatches, overMaxNumber }) {
    this.numberOfMatches.innerHTML = numberOfMatches;
    this.numberOfMatches.className = (overMaxNumber ? 'warning' : '');
  }

  onShow() {
    this.focusInput();
  }

  setupCmdline() {
    document.body.appendChild(main);
  }

}

new CmdlineCorrespondent().start();
