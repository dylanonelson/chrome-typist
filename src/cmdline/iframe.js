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

    chrome.storage.sync.get('borderColor', (item) => {
      if (item.borderColor) {
        this.node.style.border = `2px solid ${item.borderColor}`;
        this.node.style['box-shadow'] = `0 0 3px 0 ${item.borderColor}`;
      }
    })

    document.body.appendChild(this.node);
  }

  hide() {
    this.node.className = 'hidden';
    this.node.blur();
    this.showing = false;
  }

  show() {
    this.node.className = 'showing';
    this.node.focus();
    this.showing = true;
  }

}

export default CmdlineIframe
