import React from 'react';

import UsbDescriptor from './UsbDescriptor';
import { Accordion } from 'react-bootstrap';

const UnknownDescriptor = ( { node, index, children, childrenNodes } ) =>
{
  const fieldItems = [];
  
  // map!
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
    <UsbDescriptor node={node} key={index} index={index} childrenNodes={childrenNodes}>
      { fieldItems }
      { children }
    </UsbDescriptor>
  );
}

export default UnknownDescriptor;
