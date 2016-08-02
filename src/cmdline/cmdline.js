import Cmdline from './components/Cmdline.jsx'
import Correspondent from '../messaging/Correspondent';
import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'

class CmdlineCorrespondent extends Correspondent {

  render() {
    ReactDOM.render(
      <Cmdline
        {...store.getState()}
        onQueryInput={(e) => {
          this.sendMessage('content', 'query', this.query.value);
        }}
        onQueryKeyDown={(e) => {
          if (e.which === 13) {
            this.sendMessage('content', 'browse', 'current');
            this.browse.focus();
          }
        }}
        onBrowseKeyDown={(e) => {
          switch (e.which) {
            case 78:
              let data = (e.getModifierState('Shift') ? 'previous' : 'next');
              this.sendMessage('content', 'browse', data);
              break;
            case 13:
              let msg = (e.getModifierState('Shift') ? 'open' : 'select');
              this.sendMessage('content', msg);
              break;
            case 89:
              this.sendMessage('content', 'yank');
              break;
          }
        }}
      />,
      document.getElementById('root')
    );
  }

  start() {
    document.addEventListener('DOMContentLoaded', () => this.render());
    store.subscribe(() => this.render())

    chrome.storage.sync.get([
      'fontFamily',
      'backgroundColor',
      'infoColor',
      'textColor',
      'warningColor'
    ], (items) => {
      store.dispatch({
        type: 'UPDATE_SETTINGS',
        settings: items
      });
    });
  }

  get browse() {
    return document.getElementById('browse');
  }

  get currentMatch() {
    return document.getElementById('current-match');
  }

  get info() {
    return document.getElementById('info')
  }

  // Name property is used by the messenger object.
  get name() {
    return 'cmdline'
  }

  get numberOfMatches() {
    return document.getElementById('number-of-matches');
  }

  get query() {
    return document.getElementById('query');
  }

  onCommandCmdline() {
    store.dispatch({
      type: 'CHANGE_MODE',
      mode: 'REGEX'
    });

    this.sendMessage('content', 'mode:regex');
    // Must use setTimeout or query will not get focus
    setTimeout(() => { this.query.select() }, 0)
  }

  onCommandExit() {
    store.dispatch({
      type: 'CHANGE_MODE',
      mode: 'INACTIVE'
    })

    this.sendMessage('content', 'mode:inactive');
    this.query.blur();
  }

  onCurrentMatch(nodeName) {
    store.dispatch({
      type: 'UPDATE_CURRENT_MATCH',
      currentMatch: nodeName
    })
  }

  onSearchResult({ numberOfMatches, overMaxNumber }) {
    store.dispatch({
      type: 'UPDATE_SEARCH_RESULTS',
      searchResults: {
        numberOfMatches: numberOfMatches,
        overMaxNumber: overMaxNumber
      }
    })
  }

}

new CmdlineCorrespondent().start();
