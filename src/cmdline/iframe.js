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

  blur() {
    this.node.blur();
  }

  focus() {
    this.node.focus();
  }

}

export default CmdlineIframe
