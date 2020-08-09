import React from 'react';

const UsbDescriptor = ( { children, rawData, description } ) =>
{
  const dataView = new Uint8Array( rawData );
  return (
    <div>
      <h3>Descriptor</h3>
      <p>{description}</p>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>bLength</td>
            <td>{dataView[0]}</td>
          </tr>
          <tr>
            <td>bDescriptorType</td>
            <td>{dataView[1]}</td>
          </tr>
          { children }
        </tbody>
      </table>
    </div>
  );
}

export default UsbDescriptor;
