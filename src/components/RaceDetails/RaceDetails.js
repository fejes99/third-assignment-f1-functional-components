import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';

import './RaceDetails.css';
import {
  constructorDetailsHandler,
  driverDetailsHandler,
  nationalityToCountryCodeConverter,
} from '../../helper';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

const RaceDetails = ({ match, location }) => {
  const [qualiResults, setQualiResults] = useState([]);
  const [raceResults, setRaceResults] = useState([]);
  const [circuitData, setCircuitData] = useState(null);
  const [year, setYear] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRaceDetails();
  }, []);

  const fetchRaceDetails = () => {
    const { id } = match.params;
    const query = new URLSearchParams(location.search);
    const year = query.get('year');

    let endpoints = [
      `https://ergast.com/api/f1/${year}/${id}/qualifying.json`,
      `https://ergast.com/api/f1/${year}/${id}/results.json`,
      'https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json',
    ];

    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => {
      const circuitData = res[1].data.MRData.RaceTable.Races[0].Circuit;
      const countryCode = nationalityToCountryCodeConverter(
        res[2].data,
        circuitData.Location.country
      );
      setQualiResults(res[0].data.MRData.RaceTable.Races[0].QualifyingResults);
      setRaceResults(res[1].data.MRData.RaceTable.Races[0].Results);
      setCircuitData(circuitData);
      setYear(year);
      setCountryCode(countryCode);
      setLoading(false);
    });
  };

  if (loading) return <Loader />;

  const raceContent = (
    <div>
      <Breadcrumb elements={['races', `${circuitData.circuitId}`]} />
      <div className='race-details'>
        <div className='race-profile'>
          <h1>{circuitData.circuitName}</h1>
          {countryCode && (
            <img src={`https://flagsapi.com/${countryCode}/shiny/64.png`} alt='Flag' />
          )}
        </div>
        <div className='race-stats'>
          <table className='race-stats__table'>
            <tbody>
              <tr>
                <td>Year:</td>
                <td>{year}</td>
              </tr>
              <tr>
                <td>Location:</td>
                <td>{circuitData.Location.locality}</td>
              </tr>
              <tr>
                <td>Bio:</td>
                <td>
                  <a href={circuitData.url} target='_blank'>
                    Wiki
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className='result-tables'>
        <div className='result-wrapper'>
          <h1>Qualifying Results</h1>
          <table>
            <thead>
              <tr>
                <th>Pos</th>
                <th>Driver</th>
                <th>Car</th>
                <th>Q1</th>
                <th>Q2</th>
                <th>Q3</th>
              </tr>
            </thead>
            <tbody>
              {qualiResults.map((result) => (
                <tr key={result.number}>
                  <td>{result.position}</td>
                  <td
                    className='cursor'
                    onClick={() => {
                      driverDetailsHandler(result.Driver.driverId, year);
                    }}
                  >
                    {result.Driver.givenName + ' ' + result.Driver.familyName}
                  </td>
                  <td
                    className='cursor'
                    onClick={() => {
                      constructorDetailsHandler(result.Constructor.constructorId, year);
                    }}
                  >
                    {result.Constructor.name}
                  </td>
                  <td>{result.Q1 !== null ? result.Q1 : ''}</td>
                  <td>{result.Q2 !== null ? result.Q2 : ''}</td>
                  <td>{result.Q3 !== null ? result.Q3 : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='vl'></div>
        <div className='result-wrapper'>
          <h1>Race Results</h1>
          <table>
            <thead>
              <tr>
                <th>Pos</th>
                <th>Driver</th>
                <th>Car</th>
                <th>Laps</th>
                <th>Result</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              {raceResults.map((result) => (
                <tr key={result.position}>
                  <td>{result.position}</td>
                  <td
                    className='cursor'
                    onClick={() => {
                      driverDetailsHandler(result.Driver.driverId, year);
                    }}
                  >
                    {result.Driver.givenName + ' ' + result.Driver.familyName}
                  </td>
                  <td
                    className='cursor'
                    onClick={() => {
                      constructorDetailsHandler(result.Constructor.constructorId, year);
                    }}
                  >
                    {result.Constructor.name}
                  </td>
                  <td>{result.laps}</td>
                  <td>{result.Time ? result.Time.time : 'No time'}</td>
                  <td>{result.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return <div className='container'>{raceContent}</div>;
};

export default RaceDetails;
