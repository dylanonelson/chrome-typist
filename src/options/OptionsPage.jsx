import React from 'react';
import Option from './Option.jsx';

const OptionsPage = ({ settings, store, onSave }) => (
  <main>
    <h1>Options</h1>

    {Object.keys(settings).map(setting => {
      let settingValue = settings[setting];
      return (
        <Option
          key={setting}
          name={setting}
          rowHeight={24}
          store={store}
          value={settingValue}
        />
      );
    })}

    <button
      id="save"
      onClick={onSave}
      style={{
        margin: 'auto',
        width: 50,
      }}
    >Save</button>
  </main>
);

OptionsPage.propTypes = {
  onSave: React.PropTypes.func,
  settings: React.PropTypes.object,
  store: React.PropTypes.object,
};

export default OptionsPage;
