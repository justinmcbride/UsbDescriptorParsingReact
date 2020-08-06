const fs = require('fs');
const { ParseTree } = require('../src/UsbDescriptors/DescriptorFactory');
const { RootNode } = require('../src/UsbDescriptors/UsbNodes');

const ParseUsbDescriptors = (rawData) => {
  const parsedDevice = new RootNode();
  ParseTree( parsedDevice, rawData );
  const output = parsedDevice.PrintTreeFromHere(0);
  console.log( `-----------Parsed-----------` );
  console.log( output );
};

const main = async() => {
  const data = fs.readFileSync( 'testing/fixtures/descriptors_vid0x2bd9_pid0x11.bin' );
  console.log( `Working with this data: ${new Uint8Array( data )}` );
  ParseUsbDescriptors( data );
}

main();
