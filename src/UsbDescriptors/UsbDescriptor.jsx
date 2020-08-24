import React from 'react';

import './UsbDescriptor.css';

const UsbDescriptor = ( { children, node } ) =>
{
  const dataView = new Uint8Array( node.rawData );

  let tableElement = null;
  if( children.length > 0 ) {
    tableElement =
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          { children }
        </tbody>
      </table>
    ;
  }
  return (
    <div>
      <h3>{node.type}</h3>
      <span>Data Length: {dataView.byteLength}</span>
      { tableElement }
    </div>
  );
}

export default UsbDescriptor;
