import React from 'react';
import './Welcome.css';
import YearPicker from '../../components/YearPicker/YearPicker';

const Welcome = ({ yearHandler }) => {
  const yearPickerHandler = (event) => {
    yearHandler(event.target.value);
  };

  return (
    <div className='welcome'>
      <h1 className='welcome-header'>Welcome, pick a year</h1>
      <YearPicker onChange={yearPickerHandler} />
    </div>
  );
};

export default Welcome;
