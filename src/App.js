import React, { Component } from 'react';
import './App.css';
import Display from './components/display';
import KeyPad from './components/keypad';

class App extends Component {
  state = {
    current_item: 0,
    current_calculation: []
  };

  /* When a number has been clicked */
  numberClickHandler = number => {
    let currentCalculation = [...this.state.current_calculation];
    let currentItem = this.state.current_item;

    // first number after a calculation (I.e. a result has been calculated)
    if (currentCalculation.includes('=')) {
      return;
    }
    // first number or an additional number after another number has been typed
    else if (typeof this.state.current_item === 'number') {
      let arr =
        this.state.current_item === 0 && number === 0
          ? [0] // can't type more than one zero at the beginning of a number
          : this.state.current_item === 0 && number > 0
          ? [number] // first number > 0 is ok
          : [this.state.current_item, number]; // add numbers to the array

      currentItem = Number(arr.join(''));
      currentCalculation.splice(currentCalculation.length - 1, 1, currentItem);
    } // first number after an operator or decimal point
    else if (typeof this.state.current_item === 'string') {
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

  /* When the negate button has been clicked */
  negateClickHandler = () => {
    let currentCalculation = [...this.state.current_calculation];
    let currentItem = this.state.current_item;

    // handle negate on numbers
    if (typeof currentItem === 'number' && currentItem !== 0) {
      currentItem *= -1;
      if (currentCalculation.includes('=')) {
        currentCalculation = [currentItem];
      } else {
        currentCalculation.splice(
          currentCalculation.length - 1,
          1,
          currentItem
        );
      }
      this.setState({
        current_item: currentItem,
        current_calculation: currentCalculation
      });
    }
    // handle negate on decimals
    else if (
      typeof currentItem === 'string' &&
      currentItem.includes('.') &&
      Number(currentItem) !== 0
    ) {
      currentItem *= -1;
      currentCalculation.splice(currentCalculation.length - 1, 1, currentItem);
      this.setState({
        current_item: currentItem,
        current_calculation: currentCalculation
      });
    }
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
    const fixtheJSDecimalMathIssue = 10000000000000000;
    let result;
    switch (operator) {
      case '*':
        //result = num1 * num2;
        result =
          Math.round(num1 * num2 * fixtheJSDecimalMathIssue) /
          fixtheJSDecimalMathIssue;
        break;
      case '/':
        //result = num1 / num2;
        result =
          Math.round((num1 / num2) * fixtheJSDecimalMathIssue) /
          fixtheJSDecimalMathIssue;
        break;
      case '+':
        //result = num1 + num2;
        result =
          Math.round(
            num1 * fixtheJSDecimalMathIssue + num2 * fixtheJSDecimalMathIssue
          ) / fixtheJSDecimalMathIssue;
        break;
      default:
        //result = num1 - num2;
        result =
          Math.round(
            num1 * fixtheJSDecimalMathIssue - num2 * fixtheJSDecimalMathIssue
          ) / fixtheJSDecimalMathIssue;
    }
    return result;
  };

  /* Helper function (recursive) to calculate operations for [*, /] resp. [+, -] */
  reduceOperators = (calculation, operators) => {
    if (
      calculation.includes(operators[0]) ||
      calculation.includes(operators[1])
    ) {
      // look for min index of one of the two operators
      let arrIndexes = [
        calculation.indexOf(operators[0]),
        calculation.indexOf(operators[1])
      ];
      arrIndexes = arrIndexes.filter(x => x > 0); // remove -1's
      const minIndex = Math.min(...arrIndexes);

      // calculate that subset
      let resultTmp = this.calculate(
        Number(calculation[minIndex - 1]),
        calculation[minIndex],
        Number(calculation[minIndex + 1])
      );

      // Add the result to the main calculation
      calculation.splice(minIndex - 1, 3, resultTmp);

      // Look out for the next appearance of these operators
      this.reduceOperators(calculation, operators);
    } else {
      return calculation;
    }
    return calculation;
  };

  /* When the equal sign has been clicked */
  resultClickHandler = () => {
    console.log('To calculate: ' + this.state.current_calculation);
    if (
      this.state.current_calculation.length === 0 || // first a number has to be typed before an operator can be used
      this.state.current_calculation.includes('=') || // if there is an = already in the calculation quit (temp restriction)
      this.state.current_item === '0.' || // needs some more decimal items to proceed first
      this.isOperator(this.state.current_item) // cannot get a
    ) {
      return;
    }

    let currentCalculation = [...this.state.current_calculation];
    let result = [...currentCalculation];

    // calculate the multiplications/divisions
    if (result.includes('*') || result.includes('/')) {
      result = this.reduceOperators(result, ['*', '/']);
      console.log('Result after multiplications & divisions: ' + result);
    }

    // calculate the additions/subtractions
    if (result.includes('+') || result.includes('-')) {
      result = this.reduceOperators(result, ['+', '-']);
      console.log('Result after additions & subtractions: ' + result);
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
    let currentItem = this.state.current_item;
    // if only a number has been added so far
    if (currentCalculation.length === 1) {
      this.setState({ current_item: 0, current_calculation: [] });
    } else if (
      /* only clear when the last item in the calculation is a number (resp. a decimal)
         - If it is an operator or a result of a previous calculation; then do nothing */
      (typeof currentCalculation[currentCalculation.length - 1] === 'number' &&
        !currentCalculation.includes('=')) ||
      (typeof currentItem === 'string' && currentItem.includes('.'))
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
                negateClicked={this.negateClickHandler}
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
