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
                <table className='table-stats'>
                  <tbody>
                    <tr>
                      <td>Team:</td>
                      <td>{driver.Constructors[0].name}</td>
                    </tr>
                    <tr>
                      <td>Points:</td>
                      <td>{driver.points}</td>
                    </tr>
                    <tr>
                      <td>Championship Position:</td>
                      <td>{driver.position}</td>
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
                        <a href={driver.Driver.url}>Wiki</a>
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
