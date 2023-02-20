import React, { Component } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import './Constructors.css';
import { constructorDetailsHandler } from '../../helper';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

export class Constructors extends Component {
  state = {
    constructorStandings: [],
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
          loading: false,
        });
      });
  }

  render() {
    const { loading, constructorStandings, year } = this.state;
    return (
      <div className='container'>
        <Breadcrumb elements={['constructors']} />
        <h1 className='title'>{year} Constructor Standings</h1>
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
              {constructorStandings.map((result) => (
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
