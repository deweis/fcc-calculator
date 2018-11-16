import React, { Component } from 'react';
import './App.css';
import Display from './components/display';
import KeyPad from './components/keypad';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <div className="row">
          <table className="table">
            <tbody>
              <Display />
              <KeyPad />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
