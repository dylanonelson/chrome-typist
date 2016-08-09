import React from 'react';
import ReactDOM from 'react-dom';

import './reset.css';
import Browse from './Browse.jsx';
import Query from './Query.jsx';
import SearchInfo from './SearchInfo.jsx';

class Cmdline extends React.Component {

  componentDidUpdate(prevProps) {
    if (
      (prevProps.mode !== 'REGEX') &&
      (this.props.mode === 'REGEX')
    ) {
      setTimeout(
        () => ReactDOM.findDOMNode(this.refs.query.refs.input).select(),
        0
      );
    }
  }

  render() {
    return (
      <main
        style={{
          backgroundColor: this.props.settings.backgroundColor || '#eee',
          borderTop: `2px solid ${this.props.settings.borderColor || '#444'}`,
          bottom: 0,
          boxShadow: `0 0 3px 0 ${this.props.settings.borderColor || '#444'}`,
          boxSizing: 'border-box',
          color: this.props.settings.textColor,
          display: (this.props.mode === 'INACTIVE' ? 'none' : 'block'),
          fontFamily: this.props.settings.fontFamily || 'monospace',
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
            this.props.store.dispatch({
              type: 'UPDATE_QUERY',
              query: this.refs.query.refs.input.value,
            });

            this.props.onQuery(e);
          }}
          onKeyDown={(e) => {
            this.props.onQueryCommand(e);
            if (e.keyCode === 13) {
              ReactDOM.findDOMNode(this.refs.browse.refs.input).focus();
            }
          }}
          ref="query"
        />
        <SearchInfo
          currentMatch={this.props.currentMatch}
          infoColor={this.props.settings.infoColor}
          numberOfMatches={this.props.searchResults.numberOfMatches}
          overMaxNumber={this.props.searchResults.overMaxNumber}
          warningColor={this.props.settings.warningColor}
        />
        <Browse
          onKeyDown={this.props.onBrowseCommand}
          ref="browse"
        />
      </main>
    );
  }

}

export default Cmdline;
