import React from 'react';

import UnknownDescriptor from '../UsbDescriptors/UnknownDescriptor';

import Accordion from 'react-bootstrap/Accordion';

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
  let index = 1;
  const TransformNodes = (node) => {
    if( node.type === "Root" ) {
      // skip
    }
    else {
      descriptorList.push(
        <UnknownDescriptor
          node={node}
          key={index}
          index={index}
        />
      );
      index++;
    }

    for( let childNode of node.children ) {
      TransformNodes( childNode );
    }
  };
  TransformNodes( parsedDevice );

  return (
    <div>
      <h1>Descriptors</h1>
      <Accordion>
        { descriptorList }
      </Accordion>
    </div>
  );
};

export default DescriptorTable;
