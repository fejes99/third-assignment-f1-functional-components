import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import Drivers from './containers/Drivers/Drivers';
import Constructors from './containers/Constructors/Constructors';
import Races from './containers/Races/Races';
import Navbar from './components/Navbar/Navbar';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar />
        <Switch>
          <Route path='/drivers' component={Drivers} />
          <Route path='/constructors' component={Constructors} />
          <Route path='/races' component={Races} />
          <Route exact path='/' component={() => <Redirect to='/drivers' />} />
        </Switch>
      </div>
    );
  }
}

export default App;
