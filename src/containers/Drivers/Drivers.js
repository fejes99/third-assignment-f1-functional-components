import React, { Component } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import './Drivers.css';

export class Drivers extends Component {
  state = {
    driverStandings: [],
    round: 0,
    year: null,
    loading: true,
  };
  componentDidMount() {
    axios
      .get('http://ergast.com/api/f1/2013/driverStandings.json')
      .then((res) => {
        const data = res.data.MRData.StandingsTable.StandingsLists[0];
        this.setState(
          {
            driverStandings: data.DriverStandings,
            round: data.round,
            year: data.season,
            loading: false,
          },
          () => console.log('state:: ', this.state)
        );
      });
  }
  render() {
    return (
      <div className='drivers'>
        <h1 className='drivers-title'>{this.state.year} Race Results</h1>
        {this.state.loading ? (
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
              {this.state.driverStandings.map((result) => (
                <tr key={result.position}>
                  <td>{result.position}</td>
                  <td>
                    {result.Driver.givenName + ' ' + result.Driver.familyName}
                  </td>
                  <td>{result.Driver.nationality}</td>
                  <td>{result.Constructors[0].name}</td>
                  <td>{result.wins}</td>
                  <td>{result.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default Drivers;
