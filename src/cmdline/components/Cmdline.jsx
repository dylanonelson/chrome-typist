import React from 'react';

import './reset.css';
import Browse from './Browse.jsx';
import Query from './Query.jsx';
import SearchInfo from './SearchInfo.jsx';

class Cmdline extends React.Component { /* eslint react/prefer-stateless-function: 0 */

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
          onInput={(e) => {
            this.props.onQuery(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              this.props.onQuerySubmit();
            }
            if (e.getModifierState('Control')) {
              switch (e.key) {
                case 'p':
                  this.props.onCommand('back');
                  break;
                case 'n':
                  this.props.onCommand('forward');
                  break;
                default:
                  // do nothing
              }
            }
          }}
        />
        <SearchInfo
          currentMatch={currentMatch}
          infoColor={settings.infoColor}
          numberOfMatches={searchResults.numberOfMatches}
          overMaxNumber={searchResults.overMaxNumber}
          warningColor={settings.warningColor}
        />
        <Browse
          onNext={this.props.onBrowseNext}
          onOpen={this.props.onBrowseOpen}
          onPrevious={this.props.onBrowsePrevious}
          onSelect={this.props.onBrowseSelect}
          onYank={this.props.onBrowseYank}
        />
      </main>
    );
  }

}

Cmdline.propTypes = {
  currentMatch: React.PropTypes.string,
  mode: React.PropTypes.string,
  onBrowseNext: React.PropTypes.func,
  onBrowseOpen: React.PropTypes.func,
  onBrowsePrevious: React.PropTypes.func,
  onBrowseSelect: React.PropTypes.func,
  onBrowseYank: React.PropTypes.func,
  onCommand: React.PropTypes.func,
  onQuery: React.PropTypes.func,
  onQuerySubmit: React.PropTypes.func,
  searchResults: React.PropTypes.string,
  settings: React.PropTypes.object,
  store: React.PropTypes.object,
};

export default Cmdline;
