import React from 'react';

import './UsbDescriptor.css';

import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table'

const UsbDescriptor = ( { children, node, index } ) =>
{
  const dataView = new Uint8Array( node.rawData );

  let tableElement = null;
  if( children.length > 0 ) {
    tableElement =
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          { children }
        </tbody>
      </Table>
    ;
  }
  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={index}>
        {node.type}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={index}>
        <Card.Body>
          <span>Data Length: {dataView.byteLength}</span>
          { tableElement }
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

export default UsbDescriptor;
