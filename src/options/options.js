import OptionsPage from './OptionsPage.jsx'
import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'

const store = createStore((previous, action) => {
  return {
    settings: {
      font: action.font || previous.settings.font,
      backgroundColor: action.backgroundColor || previous.settings.backgroundColor,
      borderColor: action.borderColor || previous.settings.borderColor
    }
  }
}, {
  settings: {
    font: 'monospace',
    backgroundColor: '#eee',
    borderColor: '#444'
  }
});

document.addEventListener('DOMContentLoaded', () => {
  let root = document.createElement('div');
  document.body.appendChild(root);

  ReactDOM.render(
    <OptionsPage
      onSave={() => {
        console.log(store.getState());
      }}
      settings={[
        'backgroundColor',
        'borderColor',
        'font'
      ]}
      store={store}
    />,
    root
  );
});
