import React from 'react';
import _ from 'lodash';

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


  const TransformNodes = (node, index) => {

    const descriptorList = _.map(node.children, (childNode, index) => {
      return TransformNodes( childNode, index+1 );
    });

    if( node.type === "Root" ) {
      // don't create a card for root
      return (
        <Accordion>
          { descriptorList }
        </Accordion>
      );
    }
    else {
      return (
        <UnknownDescriptor
          node={node}
          key={index}
          index={index}>
            {descriptorList}
        </UnknownDescriptor>
      );
    }
  };

  const descriptorList = TransformNodes( parsedDevice, 1 );

  return (
    <div>
      <h1>Descriptors</h1>
      { descriptorList }
    </div>
  );
};

export default DescriptorTable;
