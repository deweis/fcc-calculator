import React, { Component } from 'react';
import './App.css';
import Display from './components/display';
import KeyPad from './components/keypad';

/*
  - ID user stories - Ids
  - Fix: 0.8 + 0.4 = 1.2000000000000002
*/
class App extends Component {
  state = {
    current_item: 0,
    current_calculation: []
  };

  /* When a number has been clicked */
  numberClickHandler = number => {
    let currentCalculation = [...this.state.current_calculation];
    let currentItem = this.state.current_item;

    // first number or an additional number after another number has been typed
    if (typeof this.state.current_item === 'number') {
      let arr =
        this.state.current_item === 0 && number === 0
          ? [0] // can't type more than one zero at the beginning of a number
          : this.state.current_item === 0 && number > 0
          ? [number] // first number > 0 is ok
          : [this.state.current_item, number]; // add numbers to the array

      currentItem = Number(arr.join(''));
      currentCalculation.splice(currentCalculation.length - 1, 1, currentItem);
      // first number after an operator
    } else if (typeof this.state.current_item === 'string') {
      if (currentItem.split('').includes('.')) {
        currentItem = currentItem + number;
        currentCalculation.splice(
          currentCalculation.length - 1,
          1,
          currentItem
        );
      } else {
        currentItem = number;
        currentCalculation.push(number);
      }
      // first number after a calculation (I.e. a result has been calculated)
    } else if (currentCalculation.includes('=')) {
      currentItem = number;
      currentCalculation = [number];
    }

    this.setState({
      current_item: currentItem,
      current_calculation: currentCalculation
    });
  };

  /* Helper function to evaluate if an item is an operator */
  isOperator = item => {
    return item === '+' || item === '-' || item === '*' || item === '/';
  };

  /* When decimal point has been clicked */
  decimalClickHandler = () => {
    let currentCalculation = [...this.state.current_calculation];
    let currentItem = this.state.current_item;
    if (
      // current item is an operator?
      this.isOperator(currentItem)
    ) {
      currentItem = '0.';
      currentCalculation.push(currentItem);
      this.setState({
        current_item: currentItem,
        current_calculation: currentCalculation
      });
    } else if (currentCalculation.includes('=')) {
      currentItem = '0.';
      currentCalculation = [currentItem];
      this.setState({
        current_item: currentItem,
        current_calculation: currentCalculation
      });
    } else if (
      // is there already a decimal point in the number?
      !String(currentItem)
        .split('')
        .includes('.')
    ) {
      currentItem = currentItem + '.';
      currentCalculation.splice(currentCalculation.length - 1, 1, currentItem);
      this.setState({
        current_item: currentItem,
        current_calculation: currentCalculation
      });
    }
  };

  /* Helper function to add an operator to the calculation */
  addOperator = (calculation, operator) => {
    // first operator typed
    if (
      typeof this.state.current_item === 'number' ||
      String(this.state.current_item)
        .split('')
        .includes('.')
    ) {
      calculation.push(operator);
      return calculation;
      // another operator typed - replaces the first operator
    } else if (this.isOperator(this.state.current_item)) {
      calculation.splice(calculation.length - 1, 1, operator);
      return calculation;
    }
  };

  /* When a operator has been clicked */
  operatorClickHandler = operator => {
    let currentCalculation = [...this.state.current_calculation];

    // first a number has to be typed before an operator can be used
    if (
      this.state.current_calculation.length === 0 ||
      this.state.current_item === '0.'
    ) {
      return;
      // if there is an = already in the calculation start a new calculation that operates on the result of the previous evaluation.
    } else if (this.state.current_calculation.includes('=')) {
      currentCalculation = [currentCalculation.pop()];
      currentCalculation.push(operator);
    } else {
      currentCalculation = this.addOperator(currentCalculation, operator);
    }

    this.setState({
      current_item: operator,
      current_calculation: currentCalculation
    });
  };

  /* Helper function to do a basic calculation */
  calculate = (num1, operator, num2) => {
    let result;
    switch (operator) {
      case '*':
        result = num1 * num2;
        break;
      case '/':
        result = num1 / num2;
        break;
      case '+':
        result = num1 + num2;
        break;
      default:
        result = num1 - num2;
    }
    return result;
  };

  /* Helper function (recursive) to calculate all operations for one operator */
  reduceOperator = (calculation, operator) => {
    if (calculation.includes(operator)) {
      // Extract a single calculation for the operator
      let calcTmp = calculation.slice(
        calculation.indexOf(operator) - 1,
        calculation.indexOf(operator) + 2
      );

      // Calculate this operation
      let resultTmp = this.calculate(
        Number(calcTmp[0]),
        calcTmp[1],
        Number(calcTmp[2])
      );

      // Add the result to the main calculation
      calculation.splice(calculation.indexOf(operator) - 1, 3, resultTmp);

      // Look out for the next appearance of that operator
      this.reduceOperator(calculation, operator);
    } else {
      return calculation;
    }
    return calculation;
  };

  /* When the equal sign has been clicked */
  resultClickHandler = () => {
    // first a number has to be typed before an operator can be used
    // if there is an = already in the calculation quit (temp restriction)
    if (
      this.state.current_calculation.length === 0 ||
      this.state.current_calculation.includes('=') ||
      this.state.current_item === '0.' ||
      this.isOperator(this.state.current_item)
    ) {
      return;
    }

    let currentCalculation = [...this.state.current_calculation];
    let result = [...currentCalculation];

    // calculate the multiplications
    if (result.includes('*')) {
      result = this.reduceOperator(result, '*');
      console.log('Result after multiplications:' + result);
    }

    // calculate the divisions
    if (result.includes('/')) {
      result = this.reduceOperator(result, '/');
      console.log('Result after divisions:' + result);
    }

    // calculate the additions
    if (result.includes('+')) {
      result = this.reduceOperator(result, '+');
      console.log('Result after additions:' + result);
    }

    // calculate the subtractions
    if (result.includes('-')) {
      result = this.reduceOperator(result, '-');
      console.log('Result after subtractions:' + result);
    }

    currentCalculation = this.addOperator(currentCalculation, '=');
    currentCalculation.push(Number(result));

    this.setState({
      current_item: Number(result),
      current_calculation: currentCalculation
    });
  };

  /* When the AC has been clicked */
  acClickHandler = () => {
    this.setState({ current_item: 0, current_calculation: [] });
  };

  /* When the CE has been clicked */
  ceClickHandler = () => {
    let currentCalculation = [...this.state.current_calculation];
    // if only a number has been added so far
    if (currentCalculation.length === 1) {
      this.setState({ current_item: 0, current_calculation: [] });
    } else if (
      // only clear when the last item in the calculation is a number. If it is an operator, then do nothing
      typeof currentCalculation[currentCalculation.length - 1] === 'number'
    ) {
      currentCalculation.pop();
      this.setState({
        current_item: currentCalculation[currentCalculation.length - 1],
        current_calculation: currentCalculation
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
                currentItem={this.state.current_item}
                currentCalculation={this.state.current_calculation}
              />
              <KeyPad
                numberClicked={this.numberClickHandler}
                decimalClicked={this.decimalClickHandler}
                operatorClicked={this.operatorClickHandler}
                resultClicked={this.resultClickHandler}
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
