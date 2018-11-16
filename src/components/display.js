import React from 'react';
import Aux from '../hoc/Aux_/Aux_';
import './display.css';

const display = props => {
  return (
    <Aux>
      <tr className="display display-main">
        <th colSpan="4" id="display">
          0
        </th>
      </tr>
      <tr className="display display-calc">
        <th colSpan="4" id="displayCalc">
          0
        </th>
      </tr>
    </Aux>
  );
};

export default display;
