import './iframe.css'
import iframe from './iframe.ejs'

class CmdlineIframe {

  constructor() {
    this.node = (() => {
      let container = document.createElement('div');
      console.log(iframe());
      container.innerHTML = iframe();
      return container.childNodes[0];
    })();

    document.body.appendChild(this.node);
  }

  hide() {
    this.node.className = 'hidden';
    this.showing = false;
  }

  show() {
    this.node.className = 'showing';
    this.node.focus();
    this.showing = true;
  }

}

export default CmdlineIframe
