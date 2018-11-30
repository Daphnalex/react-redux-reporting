import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import Home from './containers/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Router>
            <Route exact path='/' component={Home} />
          </Router>
      </div>
    );
  }
}

export default App;
