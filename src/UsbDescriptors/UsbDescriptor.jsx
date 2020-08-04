import React from 'react';

const UsbDescriptor = ( { children, rawData } ) =>
{
  return (
    <div>
      <h1>Descriptor</h1>
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
            <td>{rawData[0]}</td>
          </tr>
          <tr>
            <td>bDescriptorType</td>
            <td>{rawData[1]}</td>
          </tr>
          { children }
        </tbody>
      </table>
    </div>
  );
}

export default UsbDescriptor;
