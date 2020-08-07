const Usb = require( './UsbNodes' );

// Video Streaming

class UvcVsInputHeaderDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( rawData );
  }

  wTotalLength = () => {
    const dataView = new Uint16Array( this.rawData, 4, 1 );
    return dataView[0];
  }

  Print = () => {
    return `Video Streaming Input Header: verified=[${this.Verify()}] bLength=[${this.bLength()}]`;
  }
};

class UvcVsFormatUncompressedDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( rawData );
  }

  Print = () => {
    return `Video Streaming Format Uncompressed: verified=[${this.Verify()}] bLength=[${this.bLength()}]`;
  }
};

class UvcVsFrameUncompressedDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( rawData );
  }

  Print = () => {
    return `Video Streaming Frame Uncompressed: verified=[${this.Verify()}] bLength=[${this.bLength()}]`;
  }
};

class UvcVsFormatMjpegDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( rawData );
  }

  Print = () => {
    return `Video Streaming Format Mjpeg: verified=[${this.Verify()}] bLength=[${this.bLength()}]`;
  }
};

class UvcVsFrameMjpegDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( rawData );
  }

  Print = () => {
    return `Video Streaming Frame Mjpeg: verified=[${this.Verify()}] bLength=[${this.bLength()}]`;
  }
};

class UvcVsColorFormatDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( rawData );
  }

  Print = () => {
    return `Video Streaming Color Format: verified=[${this.Verify()}] bLength=[${this.bLength()}]`;
  }
};

// Video Control

class UvcVcHeaderDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( rawData );
  }

  Print = () => {
    return `Video Control Header: verified=[${this.Verify()}] bLength=[${this.bLength()}]`;
  }
};

class UvcVcInputTerminalDecsriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( rawData );
  }

  Print = () => {
    return `Video Control Input Terminal: verified=[${this.Verify()}] bLength=[${this.bLength()}]`;
  }
};

class UvcVcOutputTerminalDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( rawData );
  }

  Print = () => {
    return `Video Control Output Terminal: verified=[${this.Verify()}] bLength=[${this.bLength()}]`;
  }
};

class UvcVcSelectorUnitDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( rawData );
  }

  Print = () => {
    return `Video Control Selector Unit: verified=[${this.Verify()}] bLength=[${this.bLength()}]`;
  }
};

class UvcVcProcessingUnitDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( rawData );
  }

  Print = () => {
    return `Video Control Processing Unit: verified=[${this.Verify()}] bLength=[${this.bLength()}]`;
  }
};

class UvcVcExtensionUnitDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( rawData );
  }

  Print = () => {
    return `Video Control Extension Unit: verified=[${this.Verify()}] bLength=[${this.bLength()}]`;
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
