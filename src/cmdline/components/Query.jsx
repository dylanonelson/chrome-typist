import React from 'react';

const Query = ({ onKeyDown, onChange }) => (
  <label
    htmlFor="query-input"
    style={{
      display: 'block',
      float: 'left',
      width: '90%',
    }}
  >
    <span
      style={{
        display: 'block',
        float: 'left',
        textAlign: 'right',
        width: '10%',
      }}
    >/ </span>
    <input
      id="query"
      onKeyDown={onKeyDown}
      onChange={onChange}
      style={{
        boxSizing: 'border-box',
        display: 'block',
        float: 'left',
        font: 'inherit',
        lineHeight: '20px',
        marginBottom: 38,
        padding: '0 10px',
        width: '90%',
      }}
    />
  </label>
);

Query.propTypes = {
  onKeyDown: React.PropTypes.func,
  onChange: React.PropTypes.func,
};

export default Query;
