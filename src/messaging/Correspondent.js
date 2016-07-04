var Messenger = require('./Messenger.js');

module.exports = class Correspondent {

  constructor() {
    this.messenger = new Messenger({ correspondent: this });
    this.messenger.start();
  }

  trigger(action, args) {
    if (typeof action !== 'string') debugger
    let pieces = action.split(':');
    let methodName = 'on';

    for (var piece of pieces) {
      methodName = methodName +
        (piece.slice(0, 1).toUpperCase() + piece.slice(1, piece.length));
    }

    if (
      typeof methodName === 'string' &&
      typeof this[methodName] === 'function'
    )
      return this[methodName].call(this, args);
  }

  sendMessage(to, message, data) {
    this.messenger.sendMessage(to, message, data);
  }

}
