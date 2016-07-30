import OptionsPage from './OptionsPage.jsx'
import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'

const SETTING_TYPES = [
  'backgroundColor',
  'borderColor',
  'font'
]

const store = createStore((previous, action) => {
  return {
    settings: SETTING_TYPES.reduce((state, type) => {
      state[type] = action[type] || previous.settings[type]
      return state;
    }, {})
  }
}, {
  // Fetching current settings is async, so set an empty object for now.
  settings: {}
});

document.addEventListener('DOMContentLoaded', () => {

  let root = document.createElement('div');
  document.body.appendChild(root);

  chrome.storage.sync.get(SETTING_TYPES, (items) => {
    let action = Object.assign({}, {
        type: 'UPDATE_SETTING'
    }, items);
    store.dispatch(action);
  })

  store.subscribe(() => {
    console.log(store.getState().settings);
    ReactDOM.render(
      <OptionsPage
        onSave={() => {
          chrome.storage.sync.set(store.getState().settings);
        }}
        settings={store.getState().settings}
        store={store}
      />,
      root
    );
  })
});
