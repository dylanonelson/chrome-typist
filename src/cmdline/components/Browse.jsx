import React from 'react';

class Browse extends React.Component {
  render() {
    return (
      <input
        ref="input"
        style={{
          clear: 'both',
          display: 'block',
        }}
        onKeyDown={this.props.onKeyDown}
      />
    );
  }
}

export default Browse;
