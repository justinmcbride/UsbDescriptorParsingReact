const UsbConstants = require('./UsbConstants');

const Usb = require( './UsbNodes' );
const Uvc = require( './VideoClass' );


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
    return new Usb.DeviceDescriptor( rawData );
  }
  else if( bDescriptorType === UsbConstants.DescriptorType.Configuration ) {
    return new Usb.ConfigurationDescriptor( rawData );
  }
  else if( bDescriptorType === UsbConstants.DescriptorType.Interface ) {
    return new Usb.InterfaceDescriptor( rawData );
  }
  else {
    if( interfaceClass === UsbConstants.Uvc11.Class ) {
      if( bDescriptorType === UsbConstants.Uvc11.DescriptorType.Interface ) {
        const bDescriptorSubType = rawData[2];
        if( interfaceSubclass === UsbConstants.Uvc11.Subclass.VideoControl ) {
          console.log( `-->VC` );
        }
        else if( interfaceSubclass === UsbConstants.Uvc11.Subclass.VideoStreaming ) {
          console.log( `-->VS` );
          if( bDescriptorSubType === UsbConstants.Uvc11.VsDescriptorSubType.InputHeader ) {
            return new Uvc.UvcVsInputHeaderDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Uvc11.VsDescriptorSubType.FormatUncompressed ) {
            return new Uvc.UvcVsFormatUncompressedDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Uvc11.VsDescriptorSubType.FrameUncompressed ) {
            return new Uvc.UvcVsFrameUncompressedDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Uvc11.VsDescriptorSubType.FormatMjpeg ) {
            return new Uvc.UvcVsFormatMjpegDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Uvc11.VsDescriptorSubType.FrameMjpeg ) {
            return new Uvc.UvcVsFrameMjpegDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Uvc11.VsDescriptorSubType.ColorFormat ) {
            return new Uvc.UvcVsColorFormatDescriptor( rawData );
          }
        }
      }
    }
    return new Usb.UsbBaseNode( rawData );
  }
};

const ParseTree = ( currentNode, rawData, interfaceClass, interfaceSubclass ) => {
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
    const newChildNode = NodeFactory( thisDescriptor, interfaceClass, interfaceSubclass );

    // Some special cases
    if( newChildNode instanceof Usb.ConfigurationDescriptor ) {
      // at this point, we need to recursively add wTotalLength data under the configuration node.
      // we also substract the length of the config descriptor itself from wTotalLength
      const indexBegin = currentOffset + newChildNode.bLength();
      const childDataLength = newChildNode.wTotalLength() - newChildNode.bLength();
      const indexEnd = indexBegin + childDataLength;

      const childData = rawData.slice( indexBegin, indexEnd );

      ParseTree( newChildNode, childData, interfaceClass, interfaceSubclass );
      currentOffset += childDataLength;
    }
    else if( newChildNode instanceof Usb.InterfaceDescriptor ) {
      // further parsing needs to know the context of which usb class we're operating in
      interfaceClass = newChildNode.bInterfaceClass();
      interfaceSubclass = newChildNode.bInterfaceSubClass();
      console.log( `New context: interfaceClass=[${interfaceClass}] interfaceSubclass=[${interfaceSubclass}]` );
    }
    else if( newChildNode instanceof Uvc.UvcVsInputHeaderDescriptor ) {
      const indexBegin = currentOffset + newChildNode.bLength();
      const childDataLength = newChildNode.wTotalLength() - newChildNode.bLength();
      const indexEnd = indexBegin + childDataLength;

      const childData = rawData.slice( indexBegin, indexEnd );

      ParseTree( newChildNode, childData, interfaceClass, interfaceSubclass );
      currentOffset += childDataLength;
    }
    else if( newChildNode instanceof Uvc.UvcVsFormatUncompressedDescriptor ) {
      const childData = rawData.slice( currentOffset + newChildNode.bLength() );

      // iterate until a non-child type is found
      let childOffset = 0;
      while( childOffset < childData.length )
      {
        const bLength = childData[childOffset + 0];
        const bDescriptorType = childData[childOffset + 1];
        if ( bDescriptorType !== UsbConstants.Uvc11.DescriptorType.Interface ) {
          currentOffset += childOffset;
          break;
        }

        const bDescriptorSubType = childData[childOffset + 2];

        if( bDescriptorSubType !== UsbConstants.Uvc11.VsDescriptorSubType.FrameUncompressed
            && bDescriptorSubType !== UsbConstants.Uvc11.VsDescriptorSubType.ColorFormat )
        {
            // probably a sibling for the format
            currentOffset += childOffset;
            break;
        }

        const childDescriptor = childData.slice( childOffset, childOffset + bLength );
        const subnode = NodeFactory( childDescriptor, interfaceClass, interfaceSubclass );

        newChildNode.children.push( subnode );
        childOffset += bLength;
      }
    }

    currentNode.children.push( newChildNode );
    currentOffset += bLength;
  }
}

module.exports = {
  NodeFactory: NodeFactory,
  ParseTree: ParseTree,
};
