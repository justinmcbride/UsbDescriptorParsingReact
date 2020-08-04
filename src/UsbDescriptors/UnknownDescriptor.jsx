import React from 'react';

import UsbDescriptor from './UsbDescriptor';


const UnknownDescriptor = ( { rawData } ) =>
{
  return (
    <UsbDescriptor>
      <tr>
        <td>Remaining Data Length</td>
        <td>{rawData.length}</td>
      </tr>
    </UsbDescriptor>
  );
}

export default UnknownDescriptor;
