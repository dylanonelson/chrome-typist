import React from 'react'
import ReactDOM from 'react-dom'

const Cmdline = ({ mode, onBrowseKeyUp, onQueryKeyUp, searchResults, settings }) => {
  return (
    <main
      style={{
        backgroundColor: settings.backgroundColor,
        border: `2px solid ${settings.borderColor}`,
        boxShadow: `0 0 3px 0 ${settings.borderColor}`,
        color: settings.textColor,
        display: (mode === 'INACTIVE' ? 'none' : 'block'),
        fontFamily: settings.fontFamily
      }}
    >
      <label htmlFor="query">/ </label>
      <input
        id="query"
        onKeyUp={onQueryKeyUp}
      />
      <div id="info">
        <span
          id="number-of-matches"
          style={{
            color: (searchResults.overMaxNumber ? (settings.warningColor || 'red') : '')
          }}
        >{searchResults.numberOfMatches}</span>
        <span id="current-match"></span>
      </div>
      <input
        id="browse"
        onKeyUp={onBrowseKeyUp}
      />
    </main>
  )
}

export default Cmdline
