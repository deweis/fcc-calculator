import React, { Component } from 'react';
import './App.css';
import Display from './components/display';
import KeyPad from './components/keypad';

/*
  - ID user stories - Ids
  - Add Calculation functionality (final calculation and calculation upon partial results)
  - Add Decimal functionality
  - Fix too long enterings widen the calculator
*/

class App extends Component {
  state = {
    current_item: 0,
    current_calculation: []
  };

  /* When a number has been clicked */
  numberClickHandler = number => {
    let current_calculation = [...this.state.current_calculation];
    let current_item = this.state.current_item;

    // first number or an additional number after another number has been typed
    if (typeof this.state.current_item === 'number') {
      let arr =
        this.state.current_item === 0 && number === 0
          ? [0] // can't type more than one zero at the beginning of a number
          : this.state.current_item === 0 && number > 0
          ? [number] // first number > 0 is ok
          : [this.state.current_item, number]; // add numbers to the array

      current_item = Number(arr.join(''));
      current_calculation.splice(
        current_calculation.length - 1,
        1,
        current_item
      );
      // first number after an operator
    } else if (typeof this.state.current_item === 'string') {
      current_item = number;
      current_calculation.push(number);
    }

    this.setState({
      current_item: current_item,
      current_calculation: current_calculation
    });
  };

  /* When a operator has been clicked */
  operatorClickHandler = operator => {
    let current_calculation = [...this.state.current_calculation];
    // first operator typed
    if (typeof this.state.current_item === 'number') {
      current_calculation.push(operator);
      // another operator typed - replaces the first operator
    } else if (typeof this.state.current_item === 'string') {
      current_calculation.splice(current_calculation.length - 1, 1, operator);
    }
    this.setState({
      current_item: operator,
      current_calculation: current_calculation
    });
  };

  /* When the AC has been clicked */
  acClickHandler = () => {
    this.setState({ current_item: 0, current_calculation: [] });
  };

  /* When the CE has been clicked */
  ceClickHandler = () => {
    let current_calculation = [...this.state.current_calculation];
    // if only a number has been added so far
    if (current_calculation.length === 1) {
      this.setState({ current_item: 0, current_calculation: [] });
    } else if (
      // only clear when the last item in the calculation is a number. If it is an operator, then do nothing
      typeof current_calculation[current_calculation.length - 1] === 'number'
    ) {
      current_calculation.pop();
      this.setState({
        current_item: current_calculation[current_calculation.length - 1],
        current_calculation: current_calculation
      });
    }
  };

  render() {
    return (
      <div className="App container">
        <div className="row">
          <table className="table">
            <tbody>
              <Display
                current_item={this.state.current_item}
                current_calculation={this.state.current_calculation}
              />
              <KeyPad
                numberClicked={this.numberClickHandler}
                operatorClicked={this.operatorClickHandler}
                acClicked={this.acClickHandler}
                ceClicked={this.ceClickHandler}
              />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
