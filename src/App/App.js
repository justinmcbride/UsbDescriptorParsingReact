import React from 'react';

import Container from 'react-bootstrap/Container';

import './App.css';
import HexLine from '../HexLine/HexLine';

const TOTAL_LINES = 10;

function hexline(values, iteration) {
  const offset = values.length * iteration;

  const newValues = [];
  values.map( value => newValues.push( value + offset ) );

  return (
      <HexLine values={ newValues }/>
  );
}

function App() {

  const values = [ 0, 1, 2, 3, 4, 5, 6, 7 ];
  const items = [];

  for ( let i = 0; i < TOTAL_LINES; i++ )
  {
      items.push( hexline(values, i) );
  }

  return (
    <Container>
      { items }
    </Container>
  );
}

export default App;
