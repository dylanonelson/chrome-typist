import Correspondent from 'messaging/Correspondent';
import Dispatcher from 'messaging/Dispatcher';

class BackgroundCorrespondent extends Correspondent {

  start() {
    this.dispatcher = new Dispatcher({ correspondent: this });
    this.dispatcher.start();
  }

  get name() {
    return 'background';
  }

}

new BackgroundCorrespondent().start();
