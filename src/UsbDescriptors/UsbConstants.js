const DescriptorType = {
  Device: 0x01,
  Configuration: 0x02,
  String: 0x03,
  Interface: 0x04,
  Endpoint: 0x05,
  DeviceQualifier: 0x06,
  OtherSpeedConfig: 0x07,
  InterfaceAssociation: 0x0B,
  // USB 3.2 -- Page 331
  // SUPERSPEED_USB_ENDPOINT_COMPANION
  SuperSpeedEndpointCompanion: 48
};

const Class = {
  PerInterface: 0,
  Audio: 1,
  Communications: 2,
  HID: 3,
  Physical: 5,
  StillImage: 6,
  Printer: 7,
  MassStorage: 8,
  Hub: 9,
  CDC: 0x0a,
  CSCID: 0x0b,
  ContentSec: 0x0d,
  Video: 0x0e,
  WirelessController: 0xe0,
  Miscellaneous: 0xef,
  ApplicationSpecific: 0xfe,
  VendorSpecific: 0xff,
};

const Uvc11 = {
  // USB_Video_Class_1.1.pdf
  Class: 0x0E,
  DescriptorType: {
    // UVC 1.1 -- Page 122
    Undefined: 0x20,
    Device: 0x21,
    Configuration: 0x22,
    String: 0x23,
    Interface: 0x24,
    Endpoint: 0x25,
  },
  VsDescriptorSubType: {
    // UVC 1.1 -- A.6 Video Class-Specific VS Interface Descriptor Subtypes
    // Page 123
    Undefined: 0x00,
    InputHeader: 0x01,
    OutputHeader: 0x02,
    StillImageFrame: 0x03,
    FormatUncompressed: 0x04,
    FrameUncompressed: 0x05,
    FormatMjpeg: 0x06,
    FrameMjpeg: 0x07,
    // Reserved: 0x08,
    // Reserved: 0x09,
    FormatMpeg2TS: 0x0A,
    // Reserved: 0x0B,
    FormatDv: 0x0C,
    ColorFormat: 0x0D,
    // Reserved: 0x0E,
    // Reserved: 0x0F,
    FormatFrameBased: 0x10,
    FrameFrameBased: 0x11,
    FormatStreamBased: 0x12,
  },
  VcDescriptorSubType: {
    // UVC 1.1 -- A.5 Video Class-Specific VC Interface Descriptor Subtypes
    // Page 122
    Undefined: 0x00,
    Header: 0x01,
    InputTerminal: 0x02,
    OutputTerminal: 0x03,
    SelectorUnit: 0x04,
    ProcessingUnit: 0x05,
    ExtensionUnit: 0x06
  },
  Subclass: {
    // UVC 1.1 -- Page 122
    Undefined: 0x00,
    VideoControl: 0x01,
    VideoStreaming: 0x02,
    VideoInterfaceCollection: 0x03,
  }
};

export default Object.freeze({
  DescriptorType: DescriptorType,
  Class: Class,
  Uvc11: Uvc11,
});
