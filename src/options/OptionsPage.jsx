import React from 'react'
import ReactDOM from 'react-dom'
import Setting from './Setting.jsx'

class OptionsPage extends React.Component {
  render () {
    return (
      <main>
        <h1>Options</h1>

        {Object.keys(this.props.settings).map(setting => {
          let settingValue = this.props.settings[setting];
          return (
            <Setting
              key={setting}
              name={setting}
              rowHeight={24}
              store={this.props.store}
              value={settingValue}
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
