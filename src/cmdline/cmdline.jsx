import React from 'react';
import ReactDOM from 'react-dom';
import Correspondent from 'messaging/Correspondent';
import Cmdline from './components/Cmdline.jsx';
import store from './store';

class CmdlineCorrespondent extends Correspondent {

  // ============
  // MESSAGING ID
  // ============
  get name() {
    return 'cmdline';
  }

  // ====================
  // REACT EVENT HANDLERS
  // ====================
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
    // TODO: Handle async more elegantly here
    //
    // The listener in the content script fires asynchronously. The following
    // code depends on that handler's code, which focuses the iframe, being
    // added to the queue before the setTimeout callback, which focuses the
    // input inside the iframe.
    this.sendMessage('content', 'mode:regex');
    this.sendMessage('content', 'query', store.getState().query);

    store.dispatch({
      type: 'CHANGE_MODE',
      mode: 'REGEX',
    });

    setTimeout(() => document.getElementById('query').select(), 0);
  }

  onCommandExit() {
    this.sendMessage('content', 'mode:inactive');

    store.dispatch({
      type: 'CHANGE_MODE',
      mode: 'INACTIVE',
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

  // =====================
  // PAGE SETUP AND RENDER
  // =====================
  render() {
    ReactDOM.render(
      <Cmdline
        onQuery={(query) => this.handleQuery(query)}
        onQuerySubmit={() => this.handleQuerySubmit()}
        onBrowseNext={() => this.handleBrowseNext()}
        onBrowseOpen={() => this.handleBrowseOpen()}
        onBrowsePrevious={() => this.handleBrowsePrevious()}
        onBrowseSelect={() => this.handleBrowseSelect()}
        onBrowseYank={() => this.handleBrowseYank()}
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
