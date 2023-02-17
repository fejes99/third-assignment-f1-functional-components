import axios from 'axios';
import React, { Component } from 'react';
import { getFormattedDate } from '../../helper';
import './DriverDetails.css';

export class DriverDetails extends Component {
  state = {
    loading: true,
    driver: null,
    results: null,
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
    ]).then((responses) => {
      const driverData =
        responses[0].data.MRData.StandingsTable.StandingsLists[0];
      const driver = driverData.DriverStandings[0];
      const resultsData = responses[1].data.MRData.RaceTable.Races;
      console.log(resultsData);
      this.setState({
        driver: driver,
        results: resultsData,
        loading: false,
      });
    });
  }

  render() {
    const { loading, driver, results } = this.state;
    return (
      <div className='driver-details-container'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div className='driver-details'>
              <div className='profile'>
                <h1>
                  {driver.Driver.givenName} {driver.Driver.familyName}
                  <div>Nationality: {driver.Driver.nationality}</div>
                </h1>
              </div>
              <div className='stats'>
                <div>Team: {driver.Constructors[0].name}</div>
                <div>Points: {driver.points}</div>
                <div>Championship Position: {driver.position}</div>
                <div>
                  {driver.wins !== '0' && <div>Wins: {driver.wins}</div>}
                </div>
                <div>
                  Date of birth: {getFormattedDate(driver.Driver.dateOfBirth)}
                </div>
                <div>
                  Bio: <a href={driver.Driver.url}>Wiki</a>
                </div>
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
                    <td>{result.raceName}</td>
                    <td>{getFormattedDate(result.date)}</td>
                    <td>{result.Results[0].Constructor.name}</td>
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
