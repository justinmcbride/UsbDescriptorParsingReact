import React, { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './DataValue.css';

const DataValue = ( { index, style, value, mouseEnter, mouseLeave, valueChanged, hovered } ) => {
  const [editEnabled, setEditEnabled] = useState(false);

  const className = hovered ? "Value ValueHovered" : "Value ValueNotHovered";
  
  const getDisplayValue = () => {
    if( style == "hex" ) {
      return `0x${ value.toString(16) }`;
    }
    else if ( style == "ascii" ) {
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
    valueChanged( value + 1 );
  }
  
  const valueDown = () => {
    valueChanged( value + 1 );
  }
  
  const toggleEditable = () => {
    setEditEnabled( !editEnabled );
  }

  return (
    <Col onMouseOver={ onMouseEnter } onMouseOut={ onMouseLeave } className={ className }>
      {/* <Button variant="danger" size="sm" disabled={this.state.editEnabled} onClick={ () => this.valueDown() }>🡓</Button> */}
      <span onClick={ () => toggleEditable() }>{ getDisplayValue() }</span>
      {/* <Button variant="success" size="sm" disabled={this.state.editEnabled} onClick={ () => this.valueUp() } >🡑</Button> */}
    </Col>
  );
}

export default DataValue;
  