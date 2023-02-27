import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Drivers from './containers/Drivers/Drivers';
import Constructors from './containers/Constructors/Constructors';
import Races from './containers/Races/Races';
import DriverDetails from './components/DriverDetails/DriverDetails';
import ConstructorDetails from './components/ConstructorDetails/ConstructorDetails';
import RaceDetails from './components/RaceDetails/RaceDetails';

const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <div className='main'>
        <div className='wrapper'>
          <Switch>
            <Route path='/drivers/:id' component={DriverDetails} />
            <Route exact path='/drivers' component={Drivers} />
            <Route path='/constructors/:id' component={ConstructorDetails} />
            <Route exact path='/constructors' component={Constructors} />
            <Route path='/races/:id' component={RaceDetails} />
            <Route exact path='/races' component={Races} />
            <Route exact path='/' component={() => <Redirect to='/drivers' />} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
