import React from 'react';

const Browse = ({ onKeyDown }) => (
  <input
    id="browse"
    onKeyDown={onKeyDown}
    style={{
      clear: 'both',
      display: 'block',
    }}
  />
);

Browse.propTypes = {
  onKeyDown: React.PropTypes.func,
};

export default Browse;
