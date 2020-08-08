import React from 'react';

import UsbDescriptor from './UsbDescriptor';


const UnknownDescriptor = ( { rawData } ) =>
{
  const dataView = new Uint8Array( rawData );

  return (
    <UsbDescriptor rawData={rawData}>
      <tr>
        <td>Remaining Data Length</td>
        <td>{dataView.length}</td>
      </tr>
    </UsbDescriptor>
  );
}

export default UnknownDescriptor;
