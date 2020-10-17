import * as Usb from './UsbNodes';
import UsbConstants from './UsbConstants';

// Video Streaming

export class UvcVsInputHeaderDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Streaming Header`, rawData );
    this.fields.push(
      { field: `bDescriptorSubtype`, index: 2, size: 1, },
      { field: `bNumFormats`, index: 3, size: 1, },
      { field: `wTotalLength`, index: 4, size: 2, },
      { field: `bEndpointAddress`, index: 6, size: 1, },
      { field: `bmInfo`, index: 7, size: 1, },
      { field: `bTerminalLink`, index: 8, size: 1, },
      { field: `bStillCaptureMethod`, index: 9, size: 1, },
      { field: `bTriggerSupport`, index: 10, size: 1, },
      { field: `bTriggerUsage`, index: 11, size: 1, },
      { field: `bControlSize`, index: 12, size: 1, },
    );
  }
};

export class UvcVsFormatUncompressedDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Streaming Format Uncompressed`, rawData );
    this.fields.push(
      { field: `bDescriptorSubtype`, index: 2, size: 1, },
    );
    this.validChildren.push(
      {
        type: UsbConstants.Class.Video.DescriptorType.Interface,
        subtype: UsbConstants.Class.Video.VsDescriptorSubType.FrameUncompressed,
      },
      {
        type: UsbConstants.Class.Video.DescriptorType.Interface,
        subtype: UsbConstants.Class.Video.VsDescriptorSubType.ColorFormat,
      },
    );
  }
};

export class UvcVsFrameUncompressedDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Streaming Frame Uncompressed`, rawData );
    this.fields.push(
      { field: `bDescriptorSubtype`, index: 2, size: 1, },
    );
  }
};

export class UvcVsFormatMjpegDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Streaming Format Mjpeg`, rawData );
    this.fields.push(
      { field: `bDescriptorSubtype`, index: 2, size: 1, },
    );
    this.validChildren.push(
      {
        type: UsbConstants.Class.Video.DescriptorType.Interface,
        subtype: UsbConstants.Class.Video.VsDescriptorSubType.FrameMjpeg,
      },
      {
        type: UsbConstants.Class.Video.DescriptorType.Interface,
        subtype: UsbConstants.Class.Video.VsDescriptorSubType.ColorFormat,
      },
    );
  }
};

export class UvcVsFrameMjpegDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Streaming Frame Mjpeg`, rawData );
    this.fields.push(
      { field: `bDescriptorSubtype`, index: 2, size: 1, },
    );
  }
};

export class UvcVsColorFormatDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Streaming Color Format`, rawData );
    this.fields.push(
      { field: `bDescriptorSubtype`, index: 2, size: 1, },
      { field: `bColorPrimaries`, index: 3, size: 1, },
      { field: `bTransferCharacteristics`, index: 4, size: 1, },
      { field: `bMatrixCoefficients`, index: 5, size: 1, },
    );
  }
};

// Video Control

export class UvcVcHeaderDescriptor extends Usb.UsbBaseNode {
  // UVC 1.1 -- 3.7.2 -- Table 3-3
  constructor( rawData ) {
    super( `Video Control Header`, rawData );
    this.fields.push(
      { field: `bDescriptorSubtype`, index: 2, size: 1, },
      { field: `bcdUVC`, index: 3, size: 2, },
      { field: `wTotalLength`, index: 5, size: 2, },
      { field: `dwClockFrequency`, index: 7, size: 4, },
      { field: `bInCollection`, index: 11, size: 1, },
    );
  }
};

export class UvcVcInputTerminalDecsriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Control Input Terminal`, rawData );
  }
};

export class UvcVcOutputTerminalDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Control Output Terminal`, rawData );
  }
};

export class UvcVcSelectorUnitDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Control Selector Unit`, rawData );
  }
};

export class UvcVcProcessingUnitDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Control Processing Unit`, rawData );
  }
};

export class UvcVcExtensionUnitDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Control Extension Unit`, rawData );
  }
};
