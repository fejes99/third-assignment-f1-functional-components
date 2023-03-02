import React, { useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Drivers from './containers/Drivers/Drivers';
import Constructors from './containers/Constructors/Constructors';
import Races from './containers/Races/Races';
import DriverDetails from './components/DriverDetails/DriverDetails';
import ConstructorDetails from './components/ConstructorDetails/ConstructorDetails';
import RaceDetails from './components/RaceDetails/RaceDetails';
import Welcome from './containers/Welcome/Welcome';

const App = ({ history }) => {
  const [year, setYear] = useState(2022);

  const yearHandler = (year) => {
    setYear(year);
    history.push(`/drivers?year=${year}`);
  };

  return (
    <div className='App'>
      <Navbar year={year} />
      <div className='main'>
        <div className='wrapper'>
          <Switch>
            <Route path='/drivers/:id' component={DriverDetails} />
            <Route path='/drivers' component={() => <Drivers yearHandler={yearHandler} />} />
            <Route path='/constructors/:id' component={ConstructorDetails} />
            <Route
              path='/constructors'
              component={() => <Constructors yearHandler={yearHandler} />}
            />
            <Route path='/races/:id' component={RaceDetails} />
            <Route path='/races' component={() => <Races yearHandler={yearHandler} />} />
            <Route path='/' component={() => <Welcome year={year} yearHandler={yearHandler} />} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default withRouter(App);
