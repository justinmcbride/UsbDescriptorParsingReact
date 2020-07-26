import React, { useState } from 'react';

import './DataValue.css';

// const DISABLE_BUTTONS = true;
const DISABLE_BUTTONS = false;

const DataValue = ( { index, dataStyle, value, mouseEnter, mouseLeave, valueChanged, hovered } ) => {
  const [editEnabled, setEditEnabled] = useState(false);

  let className = hovered ? "Value ValueHovered " : "Value ValueNotHovered ";
  className += ( dataStyle === "ascii" ? "ValueAscii" : "ValueHex" );
  
  const getDisplayValue = () => {
    if( dataStyle === "hex" ) {
      return `0x${ value.toString(16) }`;
    }
    else if ( dataStyle === "ascii" ) {
      if( 32 <= value && value <= 126 ) {
        return String.fromCharCode( value );
      }
      else {
        return ".";
      }
    }
    else {
      return `${ value }`;
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

  const valueUp = () => {
    valueChanged( index, value + 1 );
  }
  
  const valueDown = () => {
    valueChanged( index, value - 1 );
  }
  
  const toggleEditable = () => {
    setEditEnabled( !editEnabled );
  }

  const buttonStyle = ( dataStyle !== "hex" || DISABLE_BUTTONS ) ? { display: "none" } : {};

  return (
    <div onMouseOver={ onMouseEnter } onMouseOut={ onMouseLeave } className={ className }>
      <button variant="danger" size="sm" disabled={ !editEnabled } style={ buttonStyle } onClick={ valueDown }>🡓</button>
      <span onClick={ toggleEditable }>{ getDisplayValue() }</span>
      <button variant="success" size="sm" disabled={ !editEnabled } style={ buttonStyle } onClick={ valueUp } >🡑</button>
    </div>
  );
}

export default DataValue;
  