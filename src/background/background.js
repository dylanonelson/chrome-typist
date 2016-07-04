var Correspondent = require('../messaging/Correspondent');

class BackgroundCorrespondent extends Correspondent {

  constructor() {
    super();
    this.showing = true;
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

new BackgroundCorrespondent();
