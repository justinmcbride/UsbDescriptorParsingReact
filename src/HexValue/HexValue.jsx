import React, { useState } from 'react';

import './HexValue.css';
import { findAllByPlaceholderText } from '@testing-library/react';

const HexValue = ( { index, value, mouseEnter, mouseLeave, valueChanged, hovered } ) => {
  let className = hovered ? "ValueHovered " : "ValueNotHovered ";
  className += "ValueHex";
  
  const getDisplayValue = () => {
    const minHex = Number(value).toString(16).toUpperCase();
    const finalHex = "00".substr(0, 2 - minHex.length) + minHex;
    return finalHex;
    // return `0x${ value.toString(16) }`;
  }

  const onMouseEnter = () => {
    // console.log( `value enter: index=${this.index} value=${this.state.value.toString(16)}` );
    mouseEnter( index );
  }

  const onMouseLeave = () => {
    // console.log( `value leave: index=${this.index} value=${this.state.value.toString(16)}` );
    mouseLeave( index );
  }

  const handleInputChanged = ( e ) => {
    const newValue = e.target.value;
    const asDecimal = parseInt( newValue, 16 );
    console.dir( `Value change: index=[${index}] newValue=[${newValue}] asDecimal=[${asDecimal}]` );
    valueChanged( index, asDecimal );
  }

  return (
    <div onMouseOver={ onMouseEnter } onMouseOut={ onMouseLeave } className="Value">
      <input type="text" name="value" className={ className } value={ getDisplayValue() } onChange={ handleInputChanged } />
    </div>
  );
}

export default HexValue;
  