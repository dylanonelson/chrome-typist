import './cmdline.css';
import Correspondent from '../messaging/Correspondent';
import Messenger from '../messaging/Messenger';
import main from './main.html';

class CmdlineCorrespondent extends Correspondent {

  start() {
    document.addEventListener('DOMContentLoaded', this.setupCmdline);
    document.addEventListener('DOMContentLoaded', this.listenForInput.bind(this));
  }

  // Name property is used by the messenger object.
  get name() {
    return 'cmdline'
  }

  get query() {
    return document.getElementById('query');
  }

  onBackgroundShow() {
    this.focusInput();
  }

  onBackgroundHide() {
    this.blurInput();
  }

  setupCmdline() {
    document.body.appendChild(main);
  }

  listenForInput() {
    this.query.addEventListener('keyup', (e) => {
      this.sendMessage('content', 'query', this.query.value)
      if (e.which === 13) {
        this.sendMessage('content', 'browse');
        document.getElementById('browse').focus();
      }
    })

    document.getElementById('browse').addEventListener('keyup', (e) => {
      if (e.which === 78 && !e.getModifierState('Shift')) {
        this.sendMessage('content', 'next');
      }
      if (e.which === 78 && e.getModifierState('Shift')) {
        this.sendMessage('content', 'previous');
      }
    })
  }

  focusInput() {
    setTimeout(function () {
      this.query.focus();
    }.bind(this), 0);
  }

  blurInput() {
    this.query.blur();
  }

}

new CmdlineCorrespondent().start();
