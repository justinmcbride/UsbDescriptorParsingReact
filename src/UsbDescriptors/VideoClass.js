import * as Usb from './UsbNodes';

// Video Streaming

export class UvcVsInputHeaderDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Streaming Input Header`, rawData );
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
  }
};

export class UvcVsFrameUncompressedDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Streaming Frame Uncompressed`, rawData );
  }
};

export class UvcVsFormatMjpegDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Streaming Format Mjpeg`, rawData );
  }
};

export class UvcVsFrameMjpegDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Streaming Frame Mjpeg`, rawData );
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
  constructor( rawData ) {
    super( `Video Control Header`, rawData );
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

export default {
  UvcVsInputHeaderDescriptor,
  UvcVsFormatUncompressedDescriptor,
  UvcVsFrameUncompressedDescriptor,
  UvcVsFormatMjpegDescriptor,
  UvcVsFrameMjpegDescriptor,
  UvcVsColorFormatDescriptor,
  UvcVcHeaderDescriptor,
  UvcVcInputTerminalDecsriptor,
  UvcVcOutputTerminalDescriptor,
  UvcVcSelectorUnitDescriptor,
  UvcVcProcessingUnitDescriptor,
  UvcVcExtensionUnitDescriptor,
};
