import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './DriverDetails.css';
import {
  constructorDetailsHandler,
  getFormattedDate,
  nationalityToCountryCodeConverter,
  raceDetailsHandler,
} from '../../helper';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Loader from '../../components/Loader/Loader';

const DriverDetails = ({ match, location }) => {
  const [driver, setDriver] = useState(null);
  const [results, setResults] = useState(null);
  const [year, setYear] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDriverDetails();
  }, []);

  const fetchDriverDetails = () => {
    const { id } = match.params;
    const query = new URLSearchParams(location.search);
    const year = query.get('year');

    let endpoints = [
      `http://ergast.com/api/f1/${year}/drivers/${id}/driverStandings.json`,
      `http://ergast.com/api/f1/${year}/drivers/${id}/results.json`,
      'https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json',
    ];

    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => {
      const driver = res[0].data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
      const countryCode = nationalityToCountryCodeConverter(res[2].data, driver.Driver.nationality);
      setDriver(driver);
      setResults(res[1].data.MRData.RaceTable.Races);
      setYear(year);
      setCountryCode(countryCode);
      setLoading(false);
    });
  };

  if (loading) return <Loader />;

  const driverContent = (
    <div>
      <Breadcrumb elements={['drivers', `${driver.Driver.driverId}`]} />
      <div className='driver-details'>
        <div className='driver-profile'>
          <img
            src='https://api.lorem.space/image/face?w=300&h=200'
            alt='Driver 1 placeholder'
            className='driver-profile-img'
          />
          <div className='driver-profile-data'>
            <img src={`https://flagsapi.com/${countryCode}/shiny/64.png`} alt='Flag' />
            <h1>
              {driver.Driver.givenName} {driver.Driver.familyName}
            </h1>
          </div>
        </div>
        <div className='driver-stats'>
          <table className='driver-stats__table'>
            <tbody>
              <tr>
                <td>Team:</td>
                <td
                  className='cursor'
                  onClick={() =>
                    constructorDetailsHandler(driver.Constructors[0].constructorId, year)
                  }
                >
                  <strong>{driver.Constructors[0].name}</strong>
                </td>
              </tr>
              <tr>
                <td>Championship Position:</td>
                <td>{driver.position}</td>
              </tr>
              <tr>
                <td>Points:</td>
                <td>{driver.points}</td>
              </tr>
              {driver.wins !== '0' && (
                <tr>
                  <td>Wins:</td>
                  <td>{driver.wins}</td>
                </tr>
              )}
              <tr>
                <td>Date of birth:</td>
                <td>{getFormattedDate(driver.Driver.dateOfBirth)}</td>
              </tr>
              <tr>
                <td>Bio:</td>
                <td>
                  <a href={driver.Driver.url} target='_blank'>
                    Wiki
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Round</th>
            <th>Grand Prix</th>
            <th>Date</th>
            <th>Car</th>
            <th>Position</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.round}>
              <td>{result.round}</td>
              <td
                className='cursor'
                onClick={() => {
                  raceDetailsHandler(result.round, year);
                }}
              >
                {result.raceName}
              </td>
              <td>{getFormattedDate(result.date)}</td>
              <td
                className='cursor'
                onClick={() =>
                  constructorDetailsHandler(driver.Constructors[0].constructorId, year)
                }
              >
                {result.Results[0].Constructor.name}
              </td>
              <td>{result.Results[0].positionText === 'R' ? 'DNF' : result.Results[0].position}</td>
              <td className={`position-${result.Results[0].position}`}>
                {result.Results[0].points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return <div className='container'>{driverContent}</div>;
};

export default DriverDetails;
