import React from 'react';

import UsbDescriptor from './UsbDescriptor';
import { Accordion } from 'react-bootstrap';

const UnknownDescriptor = ( { node, index, children } ) =>
{
  const fieldItems = [];
  
  if( node.fields && node.fields !== null ) {
    for( const field of node.fields ) {
      fieldItems.push(
        <tr key={field.field}>
          <td>{field.field}</td>
          <td>{node.retrieve(field.field)}</td>
        </tr>
      );
    }
  }

  // switch to map

  return (
    <UsbDescriptor node={node} key={index} index={index}>
      { fieldItems }
      <Accordion>
        { children }
      </Accordion>
    </UsbDescriptor>
  );
}

export default UnknownDescriptor;
