import React from 'react';

import UsbDescriptor from '../UsbDescriptors/UsbDescriptor';

const DescriptorTable = ( {rawData} ) =>
{
  return (
    <div>
      <h1>Descriptors</h1>
      <UsbDescriptor rawData={rawData}/>
    </div>
  );
};

export default DescriptorTable;
