import React from 'react';

import Row from 'react-bootstrap/Row';

import './DataLine.css';
import DataValue from '../DataValue/DataValue';

class DataLine extends React.Component {
  constructor(props) {
    super(props);
  }

  onMouseEnter = (itemIndex) => {
    this.props.mouseEnter( this.props.index, itemIndex );
  }

  onMouseLeave = (itemIndex) => {
    this.props.mouseLeave( this.props.index, itemIndex );
  }

  render() {
    const valueItems = [];
    for( let itemIndex = 0; itemIndex < this.props.values.length; itemIndex++ ) {
      valueItems.push( this.createValue( itemIndex ) );
    }
    return (
      <Row className = { this.props.whichHovered.row == this.props.index ? "RowHovered" : "RowNotHovered" }>
        { valueItems }
      </Row>
    );
  }

  createValue = (itemIndex) => {
    return (
      <DataValue
        key = { itemIndex }
        index = { itemIndex }
        value = { this.props.values[itemIndex] }
        style = { this.props.style }
        hovered = { this.props.whichHovered.row == this.props.index && this.props.whichHovered.column == itemIndex }
        mouseEnter = { this.onMouseEnter }
        mouseLeave = { this.onMouseLeave }
        valueChanged = { this.props.valueChanged }
      />
    );
  }
}

export default DataLine;
  