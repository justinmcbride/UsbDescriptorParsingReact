import React from 'react';

import UsbDescriptor from './UsbDescriptor';

const UnknownDescriptor = ( { node } ) =>
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

  return (
    <UsbDescriptor node={node}>
      { fieldItems }
    </UsbDescriptor>
  );
}

export default UnknownDescriptor;
