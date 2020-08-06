const Usb = require( './UsbNodes' );

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

module.exports = {
  UvcVsInputHeaderDescriptor: UvcVsInputHeaderDescriptor,
  UvcVsFormatUncompressedDescriptor: UvcVsFormatUncompressedDescriptor,
  UvcVsFrameUncompressedDescriptor: UvcVsFrameUncompressedDescriptor,
  UvcVsFormatMjpegDescriptor: UvcVsFormatMjpegDescriptor,
  UvcVsFrameMjpegDescriptor: UvcVsFrameMjpegDescriptor,
  UvcVsColorFormatDescriptor: UvcVsColorFormatDescriptor,
};
