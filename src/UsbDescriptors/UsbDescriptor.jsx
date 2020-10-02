import React from 'react';
import _ from 'lodash';

import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table'

import './UsbDescriptor.css';

const UsbDescriptor = ( { children, node, index, childrenNodes, title } ) =>
{
  const verifiedElement = node.Verify()
    ? <Badge variant="success" className="float-right">Verified</Badge>
    : <Badge variant="warning" className="float-right">Not Verified</Badge>
  ;
  const childrenElement = childrenNodes.length > 0
    ? <Badge variant="info" className="float-right">{childrenNodes.length} Chidren</Badge>
    : null
  ;

  const allValues = _.map(node.fields, (field, index) => {
    return(
      <tr key={index}>
        <td>{field.field}</td>
        <td>{node.retrieve(field.field)}</td>
      </tr>
    );
  });

  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={index}>
        {title}{verifiedElement}{childrenElement}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={index}>
        <Card.Body>
          <p>Data Length: {node.rawData.byteLength}</p>
          <p>Raw Data: [{`${node.rawData}`}]</p>
          <Table bordered hover size="sm">
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              { allValues }
              { children }
            </tbody>
          </Table>
          <Accordion>
            { childrenNodes }
          </Accordion>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

export default UsbDescriptor;
