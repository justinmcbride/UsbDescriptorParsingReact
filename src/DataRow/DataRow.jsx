import React, { useState } from 'react';
import _ from 'lodash';

import DataValue from '../DataValue/DataValue';

const DataRow = ({dataValues, baseIndexOfRow, valueChanged, rowIndex, displayStyle, rowSize}) => {
  const [whichHovered, setWhichHovered] = useState();

  const onMouseEnter = (index) => {
    console.log( `app informed of mouseEnter on [${index}]`);
    setWhichHovered(index);
  };

  const onMouseLeave = (index) => {
    // possible race condition here i guess?
    console.log( `app informed of mouseLeave on [${index}]`);
    setWhichHovered(null);
  };

  const onValueChanged = (index, asDecimal) => {
    valueChanged(index, asDecimal);
  }

  const rowClassName = (whichHovered ? "DataRow RowHovered" : "DataRow RowNowHovered");
  
  const valueElements = dataValues.map((value, colIdx) => {
    const actualIndex = baseIndexOfRow + colIdx;

    return <DataValue
      key={actualIndex}
      index={actualIndex}
      value={value}
      displayStyle={displayStyle}
      mouseEnter={onMouseEnter}
      mouseLeave={onMouseLeave}
      valueChanged={onValueChanged}
    />
  });

  const emptySlots = rowSize - dataValues.length;
  const remainingElements = _.map(_.range(emptySlots), () => {
    return <td className="Value"></td>
  });

  valueElements.push(remainingElements);

  return(
    <tr className={rowClassName}>
      { valueElements }
    </tr>
  );
};

export default DataRow;
