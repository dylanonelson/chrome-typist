var Correspondent = require('../messaging/Correspondent');
var Dispatcher = require('../messaging/Dispatcher');

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
    this.sendMessage('content', {
      message: 'background:query',
      info: value
    })
  }

  onCommandCmdline() {
    if (this.showing) {
      var message = 'background:hide';
      this.showing = false;
    } else {
      var message = 'background:show';
      this.showing = true;
    }

    this.sendMessage('content', { message: message });
    this.sendMessage('cmdline', { message: message });
  }

}

new BackgroundCorrespondent().start();
