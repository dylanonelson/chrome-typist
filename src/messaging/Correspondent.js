var Messenger = require('./Messenger.js');

module.exports = class Correspondent {

  constructor() {
    this.messenger = new Messenger({ correspondent: this });
    this.messenger.start();
  }

  trigger(action, args) {
    let pieces = action.split(':');
    let methodName = 'on';

    for (var piece of pieces) {
      methodName = methodName +
        (piece.slice(0, 1).toUpperCase() + piece.slice(1, piece.length));
    }

    if (typeof methodName === 'string')
      return this[methodName].call(this, args);
  }

  sendMessage(to, data) {
    this.messenger.sendMessage(to, data);
  }

}
