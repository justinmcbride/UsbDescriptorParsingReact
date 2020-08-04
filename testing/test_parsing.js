const fs = require('fs');

const {ParseUsbDescriptors} = require( '../src/UsbDescriptors/DescriptorFactory.jsx' );

const main = async() => {
  const data = fs.readFileSync( 'testing/fixtures/descriptors_vid0x2bd9_pid0x11.bin' );
  console.log( data );
  ParseUsbDescriptors( data );
}

main();
