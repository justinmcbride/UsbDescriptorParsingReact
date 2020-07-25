import React from 'react';

import Row from 'react-bootstrap/Row';

import './AsciiLine.css';
import AsciiValue from '../AsciiValue/AsciiValue';

class AsciiLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      values: props.values
    };
  }

  onMouseEnter = (itemIndex) => {
    this.props.mouseEnter( this.state.index, itemIndex );
  }

  onMouseLeave = (itemIndex) => {
    this.props.mouseLeave( this.state.index, itemIndex );
  }

  render() {
    const valueItems = [];
    for( let itemIndex = 0; itemIndex < this.state.values.length; itemIndex++ ) {
      valueItems.push( this.createValue( itemIndex ) );
    }
    return (
      <Row className = { this.props.whichHovered.row == this.state.index ? "Hovered" : "NotHovered" }>
        { valueItems }
      </Row>
    );
  }

  createValue = (itemIndex) => {
    return (
      <AsciiValue
        key = { itemIndex }
        index = { itemIndex }
        value = { this.state.values[itemIndex] }
        hovered = { this.props.whichHovered.row == this.state.index && this.props.whichHovered.column == itemIndex }
        mouseEnter = { this.onMouseEnter }
        mouseLeave = { this.onMouseLeave }
      />
    );
  }
}

export default AsciiLine;
  