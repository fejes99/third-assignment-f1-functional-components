import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './App';
import history from './history';
import './index.css';

const app = (
  <Router history={history}>
    <App />
  </Router>
);

ReactDOM.render(app, document.getElementById('root'));
