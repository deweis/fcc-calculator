import React, { Component } from 'react';
import './App.css';
import Display from './components/display';
import KeyPad from './components/keypad';

class App extends Component {
  state = {
    current_number: 0,
    current_calculation: []
  };

  numberClickHandler = number => {
    let arr =
      this.state.current_number === 0 && number === 0
        ? [0]
        : this.state.current_number === 0 && number > 0
        ? [number]
        : [this.state.current_number, number];

    const current_number = Number(arr.join(''));

    this.setState({
      current_number: current_number,
      current_calculation: current_number
    });
  };

  acClickHandler = () => {
    this.setState({ current_number: 0, current_calculation: [] });
  };

  render() {
    return (
      <div className="App container">
        <div className="row">
          <table className="table">
            <tbody>
              <Display
                current_number={this.state.current_number}
                current_calculation={this.state.current_calculation}
              />
              <KeyPad
                numberclicked={this.numberClickHandler}
                acClicked={this.acClickHandler}
              />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
