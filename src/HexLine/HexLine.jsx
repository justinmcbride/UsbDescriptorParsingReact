import React from 'react';

import Row from 'react-bootstrap/Row';

import HexValue from '../HexValue/HexValue';

class HexLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      values: props.values,
      hovered: true,
    };

    this.mouseEnter = props.mouseEnter;
    this.mouseLeave = props.mouseLeave;
  }

  onMouseEnter = (itemIndex) => {
    console.log( `line enter: index=${this.index} itemIndex=${itemIndex}` );
    // this.mouseEnter( this.index, itemIndex );
    this.setState( {
      hovered: true,
    });
  }

  onMouseLeave = (itemIndex) => {
    console.log( `line leave: index=${this.index} itemIndex=${itemIndex}` );
    // this.mouseLeave( this.index, itemIndex );
    this.setState( {
      hovered: false,
    });
  }
  
  render() {
    const valueItems = [];
    for( let itemIndex = 0; itemIndex < this.state.values.length; itemIndex++ ) {
      valueItems.push( this.createHexValue( itemIndex ) );
    }
    return (
      <Row className = { this.state.hovered ? "Hovered" : "NotHovered" }>
        { valueItems }
      </Row>
    );
  }

  createHexValue(itemIndex) {
    return (
      <HexValue
        index={ itemIndex }
        value={ this.state.values[itemIndex] }
        mouseEnter={ this.onMouseEnter }
        mouseLeave={ this.onMouseLeave }
      />
    );
  }
}

export default HexLine;
  