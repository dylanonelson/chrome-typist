import './cmdline.css';
import Cmdline from './Cmdline.jsx'
import Correspondent from '../messaging/Correspondent';
import Messenger from '../messaging/Messenger';
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

const initialState = {
  currentMatch: null,
  mode: 'INACTIVE',
  searchResults: {},
  settings: {}
}

const store = createStore((previous, action) => {
  switch (action.type) {
    case 'UPDATE_SETTINGS':
      return Object.assign({}, previous, {
        settings: action.settings
      });
    case 'CHANGE_MODE':
      return Object.assign({}, previous, {
        mode: action.mode
      });
    case 'UPDATE_SEARCH_RESULTS':
      return Object.assign({}, previous, {
        searchResults: action.searchResults
    })
    default:
      return previous;
  }
}, initialState)

class CmdlineCorrespondent extends Correspondent {

  render() {
    ReactDOM.render(
      <Cmdline
        {...store.getState()}
        onQueryKeyUp={(e) => {
          this.sendMessage('content', 'query', this.query.value);
          if (e.which === 13) {
            this.sendMessage('content', 'browse', 'current');
            document.getElementById('browse').focus();
          }
        }}
        onBrowseKeyUp={(e) => {
          if (e.which === 78 && !e.getModifierState('Shift')) {
            this.sendMessage('content', 'browse', 'next');
          }
          if (e.which === 78 && e.getModifierState('Shift')) {
            this.sendMessage('content', 'browse', 'previous');
          }
          if (e.which === 13 && !e.getModifierState('Shift')) {
            this.sendMessage('content', 'select');
          }
          if (e.which === 13 && e.getModifierState('Shift')) {
            this.sendMessage('content', 'open');
          }
          if (e.which === 89) {
            this.sendMessage('content', 'yank');
          }
        }}
      />,
      document.getElementById('root')
    );
  }

  start() {
    document.addEventListener('DOMContentLoaded', this.render.bind(this));
    store.subscribe(this.render.bind(this));

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

  get info() {
    return document.getElementById('info')
  }

  get numberOfMatches() {
    return document.getElementById('number-of-matches');
  }

  get currentMatch() {
    return document.getElementById('current-match');
  }

  // Name property is used by the messenger object.
  get name() {
    return 'cmdline'
  }

  get query() {
    return document.getElementById('query');
  }

  blurInput() {
    this.query.blur();
  }

  focusInput() {
    this.currentMatch.innerHTML = '';

    setTimeout(function () {
      this.query.select();
    }.bind(this), 10);
  }

  onCurrentMatch(nodeName) {
    this.currentMatch.innerHTML = `&lt;${nodeName.toLowerCase()}&gt;`;
  }

  onCommandExit() {
    store.dispatch({
      type: 'CHANGE_MODE',
      mode: 'INACTIVE'
    })
    this.sendMessage('content', 'mode:inactive');
    this.blurInput();
  }

  onCommandCmdline() {
    store.dispatch({
      type: 'CHANGE_MODE',
      mode: 'REGEX'
    });
    this.sendMessage('content', 'mode:regex');
    this.focusInput();
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
