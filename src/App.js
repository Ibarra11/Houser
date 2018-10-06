import React, { Component } from 'react';
import './styles/main.css';
import {baseRoutes} from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        {baseRoutes()}
      </div>
    );
  }
}

export default App;
