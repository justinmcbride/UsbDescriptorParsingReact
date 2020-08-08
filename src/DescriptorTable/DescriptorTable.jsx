import React from 'react';

import UnknownDescriptor from '../UsbDescriptors/UnknownDescriptor';

const { ParseTree } = require('../UsbDescriptors/DescriptorFactory');
const { RootNode } = require('../UsbDescriptors/UsbNodes');

const DescriptorTable = ( {rawData} ) =>
{
  const parsedDevice = new RootNode();
  ParseTree( parsedDevice, rawData );
  const output = parsedDevice.PrintTreeFromHere(0);
  console.log( `-----------Parsed-----------` );
  console.log( output );

  const descriptorList = [];
  const TransformNodes = (node) => {
    if( node.rawData !== null && node.rawData.byteLength > 0 ) {
      descriptorList.push( <UnknownDescriptor rawData={node.rawData}/> );
    }
    for( let childNode of node.children ) {
      TransformNodes( childNode );
    }
  };
  TransformNodes( parsedDevice );

  return (
    <div>
      <h1>Descriptors</h1>
      { descriptorList }
    </div>
  );
};

export default DescriptorTable;
