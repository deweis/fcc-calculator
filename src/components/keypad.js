import React from 'react';
import Aux from '../hoc/Aux_/Aux_';
import './keypad.css';

const keypad = props => {
  return (
    <Aux>
      <tr>
        <td id="clear" className="key" onClick={props.acClicked}>
          AC
        </td>
        <td className="key" onClick={props.ceClicked}>
          CE
        </td>
        <td className="key" />
        <td className="key" onClick={() => props.operatorClicked('*')}>
          *
        </td>
      </tr>
      <tr>
        <td id="seven" className="key" onClick={() => props.numberClicked(7)}>
          7
        </td>
        <td id="eight" className="key" onClick={() => props.numberClicked(8)}>
          8
        </td>
        <td id="nine" className="key" onClick={() => props.numberClicked(9)}>
          9
        </td>
        <td className="key" onClick={() => props.operatorClicked('/')}>
          /
        </td>
      </tr>
      <tr>
        <td id="four" className="key" onClick={() => props.numberClicked(4)}>
          4
        </td>
        <td id="five" className="key" onClick={() => props.numberClicked(5)}>
          5
        </td>
        <td id="six" className="key" onClick={() => props.numberClicked(6)}>
          6
        </td>
        <td className="key" onClick={() => props.operatorClicked('+')}>
          +
        </td>
      </tr>
      <tr>
        <td id="one" className="key" onClick={() => props.numberClicked(1)}>
          1
        </td>
        <td id="two" className="key" onClick={() => props.numberClicked(2)}>
          2
        </td>
        <td id="three" className="key" onClick={() => props.numberClicked(3)}>
          3
        </td>
        <td className="key" onClick={() => props.operatorClicked('-')}>
          -
        </td>
      </tr>
      <tr>
        <td className="key">-</td>
        <td id="zero" className="key" onClick={() => props.numberClicked(0)}>
          0
        </td>
        <td className="key">.</td>
        <td id="equals" className="key" onClick={() => props.resultClicked()}>
          =
        </td>
      </tr>
    </Aux>
  );
};

export default keypad;
