import React from 'react';
import ReactDOM from 'react-dom';
import Correspondent from 'messaging/Correspondent';
import Commands from 'commands';
import Cmdline from './components/Cmdline.jsx';
import store from './store';

class CmdlineCorrespondent extends Correspondent {

  constructor() {
    super();
    this.handleCommand = this.handleCommand.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
  }

  // ============
  // MESSAGING ID
  // ============
  get name() {
    return 'cmdline';
  }

  // ====================
  // COMMAND HANDLERS
  // ====================
  handleCommand(command, options) {
    this.sendMessage('all', 'command', command);

    switch (command) {
      case Commands.BROWSE_FIRST: {
        this.handleQuerySubmit(true);
        break;
      }
      case Commands.BROWSE_LAST: {
        this.handleQuerySubmit(false);
        break;
      }
      case Commands.MOVE_TAB: {
        this.sendMessage('background', 'move:tab', options);
        break;
      }
      case Commands.OPEN: {
        this.inactive();
        break;
      }
      case Commands.SELECT: {
        this.inactive();
        break;
      }
      case Commands.SOFT_SELECT: {
        this.inactive();
        break;
      }
      case Commands.YANK: {
        this.inactive();
        break;
      }
      case Commands.YANK_META: {
        this.inactive();
        break;
      }
      default: {
        // do nothing
      }
    }
  }

  handleQuery(query) {
    this.sendMessage('content', 'query', query);

    store.dispatch({
      type: 'UPDATE_QUERY',
      query,
    });
  }

  handleQuerySubmit() {
    store.dispatch({
      type: 'CHANGE_MODE',
      mode: 'BROWSE',
    });

    setTimeout(() => document.getElementById('browse').select(), 0);
  }

  inactive() {
    store.dispatch({ type: 'CHANGE_MODE', mode: 'INACTIVE' });
    this.sendMessage('content', 'mode:inactive');
  }

  // =================
  // MESSAGE LISTENERS
  // =================
  onBrowseCurrent(nodeName) {
    store.dispatch({
      type: 'UPDATE_CURRENT_MATCH',
      currentMatch: nodeName,
    });
  }

  onCommandCmdline() {
    this.sendMessage('content', 'mode:regex');
    this.sendMessage('content', 'query', store.getState().query);

    store.dispatch({
      type: 'CHANGE_MODE',
      mode: 'REGEX',
    });
  }

  onCommandExit() {
    this.sendMessage('content', 'mode:inactive');

    store.dispatch({
      type: 'CHANGE_MODE',
      mode: 'INACTIVE',
    });
  }

  onContentFocus() {
    document.getElementById('query').select();
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

  // =====================
  // PAGE SETUP AND RENDER
  // =====================
  render() {
    ReactDOM.render(
      <Cmdline
        onCommand={this.handleCommand}
        onQuery={this.handleQuery}
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
}

new CmdlineCorrespondent().start();
