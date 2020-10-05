import React from 'react';

import UsbDescriptor from './UsbDescriptor';

const UnknownDescriptor = ({node, index, childrenNodes}) =>
{
  return (
    <UsbDescriptor node={node} key={index} index={index} childrenNodes={childrenNodes} title={node.type}>
    </UsbDescriptor>
  );
}

export default UnknownDescriptor;
