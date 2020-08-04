// import { UsbConstants } from './UsbConstants';
const UsbConstants = require('./UsbConstants');

class UsbBaseNode {
  constructor( rawData ) {
    this.rawData = new Uint8Array( rawData ).buffer;
    this.children = [];
  }

  bLength = () => {
    const dataView = new Uint8Array( this.rawData, 0, 1 );
    return dataView[0];
  }

  bDescriptorType = () => {
    const dataView = new Uint8Array( this.rawData, 1, 1 );
    return dataView[0];
  }

  Print = () => {
    console.log( `Base: rawData.length=${this.rawData.byteLength} bLength=${this.bLength()} bDescriptorType=[${this.bDescriptorType()}]` );
  }
};

class DeviceDescriptor extends UsbBaseNode {
  constructor( rawData ) {
    super( rawData );
  }

  Verify = () => {
    // TODO: verify structure is correct
    if ( this.rawData.byteLength !== 18 ) return false;
    return true;
  }

  idVendor = () => {
    const dataView = new Uint16Array( this.rawData, 8, 1 );
    return dataView[0];
  }

  idProduct = () => {
    const dataView = new Uint16Array( this.rawData, 10, 1 );
    return dataView[0];
  }

  Print = () => {
    console.log( `Device: verified=[${this.Verify()}] bLength=${this.bLength()} idVendor=[${this.idVendor()}] idProduct=[${this.idProduct()}]` );
  }
}

const NodeFactory = ( rawData, interfaceClass, subclass ) => {
  if( rawData.length < 2 ) {
    console.error( `Can't create node with not enough data: rawData.length=[${rawData.length}]` );
    return;
  }

  const bLength = rawData[0];
  const bDescriptorType = rawData[1];

  if( rawData.length < bLength ) {
    console.error( `Can't create node with not enough data: rawData.length=[${rawData.length}] bLength=[${bLength}]` );
    return;
  }

  if( bDescriptorType === UsbConstants.DescriptorType.Device )
  {
    return new DeviceDescriptor( rawData );
  }
  // else if( bDescriptorType === UsbConstants.DescriptorType.Configuration ) {
  // }
  // else if( bDescriptorType === UsbConstants.DescriptorType.Interface ) {
  // }
  else {
    return new UsbBaseNode( rawData );
  }
}

const ParseUsbDescriptors = (rawData) =>
{
  for( let currentOffset = 0; currentOffset < rawData.length; )
  {
    // check size
    if ( currentOffset + 2 >= rawData.length )
    {
      // bad data here...
      console.log( `Dangling data: currentOffset=[${currentOffset}] rawData.length=${rawData.length}` );
      return;
    }

    const bLength = rawData[currentOffset + 0];
    const bDescriptorType = rawData[currentOffset + 1];

    // console.log( `bLength=${bLength} bDescriptorType=${bDescriptorType}` );

    const thisDescriptor = rawData.slice( currentOffset, currentOffset + bLength ); 
    const newNode = NodeFactory( thisDescriptor );
    newNode.Print();

    currentOffset += bLength;

  }
}

// export default ParseUsbDescriptors;

exports.ParseUsbDescriptors = ParseUsbDescriptors;
