import React from 'react';
import _ from 'lodash';

import UsbDescriptor from './UsbDescriptor';

const InterfaceDescriptor = ({node, index, childrenNodes}) =>
{
  return (
    <UsbDescriptor
      node={node}
      key={index} index={index}
      childrenNodes={childrenNodes}
      title={`Interface: ${node.className}`}>
    </UsbDescriptor>
  );
}

export default InterfaceDescriptor;
