import React, { useState, useCallback } from 'react';
import Dropzone from 'react-dropzone'
import Download from '@axetroy/react-download';

import './App.css';
import HexValue from '../HexValue/HexValue';
import AsciiValue from '../AsciiValue/AsciiValue';

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

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
      // Do whatever you want with the file contents
        const byteArray = reader.result;
        const typedArray = new Uint8Array(byteArray);
        const array = [...typedArray];
        setValues(array);
      }
      reader.readAsArrayBuffer(file);
    })
    
  }, [])

  const onMouseEnter = (index) => {
    // console.log( `app informed of mouseEnter on [${row},${column}]`);
    setWhichHovered(index);
  };

  const onMouseLeave = (index) => {
    // possible race condition here i guess?
    // console.log( `app informed of mouseLeave on [${row},${column}]`);
    setWhichHovered(null);
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

  const makeRows = (dataStyle) => {
    const itemsPerRow = 16; // TODO: window.clientWidth / fontSize / 0x00 4 char
    const rowCount = Math.ceil(values.length / itemsPerRow);
    const rowIndexes = [...Array(rowCount).keys()]; // range()

    return rowIndexes.map( rowIdx => {
      const startIdx = rowIdx * itemsPerRow;
      const endIdx = Math.min(startIdx + itemsPerRow, values.length);

      const rowClassName = ( whichHovered && whichHovered >= startIdx && whichHovered < endIdx ) ? "DataRow RowHovered" : "DataRow RowNowHovered";
    
      return (
        <div key = { rowIdx } className = { rowClassName }>
          { makeColumns(values.slice(startIdx, endIdx), startIdx, dataStyle) }
        </div>
      );
    })
  }

  const makeColumns = (values, baseIdx, dataStyle) => {
    return values.map( (value, colIdx) => {
      const actualIndex = baseIdx + colIdx;
      if ( dataStyle === "ascii" ) {
        return <AsciiValue
          key = { actualIndex }
          index = { actualIndex }
          value = { value }
          dataStyle = { dataStyle }
          hovered = { whichHovered === actualIndex  }
          mouseEnter = { onMouseEnter }
          mouseLeave = { onMouseLeave }
          valueChanged = { valueChanged }
        />
      }
      else if ( dataStyle === "hex" ) {
        return <HexValue
          key = { actualIndex }
          index = { actualIndex }
          value = { value }
          dataStyle = { dataStyle }
          hovered = { whichHovered === actualIndex  }
          mouseEnter = { onMouseEnter }
          mouseLeave = { onMouseLeave }
          valueChanged = { valueChanged }
        />
      }
    });
  };

  return (
    <div>
      <Dropzone onDrop={onDrop}>
        {({getRootProps, getInputProps}) => (
          <section>
            <span {...getRootProps()}>
              <input {...getInputProps()} />
              <button type="button">Import</button>
            </span>
          </section>
        )}
      </Dropzone>
      <Download file="export.bin" content={ new Uint8Array(values) }>
          <button type="button">Export</button>
        </Download>
      <div id="tableContainer">
        <div className="hexContainer">
          <h1>Hexadecimal</h1>
          <div className="dataContainer">
            { makeRows("hex") }
          </div>
        </div>
        <div className="asciiContainer">
          <h1>ASCII</h1>
          <div className="dataContainer">
            { makeRows("ascii") }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
