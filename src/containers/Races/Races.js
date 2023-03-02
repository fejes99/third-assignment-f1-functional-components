import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
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
import Loader from '../../components/Loader/Loader';

const Races = ({ yearHandler, location }) => {
  const [raceStandings, setRaceStandings] = useState([]);
  const [year, setYear] = useState(2022);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setYear(new URLSearchParams(location.search).get('year'));
    fetchRaces();
  }, [year]);

  const fetchRaces = () => {
    axios.get(`http://ergast.com/api/f1/${year}/results/1.json`).then((res) => {
      setRaceStandings(res.data.MRData.RaceTable.Races);
      setLoading(false);
    });
  };

  const searchHandler = (event) => {
    setQuery(event.target.value);
  };

  const yearPickerHandler = (event) => {
    yearHandler(event.target.value);
    setLoading(true);
  };

  if (loading) return <Loader />;

  const races = racesFilter(raceStandings, query);

  const racesTable = (
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
      <Breadcrumb year={year} elements={['races']} />

      <div className='header'>
        <h1 className='title'>
          <YearPicker year={year} onChange={yearPickerHandler} /> Race Results
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

export default withRouter(Races);
