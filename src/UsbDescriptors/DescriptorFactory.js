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
  else if( bDescriptorType === UsbConstants.DescriptorType.Endpoint ) {
    return new Usb.EndpointDescriptor( rawData );
  }
  else if( bDescriptorType === UsbConstants.DescriptorType.SuperSpeedEndpointCompanion ) {
    return new Usb.SuperSpeedEndpointCompanionDescriptor( rawData );
  }
  else if ( bDescriptorType === UsbConstants.DescriptorType.InterfaceAssociation ) {
    return new Usb.InterfaceAssosciationDescriptor( rawData );
  }
  else {
    if( interfaceClass === UsbConstants.Uvc11.Class ) {
      if( bDescriptorType === UsbConstants.Uvc11.DescriptorType.Interface ) {
        const bDescriptorSubType = rawData[2];
        if( interfaceSubclass === UsbConstants.Uvc11.Subclass.VideoControl ) {
          if( bDescriptorSubType === UsbConstants.Uvc11.VcDescriptorSubType.Header ) {
            return new Uvc.UvcVcHeaderDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Uvc11.VcDescriptorSubType.InputTerminal ) {
            return new Uvc.UvcVcInputTerminalDecsriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Uvc11.VcDescriptorSubType.OutputTerminal ) {
            return new Uvc.UvcVcOutputTerminalDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Uvc11.VcDescriptorSubType.SelectorUnit ) {
            return new Uvc.UvcVcSelectorUnitDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Uvc11.VcDescriptorSubType.ProcessingUnit ) {
            return new Uvc.UvcVcProcessingUnitDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Uvc11.VcDescriptorSubType.ExtensionUnit ) {
            return new Uvc.UvcVcExtensionUnitDescriptor( rawData );
          }
        }
        else if( interfaceSubclass === UsbConstants.Uvc11.Subclass.VideoStreaming ) {
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
    return new Usb.UnknownDescriptor( rawData );
  }
};

const ParseFormatTree = ( currentNode, rawData, validChildren ) => {
  const dataView = new Uint8Array( rawData );
  for( let currentOffset = 0; currentOffset < dataView.length; ) {
    if( currentOffset + 2 >= dataView.length ) {
      console.log( `Dangling data: currentOffset=[${currentOffset}] dataView.length=[${dataView.length}]` );
      return currentOffset;
    }

    const bLength = dataView[currentOffset + 0];
    const bDescriptorType = dataView[currentOffset + 1];

    if( currentOffset + bLength > dataView.length ) {
      console.log( `Dangling data: currentOffset=[${currentOffset}] dataView.length=[${dataView.length}]` );
      return currentOffset;
    }

    const thisDescriptor = dataView.slice( currentOffset, currentOffset + bLength );
    const bDescriptorSubType = thisDescriptor[2];
    if( bDescriptorType !== UsbConstants.Uvc11.DescriptorType.Interface || !validChildren.includes( bDescriptorSubType ) )
    {
        // probably a sibling for the format
        return currentOffset;
    }

    const newChildNode = NodeFactory( thisDescriptor, UsbConstants.Uvc11.Class, UsbConstants.Uvc11.Subclass.VideoStreaming );

    currentNode.children.push( newChildNode );
    currentOffset += bLength;
  }
  
  // made it all the way to the end of rawData
  return rawData.length;
};

const ParseTree = ( currentNode, rawData, interfaceClass, interfaceSubclass ) => {
  const dataView = new Uint8Array( rawData );
  for( let currentOffset = 0; currentOffset < dataView.length; ) {
    if( currentOffset + 2 >= dataView.length ) {
      console.log( `Dangling data: currentOffset=[${currentOffset}] dataView.length=[${dataView.length}]` );
      return;
    }

    const bLength = dataView[currentOffset + 0];
    const bDescriptorType = dataView[currentOffset + 1];

    if( currentOffset + bLength > dataView.length ) {
      console.log( `Dangling data: currentOffset=[${currentOffset}] dataView.length=[${dataView.length}]` );
      return;
    }

    const thisDescriptor = dataView.slice( currentOffset, currentOffset + bLength );
    const newChildNode = NodeFactory( thisDescriptor, interfaceClass, interfaceSubclass );

    // Some special cases
    if( newChildNode instanceof Usb.ConfigurationDescriptor
        || newChildNode instanceof Uvc.UvcVsInputHeaderDescriptor ) {
      // at this point, we need to recursively add wTotalLength data under the current node.
      // we also substract the length of this descriptor from wTotalLength
      const indexBegin = currentOffset + newChildNode.bLength();
      const childDataLength = newChildNode.wTotalLength() - newChildNode.bLength();
      const indexEnd = indexBegin + childDataLength;

      const childData = dataView.slice( indexBegin, indexEnd );

      ParseTree( newChildNode, childData, interfaceClass, interfaceSubclass );
      currentOffset += childDataLength;
    }
    else if( newChildNode instanceof Usb.InterfaceDescriptor ) {
      // further parsing needs to know the context of which usb class we're operating in
      interfaceClass = newChildNode.bInterfaceClass();
      interfaceSubclass = newChildNode.bInterfaceSubClass();
      console.log( `New context: interfaceClass=[${interfaceClass}] interfaceSubclass=[${interfaceSubclass}]` );
    }
    else if( newChildNode instanceof Uvc.UvcVsFormatUncompressedDescriptor ) {
      const childData = dataView.slice( currentOffset + newChildNode.bLength() );
      const validChildren = [UsbConstants.Uvc11.VsDescriptorSubType.FrameUncompressed, UsbConstants.Uvc11.VsDescriptorSubType.ColorFormat ];
      const childrenLength = ParseFormatTree( newChildNode, childData, validChildren );
      currentOffset += childrenLength;
    }
    else if( newChildNode instanceof Uvc.UvcVsFormatMjpegDescriptor ) {
      const childData = dataView.slice( currentOffset + newChildNode.bLength() );
      const validChildren = [UsbConstants.Uvc11.VsDescriptorSubType.FrameMjpeg, UsbConstants.Uvc11.VsDescriptorSubType.ColorFormat ];
      const childrenLength = ParseFormatTree( newChildNode, childData, validChildren );
      currentOffset += childrenLength;
    }

    currentNode.children.push( newChildNode );
    currentOffset += bLength;
  }
}

module.exports = {
  NodeFactory: NodeFactory,
  ParseTree: ParseTree,
};
