import React from 'react';
import _ from 'lodash';

import UsbDescriptor from './UsbDescriptor';

const DeviceDescriptor = ({node, index, childrenNodes}) =>
{
  return (
    <UsbDescriptor node={node} key={index} index={index} childrenNodes={childrenNodes} title="Device">
      <tr key={index}>
        <td>bcdUSB</td>
        <td>{node.bcdUSB()}</td>
      </tr>
    </UsbDescriptor>
  );
}

export default DeviceDescriptor;
