import React from 'react';
import Aux from '../hoc/Aux_/Aux_';
import './display.css';

const display = props => {
  return (
    <Aux>
      <tr className="display display-main">
        <th colSpan="4" id="display">
          {props.current_calculation}
        </th>
      </tr>
      <tr className="display display-calc">
        <th colSpan="4" id="displayCalc">
          {props.current_item}
        </th>
      </tr>
    </Aux>
  );
};

export default display;
