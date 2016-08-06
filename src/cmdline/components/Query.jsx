import React from 'react'
import ReactDOM from 'react-dom'

class Query extends React.Component {
  render() {
    return (
      <label
        htmlFor="query-input"
        style={{
          display: 'block',
          float: 'left',
          width: '90%'
        }}
      >
        <span
          style={{
            display: 'block',
            float: 'left',
            textAlign: 'right',
            width: '10%'
          }}
         >/ </span>
        <input
          ref="input"
          onInput={(e) => {
            this.setState({
              value: e.target.value
            });

            this.props.onInput(e);
          }}
          onKeyDown={this.props.onKeyDown}
          style={{
            boxSizing: 'border-box',
            display: 'block',
            float: 'left',
            font: 'inherit',
            lineHeight: '20px',
            marginBottom: 38,
            padding: '0 10px',
            width: '90%'
          }}
        />
      </label>
    )
  }
}

export default Query
