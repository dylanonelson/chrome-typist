import React from 'react';
import ReactDOM from 'react-dom';
import Correspondent from 'messaging/Correspondent';
import Cmdline from './components/Cmdline.jsx';
import store from './store';

class CmdlineCorrespondent extends Correspondent {

  constructor() {
    super();

    this.handleBrowseNext = this.handleBrowseNext.bind(this);
    this.handleBrowseOpen = this.handleBrowseOpen.bind(this);
    this.handleBrowsePrevious = this.handleBrowsePrevious.bind(this);
    this.handleBrowseSelect = this.handleBrowseSelect.bind(this);
    this.handleBrowseYank = this.handleBrowseYank.bind(this);
    this.handleCommand = this.handleCommand.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    this.handleQuerySubmit = this.handleQuerySubmit.bind(this);
  }

  // ============
  // MESSAGING ID
  // ============
  get name() {
    return 'cmdline';
  }

  // ====================
  // REACT EVENT HANDLERS
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
      case 'back':
        window.history.back();
        break;
      case 'forward':
        window.history.forward();
        break;
      default:
        // do nothing
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
    this.sendMessage('content', 'browse', 'current');

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
        onBrowseNext={this.handleBrowseNext}
        onBrowseOpen={this.handleBrowseOpen}
        onBrowsePrevious={this.handleBrowsePrevious}
        onBrowseSelect={this.handleBrowseSelect}
        onBrowseYank={this.handleBrowseYank}
        onCommand={this.handleCommand}
        onQuery={this.handleQuery}
        onQuerySubmit={this.handleQuerySubmit}
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
