import React, { Component } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

import './DriverDetails.css';
import {
  constructorDetailsHandler,
  getFormattedDate,
  raceDetailsHandler,
} from '../../helper';

export class DriverDetails extends Component {
  state = {
    driver: null,
    results: null,
    year: null,
    loading: true,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const query = new URLSearchParams(this.props.location.search);
    const year = query.get('year');

    Promise.all([
      axios.get(
        `http://ergast.com/api/f1/${year}/drivers/${id}/driverStandings.json`
      ),
      axios.get(`http://ergast.com/api/f1/${year}/drivers/${id}/results.json`),
    ]).then((res) => {
      const driver =
        res[0].data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
      const results = res[1].data.MRData.RaceTable.Races;
      this.setState({
        driver: driver,
        results: results,
        year: year,
        loading: false,
      });
    });
  }

  render() {
    const { loading, driver, year, results } = this.state;
    return (
      <div className='container'>
        {loading ? (
          <BeatLoader color='#353a40' />
        ) : (
          <div>
            <div className='driver-details'>
              <div className='driver-profile'>
                <h1>
                  {driver.Driver.givenName} {driver.Driver.familyName}
                </h1>
                <div>Nationality: {driver.Driver.nationality}</div>
              </div>
              <div className='driver-stats'>
                <table className='driver-stats__table'>
                  <tbody>
                    <tr>
                      <td>Team:</td>
                      <td
                        className='cursor'
                        onClick={() =>
                          constructorDetailsHandler(
                            this.props,
                            driver.Constructors[0].constructorId,
                            year
                          )
                        }
                      >
                        {driver.Constructors[0].name}
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
                        raceDetailsHandler(this.props, result.round, year);
                      }}
                    >
                      {result.raceName}
                    </td>
                    <td>{getFormattedDate(result.date)}</td>
                    <td
                      className='cursor'
                      onClick={() =>
                        constructorDetailsHandler(
                          this.props,
                          driver.Constructors[0].constructorId,
                          year
                        )
                      }
                    >
                      {result.Results[0].Constructor.name}
                    </td>
                    <td>
                      {result.Results[0].positionText === 'R'
                        ? 'DNF'
                        : result.Results[0].position}
                    </td>
                    <td className={`position-${result.Results[0].position}`}>
                      {result.Results[0].points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default DriverDetails;
