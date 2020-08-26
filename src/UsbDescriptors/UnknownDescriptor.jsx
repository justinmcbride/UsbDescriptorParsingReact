import React from 'react';
import _ from 'lodash';

import UsbDescriptor from './UsbDescriptor';

const UnknownDescriptor = ( { node, index, children, childrenNodes } ) =>
{
   const fieldItems = _.map(node.fields, (field, index) => {
    return(
      <tr key={index}>
        <td>{field.field}</td>
        <td>{node.retrieve(field.field)}</td>
      </tr>
    );
  });

  return (
    <UsbDescriptor node={node} key={index} index={index} childrenNodes={childrenNodes}>
      { fieldItems }
      { children }
    </UsbDescriptor>
  );
}

export default UnknownDescriptor;
