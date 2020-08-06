
const DescriptorType = {
  Device: 0x01,
  Configuration: 0x02,
  String: 0x03,
  Interface: 0x04,
  Endpoint: 0x05,
  DeviceQualifier: 0x06,
  OtherSpeedConfig: 0x07,
  InterfaceAssociation: 0x0B,
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
  DescriptorType: {
    // UVC 1.1 -- Page 122
    Undefined: 0x20,
    Device: 0x21,
    Configuration: 0x22,
    String: 0x23,
    Interface: 0x24,
    Endpoint: 0x25,
  },
  Class: 0x0E,
  Subclass: {
    // UVC 1.1 -- Page 122
    Undefined: 0x00,
    VideoControl: 0x01,
    VideoStreaming: 0x02,
    VideoInterfaceCollection: 0x03,
  }
};

module.exports = Object.freeze({
  DescriptorType: DescriptorType,
  Class: Class,
  Uvc11: Uvc11,
});
