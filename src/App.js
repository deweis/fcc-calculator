import React, { Component } from 'react';
import './App.css';
import Display from './components/display';
import KeyPad from './components/keypad';

class App extends Component {
  state = { current_number: 0 };

  numberClickHandler = number => {
    let arr =
      this.state.current_number === 0 && number === 0
        ? [0]
        : this.state.current_number === 0 && number > 0
        ? [number]
        : [this.state.current_number, number];

    this.setState({
      current_number: Number(arr.join(''))
    });
  };

  render() {
    return (
      <div className="App container">
        <div className="row">
          <table className="table">
            <tbody>
              <Display current_number={this.state.current_number} />
              <KeyPad numberclicked={this.numberClickHandler} />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
