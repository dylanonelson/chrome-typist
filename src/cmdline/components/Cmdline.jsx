import React from 'react';

import './reset.css';
import Browse from './Browse.jsx';
import Commands from '../Commands';
import Query from './Query.jsx';
import SearchInfo from './SearchInfo.jsx';

class Cmdline extends React.Component { /* eslint react/prefer-stateless-function: 0 */

  constructor() {
    super();
    this.handleBrowseKeyDown = this.handleBrowseKeyDown.bind(this);
    this.handleQueryKeyDown = this.handleQueryKeyDown.bind(this);
  }

  handleBrowseKeyDown(e) {
    let command = null;

    switch (e.keyCode) {
      case 78:
        command = (
          e.getModifierState('Shift') ?
            Commands.BROWSE_PREVIOUS :
            Commands.BROWSE_NEXT
        );
        break;
      case 13:
        command = (
          e.getModifierState('Shift') ?
            Commands.OPEN :
            Commands.SELECT
        );
        break;
      case 89:
        command = Commands.YANK;
        break;
      default:
        // do nothing
    }

    if (command) { this.props.onCommand(command); }
  }

  handleQueryKeyDown(e) {
    let command = null;
    if (e.key === 'Enter') {
      command = (
        e.getModifierState('Shift') ?
          Commands.BROWSE_LAST :
          Commands.BROWSE_FIRST
      );
    }
    if (e.getModifierState('Control')) {
      switch (e.key) {
        case 'p':
          command = Commands.BACK;
          break;
        case 'n':
          command = Commands.FORWARD;
          break;
        default:
          // do nothing
      }
    }
    if (command) {
      this.props.onCommand(command);
    } else {
      this.props.onQuery(e.target.value);
    }
  }

  render() {
    const store = this.props.store;
    const { currentMatch, mode, searchResults, settings } = store.getState();

    return (
      <main
        style={{
          backgroundColor: settings.backgroundColor || '#eee',
          borderTop: `2px solid ${settings.borderColor || '#444'}`,
          bottom: 0,
          boxShadow: `0 0 3px 0 ${settings.borderColor || '#444'}`,
          boxSizing: 'border-box',
          color: settings.textColor,
          display: (mode === 'INACTIVE' ? 'none' : 'block'),
          fontFamily: settings.fontFamily || 'monospace',
          fontSize: 16,
          height: 70,
          left: 0,
          padding: 10,
          position: 'fixed',
          right: 0,
          width: '100%',
        }}
      >
        <Query
          onKeyDown={this.handleQueryKeyDown}
        />
        <SearchInfo
          currentMatch={currentMatch}
          infoColor={settings.infoColor}
          numberOfMatches={searchResults.numberOfMatches}
          overMaxNumber={searchResults.overMaxNumber}
          warningColor={settings.warningColor}
        />
        <Browse
          onKeyDown={this.handleBrowseKeyDown}
        />
      </main>
    );
  }

}

Cmdline.propTypes = {
  onCommand: React.PropTypes.func,
  onQuery: React.PropTypes.func,
  store: React.PropTypes.object,
};

export default Cmdline;
