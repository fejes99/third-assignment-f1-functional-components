import React, { Component } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import './Constructors.css';
import { constructorDetailsHandler, constructorsFilter } from '../../helper';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

export class Constructors extends Component {
  state = {
    constructorStandings: [],
    year: 2013,
    query: '',
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
      () => constructorsFilter(this.state)
    );
  };

  render() {
    const { loading, query, year } = this.state;
    const constructorStandings = constructorsFilter(this.state);
    return (
      <div className='container'>
        <Breadcrumb elements={['constructors']} />
        <div className='header'>
          <h1 className='title'>{year} Constructor Standings</h1>
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
                <th>Team</th>
                <th>Nationality</th>
                <th>Wins</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              {constructorStandings &&
                constructorStandings.map((result) => (
                  <tr key={result.position}>
                    <td>{result.position}</td>
                    <td
                      className='cursor'
                      onClick={() =>
                        constructorDetailsHandler(
                          this.props,
                          result.Constructor.constructorId,
                          year
                        )
                      }
                    >
                      {result.Constructor.name}
                    </td>
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
