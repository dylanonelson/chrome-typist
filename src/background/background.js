import Correspondent from '../messaging/Correspondent';
import Dispatcher from '../messaging/Dispatcher';

class BackgroundCorrespondent extends Correspondent {

  start() {
    this.showing = true;
    this.dispatcher = new Dispatcher({ correspondent: this });
    this.dispatcher.start();
  }

  get name() {
    return 'background';
  }

  get showing() {
    return this._showing;
  }

  set showing(showing) {
    this._showing = showing;
    return this;
  }

  onCmdlineQuery(value) {
    this.sendMessage('content', 'query', value)
  }

  onCommandCmdline() {
    if (this.showing) {
      var message = 'hide';
      this.showing = false;
    } else {
      var message = 'show';
      this.showing = true;
    }

    this.sendMessage('content', message);
    this.sendMessage('cmdline', message);
  }

}

new BackgroundCorrespondent().start();
