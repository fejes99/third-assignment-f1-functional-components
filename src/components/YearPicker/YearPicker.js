import React from 'react';
import './YearPicker.css';

const YearPicker = ({ year, onChange }) => {
  const options = [];
  for (let year = 2022; year >= 1950; year--) {
    options.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }

  return (
    <select className='year-picker' value={year} onChange={(event) => onChange(event)}>
      {options}
    </select>
  );
};
export default YearPicker;
