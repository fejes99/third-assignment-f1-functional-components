import React, { Component } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

import './ConstructorDetails.css';
import { driverDetailsHandler, sumPoints } from '../../helper';

class ConstructorDetails extends Component {
  state = {
    constructor: null,
    results: null,
    loading: true,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const query = new URLSearchParams(this.props.location.search);
    const year = query.get('year');

    Promise.all([
      axios.get(
        `http://ergast.com/api/f1/${year}/constructors/${id}/constructorStandings.json`
      ),
      axios.get(
        `http://ergast.com/api/f1/${year}/constructors/${id}/results.json`
      ),
    ]).then((res) => {
      const constructor =
        res[0].data.MRData.StandingsTable.StandingsLists[0]
          .ConstructorStandings[0];
      const results = res[1].data.MRData.RaceTable.Races;
      this.setState(
        {
          constructor: constructor,
          results: results,
          year: year,
          loading: false,
        },
        () => console.log(this.state)
      );
    });
  }

  render() {
    const { loading, constructor, year, results } = this.state;
    return (
      <div className='container'>
        {loading ? (
          <BeatLoader color='#353a40' />
        ) : (
          <div>
            <div className='constructor-details'>
              <div className='constructor-stats'>
                <table className='constructor-stats__table'>
                  <tbody>
                    <tr>
                      <td>Name:</td>
                      <td>{constructor.Constructor.name}</td>
                    </tr>
                    <tr>
                      <td>Nationality:</td>
                      <td>{constructor.Constructor.nationality}</td>
                    </tr>
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
                  className='constructor-drivers__1'
                  onClick={() =>
                    driverDetailsHandler(
                      this.props,
                      results[0].Results[0].Driver.driverId,
                      year
                    )
                  }
                >
                  <div className='driverImg'></div>
                  <div className='driverName'>
                    {results[0].Results[0].Driver.givenName +
                      ' ' +
                      results[0].Results[0].Driver.familyName}
                  </div>
                </div>
                <div
                  className='constructor-drivers__2'
                  onClick={() =>
                    driverDetailsHandler(
                      this.props,
                      results[0].Results[1].Driver.driverId,
                      year
                    )
                  }
                >
                  <div className='driverImg'></div>
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
                    <td>{result.raceName}</td>
                    <td className={`position-${result.Results[0].position}`}>
                      {result.Results[0].positionText === 'R'
                        ? 'DNF'
                        : result.Results[0].position}
                    </td>
                    <td className={`position-${result.Results[1].position}`}>
                      {result.Results[1].positionText === 'R'
                        ? 'DNF'
                        : result.Results[1].position}
                    </td>
                    <td>
                      {sumPoints(
                        result.Results[0].points,
                        result.Results[1].points
                      )}
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

export default ConstructorDetails;
