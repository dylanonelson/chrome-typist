import React from 'react';
import ReactDOM from 'react-dom';
import Correspondent from 'messaging/Correspondent';
import Commands from './Commands';
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
  handleBrowseNext() {
    this.sendMessage('content', 'browse', 'next');
  }

  handleBrowsePrevious() {
    this.sendMessage('content', 'browse', 'previous');
  }

  handleBrowseOpen() {
    this.sendMessage('content', 'open');
    store.dispatch({
      type: 'CHANGE_MODE',
      mode: 'INACTIVE',
    });
  }

  handleBrowseSelect() {
    this.sendMessage('content', 'select');

    store.dispatch({
      type: 'CHANGE_MODE',
      mode: 'INACTIVE',
    });
  }

  handleBrowseYank() {
    this.sendMessage('content', 'yank');

    store.dispatch({
      type: 'CHANGE_MODE',
      mode: 'INACTIVE',
    });
  }

  handleCommand(command) {
    switch (command) {
      case Commands.BACK:
        window.history.back();
        break;
      case Commands.BROWSE_FIRST:
        this.handleQuerySubmit(true);
        break;
      case Commands.BROWSE_NEXT:
        this.handleBrowseNext();
        break;
      case Commands.BROWSE_PREVIOUS:
        this.handleBrowsePrevious();
        break;
      case Commands.BROWSE_LAST:
        this.handleQuerySubmit(false);
        break;
      case Commands.FORWARD:
        window.history.forward();
        break;
      case Commands.OPEN:
        this.handleBrowseOpen();
        break;
      case Commands.SELECT:
        this.handleBrowseSelect();
        break;
      case Commands.YANK:
        this.handleBrowseYank();
        break;
      default:
        throw new Error(`Cannot handle command ${command}`);
    }
  }

  handleQuery(query) {
    this.sendMessage('content', 'query', query);

    store.dispatch({
      type: 'UPDATE_QUERY',
      query,
    });
  }

  handleQuerySubmit(first = true) {
    this.sendMessage('content', 'browse', (first ? 'current' : 'previous'));

    store.dispatch({
      type: 'CHANGE_MODE',
      mode: 'BROWSE',
    });

    setTimeout(() => document.getElementById('browse').select(), 0);
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
