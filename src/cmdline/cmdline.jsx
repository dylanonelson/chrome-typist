import React from 'react';
import ReactDOM from 'react-dom';
import Correspondent from 'messaging/Correspondent';
import Cmdline from './components/Cmdline.jsx';
import store from './store';

class CmdlineCorrespondent extends Correspondent {

  render() {
    ReactDOM.render(
      <Cmdline
        {...store.getState()}
        onQuery={() => {
          this.sendMessage('content', 'query', store.getState().query);
        }}
        onQueryCommand={(e) => {
          if (e.keyCode === 13) {
            this.sendMessage('content', 'browse', 'current');
            store.dispatch({
              type: 'CHANGE_MODE',
              mode: 'BROWSE',
            });
          }
        }}
        onBrowseCommand={(e) => {
          switch (e.keyCode) {
            case 78:
              this.sendMessage(
                'content',
                'browse',
                (e.getModifierState('Shift') ? 'previous' : 'next')
              );
              break;
            case 13:
              this.sendMessage(
                'content',
                (e.getModifierState('Shift') ? 'open' : 'select')
              );
              store.dispatch({
                type: 'CHANGE_MODE',
                mode: 'INACTIVE',
              });
              break;
            case 89:
              this.sendMessage('content', 'yank');
              store.dispatch({
                type: 'CHANGE_MODE',
                mode: 'INACTIVE',
              });
              break;
            default:
              // do nothing
          }
        }}
        store={store}
      />,
      document.getElementById('root')
    );
  }

  start() {
    document.addEventListener('DOMContentLoaded', () => this.render());
    store.subscribe(() => this.render());

    chrome.storage.sync.get([
      'fontFamily',
      'backgroundColor',
      'infoColor',
      'textColor',
      'warningColor',
    ], (items) => {
      store.dispatch({
        type: 'UPDATE_SETTINGS',
        settings: items,
      });
    });
  }

  // Name property is used by the messenger object.
  get name() {
    return 'cmdline';
  }

  onCommandCmdline() {
    store.dispatch({
      type: 'CHANGE_MODE',
      mode: 'REGEX',
    });

    this.sendMessage('content', 'mode:regex');
    this.sendMessage('content', 'query', store.getState().query);
  }

  onCommandExit() {
    store.dispatch({
      type: 'CHANGE_MODE',
      mode: 'INACTIVE',
    });

    this.sendMessage('content', 'mode:inactive');
  }

  onBrowseCurrent(nodeName) {
    store.dispatch({
      type: 'UPDATE_CURRENT_MATCH',
      currentMatch: nodeName,
    });
  }

  onSearchResult({ numberOfMatches, overMaxNumber }) {
    store.dispatch({
      type: 'UPDATE_SEARCH_RESULTS',
      searchResults: {
        numberOfMatches,
        overMaxNumber,
      },
    });
  }

}

new CmdlineCorrespondent().start();
