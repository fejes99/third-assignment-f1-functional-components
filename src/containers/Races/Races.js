import React, { Component } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import './Races.css';
import {
  getFormattedDate,
  driverDetailsHandler,
  constructorDetailsHandler,
} from '../../helper';

export class Races extends Component {
  state = {
    races: [],
    year: 2013,
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
  render() {
    return (
      <div className='container'>
        <h1 className='title'>{this.state.year} Race Results</h1>
        {this.state.loading ? (
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
              {this.state.races.map((result) => (
                <tr key={result.round}>
                  <td>{result.round}</td>
                  <td>{result.raceName}</td>
                  <td>{result.Circuit.circuitName}</td>
                  <td>{getFormattedDate(result.date)}</td>
                  <td
                    onClick={() =>
                      driverDetailsHandler(
                        this.props,
                        result.Results[0].Driver.driverId,
                        this.state.year
                      )
                    }
                  >
                    {result.Results[0].Driver.givenName +
                      ' ' +
                      result.Results[0].Driver.familyName}
                  </td>
                  <td
                    onClick={() =>
                      constructorDetailsHandler(
                        this.props,
                        result.Results[0].Constructor.constructorId,
                        this.state.year
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
