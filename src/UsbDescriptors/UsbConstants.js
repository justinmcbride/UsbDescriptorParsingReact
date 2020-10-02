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

// reference: https://www.usb.org/defined-class-codes
const Class = {
  PerInterface: {
    value: 0,
    string: `PerInterface`,
  },
  Audio: {
    value: 1,
    string: `Audio`,
    DescriptorType: {
      // UAC 1.0 -- A.4
      Undefined: 0x20,
      Device: 0x21,
      Configuration: 0x22,
      String: 0x23,
      Interface: 0x24,
      Endpoint: 0x25,
    },
    Subclass: {
      // UAC 1.0 -- A.2
      Undefined: 0x00,
      AudioControl: 0x01,
      AudioStreaming: 0x02,
      MidiStreaming: 0x03,
    },
    AcDescriptorSubType: {
      // UAC 1.0 -- A.5
      Undefined: 0x00,
      Header: 0x01,
      InputTerminal: 0x02,
      OutputTerminal: 0x03,
      MixerUnit: 0x04,
      SelectorUnit: 0x05,
      FeatureUnit: 0x06,
      ProcessingUnit: 0x07,
      ExtensionUnit: 0x08,
    },
    AsDescriptorSubType: {
      // UAC 1.0 -- A.6
      Undefined: 0x00,
      General: 0x01,
      FormatType: 0x02,
      FormatSpecific: 0x03,
    },
  },
  Communications: {
    value: 2,
    string: `Communications`,
  },
  HID: {
    value: 3,
    string: `HID`,
  },
  Physical: {
    value: 5,
    string: `Physical`,
  },
  StillImage: {
    value: 6,
    string: `StillImage`,
  },
  Printer: {
    value: 7,
    string: `Printer`,
  },
  MassStorage: {
    value: 8,
    string: `MassStorage`,
  },
  Hub: {
    value: 9,
    string: `Hub`,
  },
  CDC: {
    value: 0x0a,
    string: `CDC`,
  },
  CSCID: {
    value: 0x0b,
    string: `CSCID`,
  },
  ContentSec: {
    value: 0x0d,
    string: `ContentSec`,
  },
  Video: {
    value: 0x0e,
    string: `Video`,
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
    },
  },
  WirelessController: {
    value: 0xe0,
    string: `WirelessController`,
  },
  Miscellaneous: {
    value: 0xef,
    string: `Miscellaneous`,
  },
  ApplicationSpecific: {
    value: 0xfe,
    string: `ApplicationSpecific`,
  },
  VendorSpecific: {
    value: 0xff,
    string: `VendorSpecific`,
  },
};

export default Object.freeze({
  DescriptorType: DescriptorType,
  Class: Class,
});
