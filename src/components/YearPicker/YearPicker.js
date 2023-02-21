import React, { Component } from 'react';
import './YearPicker.css';

class YearPicker extends Component {
  render() {
    const options = [];
    for (let year = 2022; year >= 1950; year--) {
      options.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }

    return (
      <select
        className='year-picker'
        value={this.props.year}
        onChange={(event) => this.props.onChange(event)}
      >
        {options}
      </select>
    );
  }
}
export default YearPicker;
