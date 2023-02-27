import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Constructors.css';
import { constructorDetailsHandler, constructorsFilter } from '../../helper';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import YearPicker from '../../components/YearPicker/YearPicker';
import Loader from '../../components/Loader/Loader';

const Constructors = () => {
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [year, setYear] = useState(2022);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConstructors();
  }, [year]);

  const fetchConstructors = () => {
    axios.get(`http://ergast.com/api/f1/${year}/constructorStandings.json`).then((res) => {
      setConstructorStandings(
        res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
      );
      setLoading(false);
    });
  };

  const searchHandler = (event) => {
    setQuery(event.target.value);
  };

  const yearHandler = (event) => {
    setYear(event.target.value);
    setLoading(true);
  };

  if (loading) return <Loader />;

  const standings = constructorsFilter(constructorStandings, query);

  const constructorsTable = (
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
        {standings &&
          standings.map((result) => (
            <tr key={result.position}>
              <td>{result.position}</td>
              <td
                className='cursor'
                onClick={() => constructorDetailsHandler(result.Constructor.constructorId, year)}
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
  );

  return (
    <div className='container'>
      <Breadcrumb elements={['constructors']} />
      <div className='header'>
        <h1 className='title'>
          <YearPicker year={year} onChange={yearHandler} /> Constructor Standings
        </h1>
        <input
          className='navbar-search'
          type='text'
          value={query}
          placeholder='Search...'
          onChange={searchHandler}
        />
      </div>
      {constructorsTable}
    </div>
  );
};

export default Constructors;
