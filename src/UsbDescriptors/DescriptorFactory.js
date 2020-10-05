import UsbConstants from './UsbConstants';

import * as Usb from './UsbNodes';
import * as Uvc from './VideoClass';
import * as Uac from './AudioClass';

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
    if( interfaceClass === UsbConstants.Class.Video.value ) {
      if( bDescriptorType === UsbConstants.Class.Video.DescriptorType.Interface ) {
        const bDescriptorSubType = rawData[2];
        if( interfaceSubclass === UsbConstants.Class.Video.Subclass.VideoControl ) {
          if( bDescriptorSubType === UsbConstants.Class.Video.VcDescriptorSubType.Header ) {
            return new Uvc.UvcVcHeaderDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Class.Video.VcDescriptorSubType.InputTerminal ) {
            return new Uvc.UvcVcInputTerminalDecsriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Class.Video.VcDescriptorSubType.OutputTerminal ) {
            return new Uvc.UvcVcOutputTerminalDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Class.Video.VcDescriptorSubType.SelectorUnit ) {
            return new Uvc.UvcVcSelectorUnitDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Class.Video.VcDescriptorSubType.ProcessingUnit ) {
            return new Uvc.UvcVcProcessingUnitDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Class.Video.VcDescriptorSubType.ExtensionUnit ) {
            return new Uvc.UvcVcExtensionUnitDescriptor( rawData );
          }
        }
        else if( interfaceSubclass === UsbConstants.Class.Video.Subclass.VideoStreaming ) {
          if( bDescriptorSubType === UsbConstants.Class.Video.VsDescriptorSubType.InputHeader ) {
            return new Uvc.UvcVsInputHeaderDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Class.Video.VsDescriptorSubType.FormatUncompressed ) {
            return new Uvc.UvcVsFormatUncompressedDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Class.Video.VsDescriptorSubType.FrameUncompressed ) {
            return new Uvc.UvcVsFrameUncompressedDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Class.Video.VsDescriptorSubType.FormatMjpeg ) {
            return new Uvc.UvcVsFormatMjpegDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Class.Video.VsDescriptorSubType.FrameMjpeg ) {
            return new Uvc.UvcVsFrameMjpegDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Class.Video.VsDescriptorSubType.ColorFormat ) {
            return new Uvc.UvcVsColorFormatDescriptor( rawData );
          }
        }
      }
    }
    else if( interfaceClass === UsbConstants.Class.Audio.value ) {
      if( bDescriptorType === UsbConstants.Class.Audio.DescriptorType.Interface ) {
        const bDescriptorSubType = rawData[2];
        if( interfaceSubclass === UsbConstants.Class.Audio.Subclass.AudioControl ) {
          if( bDescriptorSubType === UsbConstants.Class.Audio.AcDescriptorSubType.Header ) {
            return new Uac.UacAcHeaderDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Class.Video.VcDescriptorSubType.InputTerminal ) {
            return new Uac.UacAcInputTerminalDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Class.Video.VcDescriptorSubType.OutputTerminal ) {
            return new Uac.UacAcOutputTerminalDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Class.Video.VcDescriptorSubType.MixerUnit ) {
            return new Uac.UacAcMixerUnitDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Class.Video.VcDescriptorSubType.SelectorUnit ) {
            return new Uac.UacAcSelectorUnitDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Class.Video.VcDescriptorSubType.FeatureUnit ) {
            return new Uac.UacAcFeatureUnitDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Class.Video.VcDescriptorSubType.ProcessingUnit ) {
            return new Uac.UacAcProcessingUnitDescriptor( rawData );
          }
          else if( bDescriptorSubType === UsbConstants.Class.Video.VcDescriptorSubType.ExtensionUnit ) {
            return new Uac.UacAcExtensionUnitDescriptor( rawData );
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
    if( bDescriptorType !== UsbConstants.Class.Video.DescriptorType.Interface || !validChildren.includes( bDescriptorSubType ) )
    {
        // probably a sibling for the format
        return currentOffset;
    }

    const newChildNode = NodeFactory( thisDescriptor, UsbConstants.Class.Video.value, UsbConstants.Class.Video.Subclass.VideoStreaming );

    currentNode.children.push( newChildNode );
    currentOffset += bLength;
  }
  
  // made it all the way to the end of rawData
  return rawData.length;
};

export const ParseTree = ( currentNode, rawData, interfaceClass, interfaceSubclass ) => {
  const dataView = new Uint8Array( rawData );
  for( let currentOffset = 0; currentOffset < dataView.length; ) {
    if( currentOffset + 2 >= dataView.length ) {
      console.log( `Dangling data: currentOffset=[${currentOffset}] dataView.length=[${dataView.length}]` );
      return;
    }

    const bLength = dataView[currentOffset + 0];
    // const bDescriptorType = dataView[currentOffset + 1];

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
      const childDataLength = newChildNode.retrieve(`wTotalLength`) - newChildNode.bLength();
      const indexEnd = indexBegin + childDataLength;

      const childData = dataView.slice( indexBegin, indexEnd );

      ParseTree( newChildNode, childData, interfaceClass, interfaceSubclass );
      currentOffset += childDataLength;
    }
    else if( newChildNode instanceof Usb.InterfaceDescriptor ) {
      // further parsing needs to know the context of which usb class we're operating in
      interfaceClass = newChildNode.retrieve(`bInterfaceClass`);
      interfaceSubclass = newChildNode.retrieve(`bInterfaceSubClass`);
      console.log( `New context: interfaceClass=[${interfaceClass}] interfaceSubclass=[${interfaceSubclass}]` );
    }
    else if( newChildNode instanceof Uvc.UvcVsFormatUncompressedDescriptor ) {
      const childData = dataView.slice( currentOffset + newChildNode.bLength() );
      const validChildren = [UsbConstants.Class.Video.VsDescriptorSubType.FrameUncompressed, UsbConstants.Class.Video.VsDescriptorSubType.ColorFormat ];
      const childrenLength = ParseFormatTree( newChildNode, childData, validChildren );
      currentOffset += childrenLength;
    }
    else if( newChildNode instanceof Uvc.UvcVsFormatMjpegDescriptor ) {
      const childData = dataView.slice( currentOffset + newChildNode.bLength() );
      const validChildren = [UsbConstants.Class.Video.VsDescriptorSubType.FrameMjpeg, UsbConstants.Class.Video.VsDescriptorSubType.ColorFormat ];
      const childrenLength = ParseFormatTree( newChildNode, childData, validChildren );
      currentOffset += childrenLength;
    }

    currentNode.children.push( newChildNode );
    currentOffset += bLength;
  }
}
