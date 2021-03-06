import Messenger from './Messenger';

class Correspondent {

  constructor() {
    this.messenger = new Messenger({ correspondent: this });
    this.messenger.start();
  }

  trigger(action, args) {
    const pieces = action.split(':');
    let piece;

    while (pieces.length >= 1) {
      let methodName = 'on';
      for (piece of pieces) {
        methodName +=
          (piece.slice(0, 1).toUpperCase() + piece.slice(1, piece.length));
      }
      this.tryMethod(methodName, args);
      pieces.shift();
    }
  }

  sendMessage(to, message, data) {
    this.messenger.sendMessage(to, message, data);
  }

  tryMethod(name, args) {
    if (
      typeof name === 'string' &&
      typeof this[name] === 'function'
    ) {
      this[name].call(this, args);
    }
  }

}

export default Correspondent;
