import React from 'react';
import Aux from '../hoc/Aux_/Aux_';
import './keypad.css';

const keypad = props => {
  return (
    <Aux>
      <tr>
        <td className="key" onClick={props.acClicked}>
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
        <td className="key" onClick={() => props.numberClicked(7)}>
          7
        </td>
        <td className="key" onClick={() => props.numberClicked(8)}>
          8
        </td>
        <td className="key" onClick={() => props.numberClicked(9)}>
          9
        </td>
        <td className="key" onClick={() => props.operatorClicked('/')}>
          /
        </td>
      </tr>
      <tr>
        <td className="key" onClick={() => props.numberClicked(4)}>
          4
        </td>
        <td className="key" onClick={() => props.numberClicked(5)}>
          5
        </td>
        <td className="key" onClick={() => props.numberClicked(6)}>
          6
        </td>
        <td className="key" onClick={() => props.operatorClicked('+')}>
          +
        </td>
      </tr>
      <tr>
        <td className="key" onClick={() => props.numberClicked(1)}>
          1
        </td>
        <td className="key" onClick={() => props.numberClicked(2)}>
          2
        </td>
        <td className="key" onClick={() => props.numberClicked(3)}>
          3
        </td>
        <td className="key" onClick={() => props.operatorClicked('-')}>
          -
        </td>
      </tr>
      <tr>
        <td className="key">-</td>
        <td className="key" onClick={() => props.numberClicked(0)}>
          0
        </td>
        <td className="key">.</td>
        <td className="key">=</td>
      </tr>
    </Aux>
  );
};

export default keypad;
