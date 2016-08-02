import './cmdline.css'
import React from 'react'
import ReactDOM from 'react-dom'

class Cmdline extends React.Component {

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevProps.mode !== 'REGEX') &&
      (this.props.mode === 'REGEX')
    )
      ReactDOM.findDOMNode(this.refs.query).select();
  }

  render() {
    return (
      <main
        style={{
          backgroundColor: this.props.settings.backgroundColor,
          border: `2px solid ${this.props.settings.borderColor}`,
          boxShadow: `0 0 3px 0 ${this.props.settings.borderColor}`,
          color: this.props.settings.textColor,
          display: (this.props.mode === 'INACTIVE' ? 'none' : 'block'),
          fontFamily: this.props.settings.fontFamily
        }}
      >
        <label htmlFor="query">/ </label>
        <input
          id="query"
          ref="query"
          onInput={() => {
            this.props.store.dispatch({
              type: 'UPDATE_QUERY',
              query: this.refs.query.value
            })

            this.props.onQueryInput();
          }}
          onKeyDown={(e) => {
            this.props.onQueryKeyDown(e);
            if (e.keyCode === 13)
              ReactDOM.findDOMNode(this.refs.browse).focus();
          }}
          />
        <div id="info">
          <span
            id="number-of-matches"
            style={{
              color: (this.props.searchResults.overMaxNumber ?
                       (this.props.settings.warningColor || 'red') : '')
            }}
          >{this.props.searchResults.numberOfMatches}</span>
          <span
            id="current-match"
          >{this.props.currentMatch ? `<${this.props.currentMatch.toLowerCase()}>` : ''}</span>
        </div>
        <input
          id="browse"
          ref="browse"
          onKeyDown={this.props.onBrowseKeyDown}
        />
      </main>
    )
  }

}

export default Cmdline
