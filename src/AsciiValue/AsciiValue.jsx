import React from 'react';

import Col from 'react-bootstrap/Col';

import './AsciiValue.css';

class AsciiValue extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      editVisible: true
    };
  }

  getDisplayValue() {
    const value = this.state.value;
    if( 32 <= value && value <= 126 ) {
      return String.fromCharCode( this.state.value )
    }
    else {
      return ".";
    }
  }

  onMouseEnter = () => {
    // console.log( `value enter: index=${this.index} value=${this.state.value.toString(16)}` );
    this.props.mouseEnter( this.props.index );
  }

  onMouseLeave = () => {
    // console.log( `value leave: index=${this.index} value=${this.state.value.toString(16)}` );
    this.props.mouseLeave( this.props.index );
  }

  getClassName = () => {
    if( this.props.hovered ) {
      return "HoveredValue";
    }
    return "";
  }
  
  render() {
    return (
      <Col onMouseOver={ this.onMouseEnter } onMouseOut={ this.onMouseLeave } className={ this.getClassName() }>
        <span>{ this.getDisplayValue() }</span>
      </Col>
    );
  }
}
  
export default AsciiValue;
  