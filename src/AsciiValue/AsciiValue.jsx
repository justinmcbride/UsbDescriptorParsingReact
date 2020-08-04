import React from 'react';

import './AsciiValue.css';

const AsciiValue = ( { index, value, mouseEnter, mouseLeave, valueChanged, hovered } ) => {
  let className = hovered ? "ValueHovered " : "ValueNotHovered ";
  className += "ValueAscii";
  
  const getDisplayValue = () => {
    if( 32 <= value && value <= 126 ) {
      return String.fromCharCode( value );
    }
    else {
      return ".";
    }
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
    const asDecimal = newValue.charCodeAt();
    console.dir( `Value change: index=[${index}] newValue=[${newValue}] asDecimal=[${asDecimal}]` );
    valueChanged( index, asDecimal );
  }

  return (
    <div onMouseOver={ onMouseEnter } onMouseOut={ onMouseLeave } className="Value">
      <input type="text" name="value" className={ className } value={ getDisplayValue() } onChange={ handleInputChanged } />
    </div>
  );
}

export default AsciiValue;
  