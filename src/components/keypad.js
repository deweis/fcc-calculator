import React from 'react';
import Aux from '../hoc/Aux_/Aux_';
import './keypad.css';

const keypad = props => {
  return (
    <Aux>
      <tr>
        <td className="key">AC</td>
        <td className="key">CE</td>
        <td className="key" />
        <td className="key">*</td>
      </tr>
      <tr>
        <td className="key" onClick={() => props.clicked(7)}>
          7
        </td>
        <td className="key" onClick={() => props.clicked(8)}>
          8
        </td>
        <td className="key" onClick={() => props.clicked(9)}>
          9
        </td>
        <td className="key">/</td>
      </tr>
      <tr>
        <td className="key">4</td>
        <td className="key">5</td>
        <td className="key">6</td>
        <td className="key">+</td>
      </tr>
      <tr>
        <td className="key">1</td>
        <td className="key">2</td>
        <td className="key">3</td>
        <td className="key">-</td>
      </tr>
      <tr>
        <td className="key">-</td>
        <td className="key">0</td>
        <td className="key">.</td>
        <td className="key">=</td>
      </tr>
    </Aux>
  );
};

export default keypad;
