import './iframe.css';
import iframe from './iframe.ejs';

class CmdlineIframe {

  constructor() {
    this.node = (() => {
      const container = document.createElement('div');
      container.innerHTML = iframe();
      return container.childNodes[0];
    })();

    document.body.appendChild(this.node);
  }

  blur() {
    this.node.blur();
  }

  hide() {
    this.node.style.height = '0';
  }

  focus() {
    this.node.focus();
  }

  show() {
    this.node.style.height = '71px';
  }

}

export default CmdlineIframe;
