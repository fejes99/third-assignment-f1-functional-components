import React, { Component } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import './Races.css';
import {
  getFormattedDate,
  driverDetailsHandler,
  constructorDetailsHandler,
  raceDetailsHandler,
  racesFilter,
} from '../../helper';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

export class Races extends Component {
  state = {
    races: [],
    year: 2013,
    query: '',
    loading: true,
  };

  componentDidMount() {
    axios
      .get(`http://ergast.com/api/f1/${this.state.year}/results/1.json`)
      .then((res) => {
        const data = res.data.MRData.RaceTable.Races;
        this.setState({
          races: data,
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
      () => racesFilter(this.state)
    );
  };

  render() {
    const { loading, query, year } = this.state;
    const races = racesFilter(this.state);
    return (
      <div className='container'>
        <Breadcrumb elements={['races']} />

        <div className='header'>
          <h1 className='title'>{year} Race Results</h1>
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
                <th>Round</th>
                <th>Grand Prix</th>
                <th>Circuit</th>
                <th>Date</th>
                <th>Winner</th>
                <th>Car</th>
                <th>Laps</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {races.map((result) => (
                <tr key={result.round}>
                  <td>{result.round}</td>
                  <td
                    className='cursor'
                    onClick={() =>
                      raceDetailsHandler(this.props, result.round, year)
                    }
                  >
                    {result.raceName}
                  </td>
                  <td>{result.Circuit.circuitName}</td>
                  <td>{getFormattedDate(result.date)}</td>
                  <td
                    className='cursor'
                    onClick={() =>
                      driverDetailsHandler(
                        this.props,
                        result.Results[0].Driver.driverId,
                        year
                      )
                    }
                  >
                    {result.Results[0].Driver.givenName +
                      ' ' +
                      result.Results[0].Driver.familyName}
                  </td>
                  <td
                    className='cursor'
                    onClick={() =>
                      constructorDetailsHandler(
                        this.props,
                        result.Results[0].Constructor.constructorId,
                        year
                      )
                    }
                  >
                    {result.Results[0].Constructor.name}
                  </td>
                  <td>{result.Results[0].laps}</td>
                  <td>{result.Results[0].Time.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default Races;
