import React from 'react';

import Row from 'react-bootstrap/Row';

import AsciiValue from '../AsciiValue/AsciiValue';

class AsciiLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: props.values,
    };
  }
  
  render() {
    return (
      <Row>
        { this.state.values.map( value => <AsciiValue value={value}/> ) }
      </Row>
    );
  }
}

export default AsciiLine;
  