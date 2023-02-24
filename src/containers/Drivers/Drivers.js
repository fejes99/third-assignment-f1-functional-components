import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import './Drivers.css';
import { constructorDetailsHandler, driverDetailsHandler, driversFilter } from '../../helper';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import YearPicker from '../../components/YearPicker/YearPicker';

const Drivers = () => {
  const [driverStandings, setDriverStandings] = useState([]);
  const [year, setYear] = useState(2022);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrivers();
  }, [year]);

  useEffect(() => {
    const standings = driversFilter(driverStandings, query);
    setDriverStandings(standings);
  }, [query]);

  const fetchDrivers = () => {
    axios.get(`http://ergast.com/api/f1/${year}/driverStandings.json`).then((res) => {
      const data = res.data.MRData.StandingsTable.StandingsLists[0];
      setDriverStandings(data.DriverStandings);
      setLoading(false);
    });
  };

  const searchHandler = (query) => {
    setQuery(query);
  };

  const yearHandler = (year) => {
    setYear(year);
    setLoading(true);
  };

  const driversTable = loading ? (
    <BeatLoader color='#353a40' />
  ) : (
    <table>
      <thead>
        <tr>
          <th>Pos</th>
          <th>Driver</th>
          <th>Nationality</th>
          <th>Team</th>
          <th>Wins</th>
          <th>Pts</th>
        </tr>
      </thead>
      <tbody>
        {driverStandings &&
          driverStandings.map((result) => (
            <tr key={result.position}>
              <td>{result.position}</td>
              <td
                className='cursor'
                onClick={() => driverDetailsHandler(result.Driver.driverId, year)}
              >
                {result.Driver.givenName + ' ' + result.Driver.familyName}
              </td>
              <td>{result.Driver.nationality}</td>
              <td
                className='cursor'
                onClick={() =>
                  constructorDetailsHandler(result.Constructors[0].constructorId, year)
                }
              >
                {result.Constructors[0].name}
              </td>
              <td>{result.wins}</td>
              <td>{result.points}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );

  return (
    <div className='container'>
      <Breadcrumb elements={['drivers']} />
      <div className='header'>
        <h1 className='title'>
          <YearPicker year={year} onChange={(event) => yearHandler(event.target.value)} /> Driver
          Standings
        </h1>

        <input
          className='navbar-search'
          type='text'
          value={query}
          placeholder='Search...'
          onChange={(event) => searchHandler(event.target.value)}
        />
      </div>
      {driversTable}
    </div>
  );
};

export default Drivers;
