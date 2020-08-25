const Usb = require( './UsbNodes' );

// Video Streaming

class UvcVsInputHeaderDescriptor extends Usb.UsbBaseNode {
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

class UvcVsFormatUncompressedDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Streaming Format Uncompressed`, rawData );
  }
};

class UvcVsFrameUncompressedDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Streaming Frame Uncompressed`, rawData );
  }
};

class UvcVsFormatMjpegDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Streaming Format Mjpeg`, rawData );
  }
};

class UvcVsFrameMjpegDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Streaming Frame Mjpeg`, rawData );
  }
};

class UvcVsColorFormatDescriptor extends Usb.UsbBaseNode {
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

class UvcVcHeaderDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Control Header`, rawData );
  }
};

class UvcVcInputTerminalDecsriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Control Input Terminal`, rawData );
  }
};

class UvcVcOutputTerminalDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Control Output Terminal`, rawData );
  }
};

class UvcVcSelectorUnitDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Control Selector Unit`, rawData );
  }
};

class UvcVcProcessingUnitDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Control Processing Unit`, rawData );
  }
};

class UvcVcExtensionUnitDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Control Extension Unit`, rawData );
  }
};

module.exports = {
  UvcVsInputHeaderDescriptor: UvcVsInputHeaderDescriptor,
  UvcVsFormatUncompressedDescriptor: UvcVsFormatUncompressedDescriptor,
  UvcVsFrameUncompressedDescriptor: UvcVsFrameUncompressedDescriptor,
  UvcVsFormatMjpegDescriptor: UvcVsFormatMjpegDescriptor,
  UvcVsFrameMjpegDescriptor: UvcVsFrameMjpegDescriptor,
  UvcVsColorFormatDescriptor: UvcVsColorFormatDescriptor,
  UvcVcHeaderDescriptor : UvcVcHeaderDescriptor,
  UvcVcInputTerminalDecsriptor : UvcVcInputTerminalDecsriptor,
  UvcVcOutputTerminalDescriptor : UvcVcOutputTerminalDescriptor,
  UvcVcSelectorUnitDescriptor : UvcVcSelectorUnitDescriptor,
  UvcVcProcessingUnitDescriptor : UvcVcProcessingUnitDescriptor,
  UvcVcExtensionUnitDescriptor : UvcVcExtensionUnitDescriptor,
};
