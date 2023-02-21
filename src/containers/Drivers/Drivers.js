import React, { Component } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import './Drivers.css';
import {
  constructorDetailsHandler,
  driverDetailsHandler,
  driversFilter,
} from '../../helper';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

export class Drivers extends Component {
  state = {
    driverStandings: [],
    year: 2013,
    query: '',
    loading: true,
  };

  componentDidMount() {
    axios
      .get(`http://ergast.com/api/f1/${this.state.year}/driverStandings.json`)
      .then((res) => {
        const data = res.data.MRData.StandingsTable.StandingsLists[0];
        this.setState({
          driverStandings: data.DriverStandings,
          loading: false,
        });
      });
  }

  searchHandler = (event) => {
    const query = event.target.value;
    this.setState(
      {
        query: query,
      },
      () => driversFilter(this.state)
    );
  };

  render() {
    const { loading, query, year } = this.state;
    const driverStandings = driversFilter(this.state);
    return (
      <div className='container'>
        <Breadcrumb elements={['drivers']} />
        <div className='header'>
          <h1 className='title'>{year} Driver Standings</h1>
          <input
            className='navbar-search'
            type='text'
            value={query}
            placeholder='Search...'
            onChange={(event) => this.searchHandler(event)}
          />
        </div>
        {loading ? (
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
                      onClick={() =>
                        driverDetailsHandler(
                          this.props,
                          result.Driver.driverId,
                          year
                        )
                      }
                    >
                      {result.Driver.givenName + ' ' + result.Driver.familyName}
                    </td>
                    <td>{result.Driver.nationality}</td>
                    <td
                      className='cursor'
                      onClick={() =>
                        constructorDetailsHandler(
                          this.props,
                          result.Constructors[0].constructorId,
                          year
                        )
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
        )}
      </div>
    );
  }
}

export default Drivers;
