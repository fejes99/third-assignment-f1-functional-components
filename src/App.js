import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Drivers from './containers/Drivers/Drivers';
import Constructors from './containers/Constructors/Constructors';
import Races from './containers/Races/Races';
import DriverDetails from './components/DriverDetails/DriverDetails';
import ConstructorDetails from './components/ConstructorDetails/ConstructorDetails';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar />
        <Switch>
          <div className='main'>
            <div className='wrapper'>
              <Route path='/drivers/:id' component={DriverDetails} />
              <Route exact path='/drivers' component={Drivers} />
              <Route path='/constructors/:id' component={ConstructorDetails} />
              <Route exact path='/constructors' component={Constructors} />
              <Route path='/races' component={Races} />
              <Route
                exact
                path='/'
                component={() => <Redirect to='/drivers' />}
              />
            </div>
          </div>
        </Switch>
      </div>
    );
  }
}

export default App;
