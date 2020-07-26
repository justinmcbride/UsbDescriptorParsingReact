import React from 'react';

import Row from 'react-bootstrap/Row';

import './DataLine.css';
import DataValue from '../DataValue/DataValue';

const DataLine = ( { mouseEnter, mouseLeave, index, values, style, whichHovered, valueChanged } ) => {
  // const [blah, setBlah] = useState( false );

  const onMouseEnter = (itemIndex) => {
    mouseEnter( index, itemIndex );
  };

  const onMouseLeave = (itemIndex) => {
    mouseLeave( index, itemIndex );
  };

  const createValue = (itemIndex) => {
    return (
      <DataValue
        key = { itemIndex }
        index = { itemIndex }
        value = { values[itemIndex] }
        style = { style }
        hovered = { whichHovered.row == index && whichHovered.column == itemIndex }
        mouseEnter = { onMouseEnter }
        mouseLeave = { onMouseLeave }
        valueChanged = { valueChanged }
      />
    );
  };

  const valueItems = [];
  for( let itemIndex = 0; itemIndex < values.length; itemIndex++ ) {
    valueItems.push( createValue( itemIndex ) );
  }
  return (
    <Row className = { whichHovered.row == index ? "RowHovered" : "RowNotHovered" }>
      { valueItems }
    </Row>
  );
}

export default DataLine;
  