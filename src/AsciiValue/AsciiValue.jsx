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
  
  
  render() {
    return (
      <Col>
        <span> { String.fromCharCode( this.state.value ) }</span>
      </Col>
    );
  }
}
  
export default AsciiValue;
  