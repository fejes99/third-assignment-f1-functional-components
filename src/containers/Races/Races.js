import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import './Races.css';
import {
  getFormattedDate,
  driverDetailsHandler,
  constructorDetailsHandler,
  raceDetailsHandler,
  racesFilter,
} from '../../helper';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import YearPicker from '../../components/YearPicker/YearPicker';

const Races = () => {
  const [raceStandings, setRaceStandings] = useState([]);
  const [year, setYear] = useState(2022);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRaces();
  }, [year]);

  const fetchRaces = () => {
    axios.get(`http://ergast.com/api/f1/${year}/results/1.json`).then((res) => {
      const data = res.data.MRData.RaceTable.Races;
      setRaceStandings(data);
      setLoading(false);
    });
  };

  const searchHandler = (event) => {
    setQuery(event.target.value);
  };

  const yearHandler = (event) => {
    setYear(event.target.value);
    setLoading(true);
  };

  const races = racesFilter(raceStandings, query);
  const racesTable = loading ? (
    <BeatLoader color='#353a40' />
  ) : (
    <table>
      <thead>
        <tr>
          <th>Round</th>
          <th>Grand Prix</th>
          <th>Circuit</th>
          <th>Date</th>
          <th>Winner</th>
          <th>Car</th>
          <th>Laps</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {races.map((result) => (
          <tr key={result.round}>
            <td>{result.round}</td>
            <td className='cursor' onClick={() => raceDetailsHandler(result.round, year)}>
              {result.raceName}
            </td>
            <td>{result.Circuit.circuitName}</td>
            <td>{getFormattedDate(result.date)}</td>
            <td
              className='cursor'
              onClick={() => driverDetailsHandler(result.Results[0].Driver.driverId, year)}
            >
              {result.Results[0].Driver.givenName + ' ' + result.Results[0].Driver.familyName}
            </td>
            <td
              className='cursor'
              onClick={() =>
                constructorDetailsHandler(result.Results[0].Constructor.constructorId, year)
              }
            >
              {result.Results[0].Constructor.name}
            </td>
            <td>{result.Results[0].laps}</td>
            <td>{result.Results[0].Time.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className='container'>
      <Breadcrumb elements={['races']} />

      <div className='header'>
        <h1 className='title'>
          <YearPicker year={year} onChange={yearHandler} /> Race Results
        </h1>
        <input
          className='navbar-search'
          type='text'
          value={query}
          placeholder='Search...'
          onChange={searchHandler}
        />
      </div>
      {racesTable}
    </div>
  );
};

export default Races;
