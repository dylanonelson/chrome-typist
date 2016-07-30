import React from 'react'
import ReactDOM from 'react-dom'

const Cmdline = ({ onBrowseKeyUp, onQueryKeyUp, settings }) => {
  return (
    <main
      style={{
        fontFamily: settings.fontFamily,
        backgroundColor: settings.backgroundColor,
        color: settings.textColor
      }}
    >
      <label htmlFor="query">/ </label>
      <input
        id="query"
        onKeyUp={onQueryKeyUp}
      />
      <div id="info">
        <span id="number-of-matches"></span>
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
