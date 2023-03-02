import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './ConstructorDetails.css';
import {
  driverDetailsHandler,
  nationalityToCountryCodeConverter,
  raceDetailsHandler,
  sumPoints,
} from '../../helper';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Loader from '../Loader/Loader';

const ConstructorDetails = ({ match, location }) => {
  const [constructor, setConstructor] = useState(null);
  const [results, setResults] = useState(null);
  const [year, setYear] = useState(2022);
  const [countryCode, setCountryCode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConstructorDetails();
  }, []);

  const fetchConstructorDetails = () => {
    const { id } = match.params;
    const year = new URLSearchParams(location.search).get('year');

    let endpoints = [
      `http://ergast.com/api/f1/${year}/constructors/${id}/constructorStandings.json`,
      `http://ergast.com/api/f1/${year}/constructors/${id}/results.json`,
      'https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json',
    ];

    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => {
      const constructor =
        res[0].data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0];
      const countryCode = nationalityToCountryCodeConverter(
        res[2].data,
        constructor.Constructor.nationality
      );
      setConstructor(constructor);
      setResults(res[1].data.MRData.RaceTable.Races);
      setYear(year);
      setCountryCode(countryCode);
      setLoading(false);
    });
  };

  if (loading) return <Loader />;

  const constructorContent = (
    <div>
      <Breadcrumb
        year={year}
        elements={['constructors', `${constructor.Constructor.constructorId}`]}
      />
      <div className='constructor-details'>
        <div className='constructor-stats'>
          <div className='constructor-stats__name'>
            <img src={`https://flagsapi.com/${countryCode}/shiny/64.png`} alt='Flag' />
            <h1>{constructor.Constructor.name}</h1>
          </div>
          <table className='constructor-stats__table'>
            <tbody>
              <tr>
                <td>Position:</td>
                <td>{constructor.position}</td>
              </tr>
              <tr>
                <td>Points:</td>
                <td>{constructor.points}</td>
              </tr>
              <tr>
                <td>Wins:</td>
                <td>{constructor.wins}</td>
              </tr>
              <tr>
                <td>Bio:</td>
                <td>
                  <a href={constructor.Constructor.url} target='_blank'>
                    Wiki
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='constructor-drivers'>
          <div
            className='constructor-drivers__1 cursor'
            onClick={() => driverDetailsHandler(results[0].Results[0].Driver.driverId, year)}
          >
            <img
              src='https://api.lorem.space/image/face?w=300&h=200'
              alt='Driver 1 placeholder'
              className='driverImg'
            />
            <div className='driverName'>
              {results[0].Results[0].Driver.givenName +
                ' ' +
                results[0].Results[0].Driver.familyName}
            </div>
          </div>
          <div
            className='constructor-drivers__2 cursor'
            onClick={() => driverDetailsHandler(results[0].Results[1].Driver.driverId, year)}
          >
            <img
              src='https://api.lorem.space/image/fashion?w=300&h=200'
              alt='Driver 2 placeholder'
              className='driverImg'
            />
            <div className='driverName'>
              {results[0].Results[1].Driver.givenName +
                ' ' +
                results[0].Results[1].Driver.familyName}
            </div>
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Round</th>
            <th>Grand Prix</th>
            <th>
              {results[0].Results[0].Driver.givenName +
                ' ' +
                results[0].Results[0].Driver.familyName}
            </th>
            <th>
              {results[0].Results[1].Driver.givenName +
                ' ' +
                results[0].Results[1].Driver.familyName}
            </th>
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
              <td className={`position-${result.Results[0].position}`}>
                {result.Results[0].positionText === 'R' ? 'DNF' : result.Results[0].position}
              </td>
              <td className={`position-${result.Results[1].position}`}>
                {result.Results[1].positionText === 'R' ? 'DNF' : result.Results[1].position}
              </td>
              <td>{sumPoints(result.Results[0].points, result.Results[1].points)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return <div className='container'>{constructorContent}</div>;
};

export default ConstructorDetails;
