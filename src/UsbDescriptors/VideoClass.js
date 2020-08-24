const Usb = require( './UsbNodes' );

// Video Streaming

class UvcVsInputHeaderDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Streaming Input Header`, rawData );
  }

  wTotalLength = () => {
    const dataView = new Uint16Array( this.rawData, 4, 1 );
    return dataView[0];
  }

  Print = () => {
    return `${this.type}:`
      + ` verified=[${this.Verify()}]`
      + ` bLength=[${this.bLength()}]`
    ;
  }
};

class UvcVsFormatUncompressedDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Streaming Format Uncompressed`, rawData );
  }

  Print = () => {
    return `${this.type}:`
      + `verified=[${this.Verify()}]`
      + `bLength=[${this.bLength()}]`
    ;
  }
};

class UvcVsFrameUncompressedDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Streaming Frame Uncompressed`, rawData );
  }

  Print = () => {
    return `${this.type}:`
      + ` verified=[${this.Verify()}]`
      + ` bLength=[${this.bLength()}]`
    ;
  }
};

class UvcVsFormatMjpegDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Streaming Format Mjpeg`, rawData );
  }

  Print = () => {
    return `${this.type}:`
      + ` verified=[${this.Verify()}]`
      + ` bLength=[${this.bLength()}]`
    ;
  }
};

class UvcVsFrameMjpegDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Streaming Frame Mjpeg`, rawData );
  }

  Print = () => {
    return `${this.type}:`
      + ` verified=[${this.Verify()}]`
      + ` bLength=[${this.bLength()}]`
    ;
  }
};

class UvcVsColorFormatDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Streaming Color Format`, rawData );
  }

  Print = () => {
    return `${this.type}:`
      + ` verified=[${this.Verify()}]`
      + ` bLength=[${this.bLength()}]`
    ;
  }
};

// Video Control

class UvcVcHeaderDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Control Header`, rawData );
  }

  Print = () => {
    return `${this.type}:`
      + ` verified=[${this.Verify()}]`
      + ` bLength=[${this.bLength()}]`
    ;
  }
};

class UvcVcInputTerminalDecsriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Control Input Terminal`, rawData );
  }

  Print = () => {
    return `${this.type}:`
      + ` verified=[${this.Verify()}]`
      + ` bLength=[${this.bLength()}]`
    ;
  }
};

class UvcVcOutputTerminalDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Control Output Terminal`, rawData );
  }

  Print = () => {
    return `${this.type}:`
      + ` verified=[${this.Verify()}]`
      + ` bLength=[${this.bLength()}]`
    ;
  }
};

class UvcVcSelectorUnitDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Control Selector Unit`, rawData );
  }

  Print = () => {
    return `${this.type}:`
      + ` verified=[${this.Verify()}]`
      + ` bLength=[${this.bLength()}]`
    ;
  }
};

class UvcVcProcessingUnitDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Control Processing Unit`, rawData );
  }

  Print = () => {
    return `${this.type}:`
      + ` verified=[${this.Verify()}]`
      + ` bLength=[${this.bLength()}]`
    ;
  }
};

class UvcVcExtensionUnitDescriptor extends Usb.UsbBaseNode {
  constructor( rawData ) {
    super( `Video Control Extension Unit`, rawData );
  }

  Print = () => {
    return `${this.type}:`
      + ` verified=[${this.Verify()}]`
      + ` bLength=[${this.bLength()}]`
    ;
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
