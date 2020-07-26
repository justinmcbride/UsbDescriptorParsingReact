import React, { useState } from 'react';

import './App.css';
import DataValue from '../DataValue/DataValue';

const NUMBER_OF_VALUES = 61;

const CreateFakeData = () => {
  const data = [];

  const baseValue = 33;
  for (let index = 0; index < NUMBER_OF_VALUES; ++index) {
    data.push(baseValue + index);
  }

  return data;
}

const App = () => {
  // TODO: optimize setValues from setting full array
  const [values, setValues] = useState(CreateFakeData());
  const [whichHovered, setWhichHovered] = useState();

  const onMouseEnter = (index) => {
    // console.log( `app informed of mouseEnter on [${row},${column}]`);
    setWhichHovered(index);
  };

  const onMouseLeave = (index) => {
    // possible race condition here i guess?
    // console.log( `app informed of mouseLeave on [${row},${column}]`);
    setWhichHovered(index);
  };

  const valueChanged = (itemIndex, newValue) => {
    setValues(
      values.map( (originalValue, index) =>
        index === itemIndex
        ? newValue
        : originalValue
      )
    );
  };

  const makeColumns = (values, baseIdx, dataStyle) => {
    return values.map( (value, colIdx) => {
      const actualIndex = baseIdx + colIdx;
      return <DataValue
        key = { actualIndex }
        index = { actualIndex }
        value = { value }
        dataStyle = { dataStyle }
        hovered = { whichHovered === actualIndex  }
        mouseEnter = { onMouseEnter }
        mouseLeave = { onMouseLeave }
        valueChanged = { valueChanged }
      />
    });
  };

  const itemsPerRow = 8; // TODO: window.clientWidth / fontSize / 0x00 4 char
  const rowCount = Math.ceil(values.length / itemsPerRow);
  const rowIndexes = [...Array(rowCount).keys()]; // range()

  return (
    <div id="tableContainer">
      <div className="hexContainer">
        <h1>Hexadecimal</h1>
        <div className="dataContainer">
          {rowIndexes.map( rowIdx => {
            const startIdx = rowIdx * itemsPerRow;
            const endIdx = Math.min(startIdx + itemsPerRow, values.length);   
            
            return makeColumns(values.slice(startIdx, endIdx), startIdx, "hex");
          })}
        </div>
      </div>
      <div className="asciiContainer">
        <h1>ASCII</h1>
        <div className="dataContainer">
          {rowIndexes.map( rowIdx => {
            const startIdx = rowIdx * itemsPerRow;
            const endIdx = Math.min(startIdx + itemsPerRow, values.length);   
            
            return makeColumns(values.slice(startIdx, endIdx), startIdx, "ascii");
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
