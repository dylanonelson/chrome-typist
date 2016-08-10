import React from 'react';

const SearchInfo = ({ currentMatch, infoColor, numberOfMatches, overMaxNumber, warningColor }) => (
  <div
    style={{
      display: 'block',
      float: 'left',
      font: 'inherit',
      lineHeight: '20px',
      width: '10%',
    }}
  >
    <span
      style={{
        color: (overMaxNumber ?
                 (warningColor || 'red') : ''),
        paddingRight: 10,
      }}
    >{numberOfMatches}</span>
    <span
      style={{
        color: infoColor || 'blue',
      }}
    >{currentMatch ?
      `<${currentMatch.toLowerCase()}>` : ''}</span>
  </div>
);

SearchInfo.propTypes = {
  currentMatch: React.PropTypes.string,
  infoColor: React.PropTypes.string,
  numberOfMatches: React.PropTypes.number,
  overMaxNumber: React.PropTypes.bool,
  warningColor: React.PropTypes.string,
};

export default SearchInfo;
