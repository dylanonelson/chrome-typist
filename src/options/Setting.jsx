import './setting.css'
import React from 'react'
import ReactDOM from 'react-dom'

class Setting extends React.Component {

  render() {
    return (
      <div
        className="setting clearfix"
        style={{
          display: 'block',
          height: this.props.rowHeight,
          lineHeight: `${this.props.rowHeight}px`,
          marginBottom: this.props.rowHeight * 0.35
        }}
      >
        <label
          style={{
            boxSizing: 'border-box',
            display: 'block',
            height: 'inherit',
            lineHeight: 'inherit',
            float: 'left',
            paddingRight: 10,
            textAlign: 'right',
            width: '40%'
          }}
          htmlFor={this.props.name}
        >
          {`${this.props.name[0].toUpperCase()}${this.props.name.slice(1, this.props.name.length)}`}
        </label>
        <input
          id={this.props.name}
          onChange={(e) => {
            e.preventDefault();
            this.props.store.dispatch({
              type: 'UPDATE_SETTING',
              [this.props.name]: this.refs.input.value
            })
          }}
          ref="input"
          style={{
            boxSizing: 'border-box',
            display: 'block',
            height: this.props.rowHeight,
            lineHeight: `${this.props.rowHeight}px`,
            float: 'right',
            width: '60%'
          }}
        />
      </div>
    )
  }

}

export default Setting
