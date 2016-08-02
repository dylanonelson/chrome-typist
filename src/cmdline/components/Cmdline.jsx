import './cmdline.css'
import React from 'react'
import ReactDOM from 'react-dom'

const Cmdline = ({ currentMatch, mode, onBrowseKeyDown, onQueryInput, onQueryKeyDown, searchResults, settings }) => {
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
        onInput={onQueryInput}
        onKeyDown={onQueryKeyDown}
        />
      <div id="info">
        <span
          id="number-of-matches"
          style={{
            color: (searchResults.overMaxNumber ? (settings.warningColor || 'red') : '')
          }}
        >{searchResults.numberOfMatches}</span>
        <span
          id="current-match"
        >{currentMatch ? `<${currentMatch.toLowerCase()}>` : ''}</span>
      </div>
      <input
        id="browse"
        onKeyDown={onBrowseKeyDown}
      />
    </main>
  )
}

export default Cmdline
