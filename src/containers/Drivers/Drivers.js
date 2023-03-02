import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import './Drivers.css';
import { constructorDetailsHandler, driverDetailsHandler, driversFilter } from '../../helper';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import YearPicker from '../../components/YearPicker/YearPicker';
import Loader from '../../components/Loader/Loader';

const Drivers = ({ yearHandler, location }) => {
  const [driverStandings, setDriverStandings] = useState([]);
  const [year, setYear] = useState(2022);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setYear(new URLSearchParams(location.search).get('year'));
    fetchDrivers();
  }, [year]);

  const fetchDrivers = () => {
    axios.get(`http://ergast.com/api/f1/${year}/driverStandings.json`).then((res) => {
      setDriverStandings(res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
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

  const standings = driversFilter(driverStandings, query);

  const driversTable = (
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
        {standings &&
          standings.map((result) => (
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
      <Breadcrumb year={year} elements={['drivers']} />
      <div className='header'>
        <h1 className='title'>
          <YearPicker year={year} onChange={yearPickerHandler} /> Driver Standings
        </h1>

        <input
          className='navbar-search'
          type='text'
          value={query}
          placeholder='Search...'
          onChange={searchHandler}
        />
      </div>
      {driversTable}
    </div>
  );
};

export default withRouter(Drivers);
