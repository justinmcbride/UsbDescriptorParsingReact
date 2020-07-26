import React from 'react';

import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import './App.css';
import DataLine from '../DataLine/DataLine';

const NUMBER_ROWS = 10;
const NUMBERS_PER_ROW = 8;
  
class App extends React.Component {

  constructor(props) {
    super(props);

    const allValues = [];
    let currentValue = 33;
    for( let row = 0; row < NUMBER_ROWS; ++row )
    {
      const rowValues = [];

      for ( let column = 0; column < NUMBERS_PER_ROW; ++column ) {
        if ( row == NUMBER_ROWS-1 && column == NUMBERS_PER_ROW-1 ) continue;
        rowValues.push( currentValue++ );
      }

      allValues.push( rowValues );
    }

    this.state = {
      values: allValues,
      whichHovered: {
        row: null,
        column: null
      },
    };
  }

  onMouseEnter = (row, column) => {
    console.log( `app informed of mouseEnter on [${row},${column}]`);
    this.setState({
      whichHovered: {
        row: row,
        column: column
      },
    });
  }

  onMouseLeave = (row, column) => {
    // possible race condition here i guess?
    console.log( `app informed of mouseLeave on [${row},${column}]`);
    this.setState( {
      whichHovered: {
        row: null,
        column: null
      },
    });
  }
  
  render() {
    const hexRows = [];
    const asciiRows = [];

    // return <div>
    //   {Array(NUMBERS_PER_ROW).fill().map((it, idx) => {
    //     <row></row>
    //   })}      
    // </div>;

    for ( let rowIndex = 0; rowIndex < this.state.values.length; rowIndex++ )
    {
      const valueRow = this.state.values[rowIndex];
      hexRows.push( this.createDataLine(rowIndex, valueRow, "hex") );
      asciiRows.push( this.createDataLine(rowIndex, valueRow, "ascii") );
    }
    
    return (
      <div id="tableContainer">
        <div>
          <h1>Hexadecimal</h1>
          <Container className="dataContainer">
            { hexRows }
          </Container>
        </div>
        <div>
          <h1>ASCII</h1>
          <Container className="dataContainer">
            { asciiRows }
          </Container>
        </div>
      </div>
    );
  }

  createDataLine = (index, values, style) => {
    return (
      <DataLine
        key = { index }
        index = { index }
        values = { values }
        style = { style }
        whichHovered = { this.state.whichHovered }
        mouseEnter = { this.onMouseEnter }
        mouseLeave = { this.onMouseLeave }
      />
    );
  }
}
    
export default App;
