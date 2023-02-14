import React, { Component } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import './Constructors.css';

export class Constructors extends Component {
  state = {
    constructorStandings: [],
    round: 0,
    year: 2013,
    loading: true,
  };
  componentDidMount() {
    axios
      .get(
        `http://ergast.com/api/f1/${this.state.year}/constructorStandings.json`
      )
      .then((res) => {
        const data = res.data.MRData.StandingsTable.StandingsLists[0];
        this.setState({
          constructorStandings: data.ConstructorStandings,
          round: data.round,
          loading: false,
        });
      });
  }
  render() {
    return (
      <div className='constructors'>
        <h1 className='constructors-title'>
          {this.state.year} Constructor Standings
        </h1>
        {this.state.loading ? (
          <BeatLoader color='#353a40' />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Pos</th>
                <th>Team</th>
                <th>Nationality</th>
                <th>Wins</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              {this.state.constructorStandings.map((result) => (
                <tr key={result.position}>
                  <td>{result.position}</td>
                  <td>{result.Constructor.name}</td>
                  <td>{result.Constructor.nationality}</td>
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

export default Constructors;
