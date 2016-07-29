import React from 'react'
import ReactDOM from 'react-dom'
import Setting from './Setting.jsx'

class OptionsPage extends React.Component {
  render () {
    return (
      <main>
        <h1>Options</h1>

        {this.props.settings.map(setting => {
          return (
            <Setting
              key={setting}
              name={setting}
              ref={setting}
              rowHeight={24}
              store={this.props.store}
            />
          )
        })}

        <button
          id="save"
          onClick={this.props.onSave}
          style={{
            margin: 'auto',
            width: 50
          }}
        >Save</button>
      </main>
    )
  }
}

export default OptionsPage
