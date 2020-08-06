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
    return `Unknown: rawData.length=[${this.rawData.byteLength}] bLength=[${this.bLength()}] bDescriptorType=[${this.bDescriptorType()}]`;
  }
  
  PrintTreeFromHere = (tabLevel) => {
    let formattedOutput = "";
    const tabs = "  ".repeat(tabLevel);
    formattedOutput += tabs;
    formattedOutput += this.Print();
    formattedOutput += "\n"

    for( let child of this.children )
    {
      formattedOutput += child.PrintTreeFromHere(tabLevel + 1);
    }

    return formattedOutput;
  }

  ParseTree = ( rawData, interfaceClass, interfaceSubclass ) => {
    const dataView = new Uint8Array( rawData );
    for( let currentOffset = 0; currentOffset < dataView.length; ) {
      // check size
      if( currentOffset + 2 >= dataView.length ) {
        // bad data here...
        console.log( `Dangling data: currentOffset=[${currentOffset}] dataView.length=${dataView.length}` );
        return;
      }

      const bLength = dataView[currentOffset + 0];
      const bDescriptorType = dataView[currentOffset + 1];

      console.log( `bLength=[${bLength}] bDescriptorType=[${bDescriptorType}]` );

      const thisDescriptor = dataView.slice( currentOffset, currentOffset + bLength ); 
      const newChildNode = NodeFactory( thisDescriptor );

      // Some special cases
      if( bDescriptorType === UsbConstants.DescriptorType.Configuration ) {
        // at this point, we need to recursively add wTotalLength data under the configuration node.
        // we also substract the length of the config descriptor itself from wTotalLength
        const indexBegin = currentOffset + newChildNode.bLength();
        const childDataLength = newChildNode.wTotalLength() - newChildNode.bLength();
        const indexEnd = indexBegin + childDataLength;

        const childData = rawData.slice( indexBegin, indexEnd );

        newChildNode.ParseTree( childData, interfaceClass, interfaceSubclass );
        currentOffset += childDataLength;
      }
      else if( bDescriptorType === UsbConstants.DescriptorType.Interface ) {
        // further parsing needs to know the context of which usb class we're operating in
        interfaceClass = newChildNode.bInterfaceClass();
        interfaceSubclass = newChildNode.bInterfaceSubClass();
        console.log( `New context: interfaceClass=[${interfaceClass}] interfaceSubclass=[${interfaceSubclass}]` );
      }
      else {
        if( interfaceClass === UsbConstants.Uvc11.Class ) {
          if( bDescriptorType === UsbConstants.Uvc11.DescriptorType.Interface ) {
            if( interfaceSubclass === UsbConstants.Uvc11.Subclass.VideoControl ) {
              console.log( `-->VC` );
            }
            else if( interfaceSubclass === UsbConstants.Uvc11.Subclass.VideoStreaming ) {
              console.log( `-->VS` );
            }
          }
        }
      }

      this.children.push( newChildNode );
      currentOffset += bLength;
    }
  }
};

class RootNode extends UsbBaseNode {
  constructor( rawData ) {
    super( null );
    this.ParseTree( rawData );
  }

  Print = () => {
    return `Root`;
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
    return `Device: verified=[${this.Verify()}] bLength=[${this.bLength()}] idVendor=[${this.idVendor()}] idProduct=[${this.idProduct()}]`;
  }
};

class ConfigurationDescriptor extends UsbBaseNode {
  constructor( rawData ) {
    super( rawData );
  }

  Verify = () => {
    // TODO: verify structure is correct
    if ( this.rawData.byteLength !== 9 ) return false;
    return true;
  }

  wTotalLength = () => {
    const dataView = new Uint16Array( this.rawData, 2, 1 );
    return dataView[0];
  }

  Print = () => {
    return `Configuration: verified=[${this.Verify()}] bLength=[${this.bLength()}] wTotalLength=[${this.wTotalLength()}]`;
  }
}

class InterfaceDescriptor extends UsbBaseNode {
  constructor( rawData ) {
    super( rawData );
  }

  bInterfaceNumber = () => {
    const dataView = new Uint8Array( this.rawData, 2, 1 );
    return dataView[0];
  }

  bAlternateSetting = () => {
    const dataView = new Uint8Array( this.rawData, 3, 1 );
    return dataView[0];
  }

  bNumEndpoints = () => {
    const dataView = new Uint8Array( this.rawData, 4, 1 );
    return dataView[0];
  }

  bInterfaceClass = () => {
    const dataView = new Uint8Array( this.rawData, 5, 1 );
    return dataView[0];
  }

  bInterfaceSubClass = () => {
    const dataView = new Uint8Array( this.rawData, 6, 1 );
    return dataView[0];
  }

  Verify = () => {
    if ( this.rawData.byteLength !== 9 ) return false;
    return true;
  }

  Print = () => {
    return `Interface: verified=[${this.Verify()}] bLength=[${this.bLength()}] bInterfaceNumber=[${this.bInterfaceNumber()}] bAlternateSetting=[${this.bAlternateSetting()}] bInterfaceClass=[${this.bInterfaceClass()}] bInterfaceSubClass=[${this.bInterfaceSubClass()}]`;
  }
};

const NodeFactory = ( rawData, interfaceClass, interfaceSubclass ) => {
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

  if( bDescriptorType === UsbConstants.DescriptorType.Device ) {
    return new DeviceDescriptor( rawData );
  }
  else if( bDescriptorType === UsbConstants.DescriptorType.Configuration ) {
    return new ConfigurationDescriptor( rawData );
  }
  else if( bDescriptorType === UsbConstants.DescriptorType.Interface ) {
    return new InterfaceDescriptor( rawData );
  }
  else {
    return new UsbBaseNode( rawData );
  }
};

const ParseUsbDescriptors = (rawData) =>
{
  const parsedDevice = new RootNode(rawData);
  const output = parsedDevice.PrintTreeFromHere(0);
  console.log( `-----------Parsed-----------` );
  console.log( output );
};

// export default ParseUsbDescriptors;

exports.ParseUsbDescriptors = ParseUsbDescriptors;
