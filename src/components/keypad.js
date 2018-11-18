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
        <td className="key">CE</td>
        <td className="key" />
        <td className="key">*</td>
      </tr>
      <tr>
        <td className="key" onClick={() => props.numberclicked(7)}>
          7
        </td>
        <td className="key" onClick={() => props.numberclicked(8)}>
          8
        </td>
        <td className="key" onClick={() => props.numberclicked(9)}>
          9
        </td>
        <td className="key">/</td>
      </tr>
      <tr>
        <td className="key" onClick={() => props.numberclicked(4)}>
          4
        </td>
        <td className="key" onClick={() => props.numberclicked(5)}>
          5
        </td>
        <td className="key" onClick={() => props.numberclicked(6)}>
          6
        </td>
        <td className="key">+</td>
      </tr>
      <tr>
        <td className="key" onClick={() => props.numberclicked(1)}>
          1
        </td>
        <td className="key" onClick={() => props.numberclicked(2)}>
          2
        </td>
        <td className="key" onClick={() => props.numberclicked(3)}>
          3
        </td>
        <td className="key">-</td>
      </tr>
      <tr>
        <td className="key">-</td>
        <td className="key" onClick={() => props.numberclicked(0)}>
          0
        </td>
        <td className="key">.</td>
        <td className="key">=</td>
      </tr>
    </Aux>
  );
};

export default keypad;
