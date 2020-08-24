import React from 'react';

import UsbDescriptor from './UsbDescriptor';

function isIterable(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

const UnknownDescriptor = ( { rawData, description, type, fields } ) =>
{
  const dataView = new Uint8Array( rawData );

  const fieldItems = [];
  
  if( fields && fields !== null ) {
    for( const [key, value] of Object.entries(fields) ) {
      fieldItems.push(
        <tr key={key}>
          <td>{key}</td>
          <td>{value}</td>
        </tr>
      );
    }
  }

  return (
    <UsbDescriptor type={type} rawData={rawData} description={description}>
      { fieldItems }
    </UsbDescriptor>
  );
}

export default UnknownDescriptor;
