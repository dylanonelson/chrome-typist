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
    this.node.style = 'display:none';
    this.showing = false;
  }

  show() {
    this.node.style = 'display:block';
    this.node.focus();
    this.showing = true;
  }

}

export default CmdlineIframe
