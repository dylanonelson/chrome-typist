import React from 'react';

const Browse = ({ onNext, onOpen, onPrevious, onSelect, onYank }) => (
  <input
    id="browse"
    onKeyDown={(e) => {
      switch (e.keyCode) {
        case 78:
          if (e.getModifierState('Shift')) {
            onPrevious();
          } else {
            onNext();
          }
          break;
        case 13:
          if (e.getModifierState('Shift')) {
            onOpen();
          } else {
            onSelect();
          }
          break;
        case 89:
          onYank();
          break;
        default:
          // do nothing
      }
    }}
    style={{
      clear: 'both',
      display: 'block',
    }}
  />
);

Browse.propTypes = {
  onNext: React.PropTypes.func,
  onOpen: React.PropTypes.func,
  onPrevious: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  onYank: React.PropTypes.func,
};

export default Browse;
