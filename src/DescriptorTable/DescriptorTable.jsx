import React from 'react';
import _ from 'lodash';

import Accordion from 'react-bootstrap/Accordion';

import UnknownDescriptor from '../UsbDescriptors/UnknownDescriptor';
import { ParseTree } from '../UsbDescriptors/DescriptorFactory';
import { RootNode } from '../UsbDescriptors/UsbNodes';

import './DescriptorTable.css';
import { useEffect } from 'react';

const DescriptorTable = ({rawData}) =>
{
  // return null;
  const parsedDevice = new RootNode();
  ParseTree( parsedDevice, rawData );

  const logger = useEffect(() => {
    const output = parsedDevice.PrintTreeFromHere(0);
    console.log( `-----------Parsed-----------` );
    console.log( output );
  });

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
          index={index}
          childrenNodes={descriptorList}>
        </UnknownDescriptor>
      );
    }
  };

  const descriptorList = TransformNodes( parsedDevice, 1 );

  return (
    <div class="descriptorContainer">
      <h1>Descriptors</h1>
      { descriptorList }
    </div>
  );
};

export default DescriptorTable;
