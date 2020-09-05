import React, { useState } from 'react';

import _ from 'lodash';

import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import DataRow from '../DataRow/DataRow';

const DATA_VALUES_PER_ROW = 8;

const DataTable = ({dataValues, valueChanged}) => {
  const [displayStyle, setDisplayStyle] = useState("Hexadecimal");

  const onValueChanged = (itemIndex, newValue) => {
    valueChanged(itemIndex, newValue);
  };

  const rowCount = Math.ceil(dataValues.length / DATA_VALUES_PER_ROW);
  const rowIndexes = _.range(rowCount);

  const dataRows = rowIndexes.map(rowIdx => {
    const startIdx = rowIdx * DATA_VALUES_PER_ROW;
    const endIdx = Math.min(startIdx + DATA_VALUES_PER_ROW, dataValues.length);

    return (
      <DataRow
        rowSize={DATA_VALUES_PER_ROW}
        key={rowIdx}
        dataValues={dataValues.slice(startIdx, endIdx)}
        displayStyle={displayStyle}
        baseIndexOfRow={startIdx}
        valueChanged={onValueChanged}
      />
    );
  });

  const onDisplayStyleChange = (newDisplayStyle) => {
    console.log(`Selected new display type: ${newDisplayStyle}`);
    setDisplayStyle(newDisplayStyle);
  }

  return (
    <div>
      <ToggleButtonGroup name="dataType" type="radio" defaultValue={"Hexadecimal"} onChange={onDisplayStyleChange}>
        <ToggleButton value={"Decimal"}>Decimal</ToggleButton>
        <ToggleButton value={"Hexadecimal"}>Hex</ToggleButton>
        <ToggleButton value={"ASCII"}>ASCII</ToggleButton>
      </ToggleButtonGroup>
      <div>
        <h1>{displayStyle}</h1>
        <table className="dataContainer">
          { dataRows }
        </table>
      </div>
    </div>
  );
};

export default DataTable;
