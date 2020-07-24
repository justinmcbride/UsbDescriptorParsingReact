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
  
  
  render() {
    return (
      <Col>
        <span> { this.getDisplayValue() }</span>
      </Col>
    );
  }
}
  
export default AsciiValue;
  