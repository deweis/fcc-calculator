import React, { Component } from 'react';
import './App.css';
import Display from './components/display';
import KeyPad from './components/keypad';

class App extends Component {
  state = { current_number: 0 };

  clickHandler = item => {
    this.setState({
      current_number: item
    });
  };

  render() {
    return (
      <div className="App container">
        <div className="row">
          <table className="table">
            <tbody>
              <Display current_number={this.state.current_number} />
              <KeyPad clicked={this.clickHandler} />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
