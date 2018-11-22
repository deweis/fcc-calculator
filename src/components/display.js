import React from 'react';
import Aux from '../hoc/Aux_/Aux_';
import './display.css';

const display = props => {
  /* Make the font-size smaller the longer the calculation gets to stay within the display size */
  const calcLength = props.currentCalculation.join(' ').length;
  const fontSizes =
    calcLength < 16 ? 2.4 : calcLength < 20 ? 2.0 : calcLength < 25 ? 1.5 : 1.0;
  const styles = { fontSize: `${fontSizes}em` };

  return (
    <Aux>
      <tr>
        <th colSpan="4" id="display" className="display">
          <p className="display-main" style={styles}>
            {props.currentCalculation.join(' ')}
          </p>
          <p className="display-calc">{props.currentItem}</p>
        </th>
      </tr>
    </Aux>
  );
};

export default display;
