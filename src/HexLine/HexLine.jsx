import React from 'react';

import Row from 'react-bootstrap/Row';

import './HexLine.css';
import HexValue from '../HexValue/HexValue';

class HexLine extends React.Component {
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
    // Create all of the individual values
    const valueItems = [];
    for( let itemIndex = 0; itemIndex < this.props.values.length; itemIndex++ ) {
      valueItems.push(
        <HexValue
          key = { itemIndex }
          index = { itemIndex }
          value = { this.props.values[itemIndex] }
          hovered = { this.props.whichHovered.row == this.props.index && this.props.whichHovered.column == itemIndex }
          mouseEnter = { this.onMouseEnter }
          mouseLeave = { this.onMouseLeave }
        />
      );
    }

    // Render them
    return (
      <Row className = { this.props.whichHovered.row == this.props.index ? "Hovered" : "NotHovered" }>
        { valueItems }
      </Row>
    );
  }
}

export default HexLine;
  