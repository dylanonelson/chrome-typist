import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';
import OptionsPage from './OptionsPage.jsx';

const SETTING_TYPES = [
  'backgroundColor',
  'borderColor',
  'fontFamily',
  'infoColor',
  'textColor',
  'warningColor',
  'maxMatches',
];

const store = createStore((previous, action) => {
  const settings = SETTING_TYPES.reduce((state, type) => {
    state[type] = action[type] || previous.settings[type]; /* eslint no-param-reassign: 0 */
    return state;
  }, {});

  return {
    settings,
  };
}, {
  // Fetching current settings is async, so set an empty object for now.
  settings: {},
});

document.addEventListener('DOMContentLoaded', () => {
  const root = document.createElement('div');
  document.body.appendChild(root);

  chrome.storage.sync.get(SETTING_TYPES, (items) => {
    const action = Object.assign({}, {
      type: 'UPDATE_SETTING',
    }, items);
    store.dispatch(action);
  });

  store.subscribe(() => {
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
  });
});
