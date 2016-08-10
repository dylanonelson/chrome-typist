import React from 'react';

class Option extends React.Component {

  render() {
    return (
      <div
        className="setting clearfix"
        style={{
          display: 'block',
          height: this.props.rowHeight,
          lineHeight: `${this.props.rowHeight}px`,
          marginBottom: this.props.rowHeight * 0.35,
        }}
      >
        <label
          style={{
            boxSizing: 'border-box',
            display: 'block',
            height: 'inherit',
            lineHeight: 'inherit',
            float: 'left',
            paddingRight: 10,
            textAlign: 'right',
            width: '40%',
          }}
          htmlFor={this.props.name}
        >
          {`${this.props.name[0].toUpperCase()}${this.props.name.slice(1, this.props.name.length)}`}
        </label>
        <input
          id={this.props.name}
          onChange={(e) => {
            e.preventDefault();
            this.props.store.dispatch({
              type: 'UPDATE_SETTINGS',
              [this.props.name]: this.input.value,
            });
          }}
          ref={(input) => this.input = input} /* eslint no-return-assign: 0 */
          style={{
            boxSizing: 'border-box',
            display: 'block',
            height: this.props.rowHeight,
            lineHeight: `${this.props.rowHeight}px`,
            float: 'right',
            width: '60%',
          }}
          value={this.props.value}
        />
      </div>
    );
  }

}

Option.propTypes = {
  name: React.PropTypes.string,
  rowHeight: React.PropTypes.number,
  store: React.PropTypes.object,
  value: React.PropTypes.string,
};

export default Option;
