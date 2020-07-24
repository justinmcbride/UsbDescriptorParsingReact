import React from 'react';

import Container from 'react-bootstrap/Container';

import './App.css';
import HexLine from '../HexLine/HexLine';
import AsciiLine from '../AsciiLine/AsciiLine';

const TOTAL_LINES = 10;
  
class App extends React.Component {

  constructor(props) {
    super(props);
  }

  onMouseEnter(row, column) {
    console.log( `app informed of mouseEnter on [${row},${column}]`);
  }

  onMouseLeave(row, column) {
    console.log( `app informed of mouseLeave on [${row},${column}]`);
  }
  
  render() {
    const values = [ 0, 1, 2, 3, 4, 5, 6, 7 ];
    const hexRows = [];
    const asciiRows = [];

    for ( let rowIndex = 0; rowIndex < TOTAL_LINES; rowIndex++ )
    {
      const offset = values.length * rowIndex;
  
      const newValues = [];
      values.map( value => newValues.push( value + offset ) );
    
      hexRows.push( this.hexline(rowIndex, newValues) );
      asciiRows.push( this.asciiLine(rowIndex, newValues) );
    }
    
    return (
      <div>
        <Container>
          { hexRows }
        </Container>
        <Container>
          { asciiRows }
        </Container>
      </div>
    );
  }

  hexline(index, values) {
    return (
      <HexLine
        index = { index }
        values = { values }
        mouseEnter = { this.onMouseEnter }
        mouseLeave = { this.onMouseLeave }
      />
    );
  }
  
  asciiLine(index, values) {
    return (
      <AsciiLine
        values = { values }
      />
    );
  }
}
    
export default App;
