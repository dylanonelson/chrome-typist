import React from 'react'

class SearchInfo extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'block',
          float: 'left',
          font: 'inherit',
          lineHeight: '20px',
          width: '10%'
        }}
      >
        <span
          style={{
            color: (this.props.overMaxNumber ?
                     (this.props.warningColor || 'red') : ''),
            paddingRight: 10
          }}
        >{this.props.numberOfMatches}</span>
        <span
          style={{
            color: this.props.infoColor || 'blue'
          }}
        >{this.props.currentMatch ?
          `<${this.props.currentMatch.toLowerCase()}>` : ''}</span>
      </div>
    )
  }
}

export default SearchInfo
