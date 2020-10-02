import * as Usb from './UsbNodes';

export class UacAcHeaderDescriptor extends Usb.UsbBaseNode {
  // UAC 1.0 -- 4.3.2 -- Table 4-2
  constructor( rawData ) {
    super( `Audio Control Header`, rawData );
    this.fields.push(
      { field: `bDescriptorSubtype`, index: 2, size: 1, },
      { field: `bcdADC`, index: 3, size: 2, },
      { field: `wTotalLength`, index: 5, size: 2, },
      { field: `bInCollection`, index: 7, size: 1, },
    );
  }
};

export class UacAcInputTerminalDescriptor extends Usb.UsbBaseNode {
  // UAC 1.0 -- 4.3.2.1 -- Table 4-3
  constructor( rawData ) {
    super( `Audio Control Input Terminal`, rawData );
    this.fields.push(
      { field: `bDescriptorSubtype`, index: 2, size: 1, },
      { field: `bTerminalID`, index: 3, size: 1, },
      { field: `wTerminalType`, index: 4, size: 2, },
      { field: `bAssocTerminal`, index: 6, size: 1, },
      { field: `bNrChannels`, index: 7, size: 1, },
      { field: `wChannelConfig`, index: 8, size: 2, },
      { field: `iChannelNames`, index: 10, size: 1, },
      { field: `iTerminal`, index: 11, size: 1, },
    );
  }
};

export class UacAcOutputTerminalDescriptor extends Usb.UsbBaseNode {
  // UAC 1.0 -- 4.3.2.2 -- Table 4-4
  constructor( rawData ) {
    super( `Audio Control Output Terminal`, rawData );
    this.fields.push(
      { field: `bDescriptorSubtype`, index: 2, size: 1, },
    );
  }
};

export class UacAcMixerUnitDescriptor extends Usb.UsbBaseNode {
  // UAC 1.0 -- 4.3.2.3 -- Table 4-5
  constructor( rawData ) {
    super( `Audio Control Mixer Unit`, rawData );
    this.fields.push(
      { field: `bDescriptorSubtype`, index: 2, size: 1, },
    );
  }
};

export class UacAcSelectorUnitDescriptor extends Usb.UsbBaseNode {
  // UAC 1.0 -- 4.3.2.4 -- Table 4-6
  constructor( rawData ) {
    super( `Audio Control Selector Unit`, rawData );
    this.fields.push(
      { field: `bDescriptorSubtype`, index: 2, size: 1, },
    );
  }
};

export class UacAcFeatureUnitDescriptor extends Usb.UsbBaseNode {
  // UAC 1.0 -- 4.3.2.5 -- Table 4-7
  constructor( rawData ) {
    super( `Audio Control Feature Unit`, rawData );
    this.fields.push(
      { field: `bDescriptorSubtype`, index: 2, size: 1, },
    );
  }
};

export class UacAcProcessingUnitDescriptor extends Usb.UsbBaseNode {
  // UAC 1.0 -- 4.3.2.6 -- Table 4-8
  constructor( rawData ) {
    super( `Audio Control Processing Unit`, rawData );
    this.fields.push(
      { field: `bDescriptorSubtype`, index: 2, size: 1, },
    );
  }
};

export class UacAcUpDownMixUnitDescriptor extends Usb.UsbBaseNode {
  // UAC 1.0 -- 4.3.2.6.1 -- Table 4-9
  constructor( rawData ) {
    super( `Audio Control Up/Down-mix Processing Unit`, rawData );
    this.fields.push(
      { field: `bDescriptorSubtype`, index: 2, size: 1, },
    );
  }
};

export class UacAcDolbyPrologicDescriptor extends Usb.UsbBaseNode {
  // UAC 1.0 -- 4.3.2.6.2 -- Table 4-10
  constructor( rawData ) {
    super( `Audio Control Dolby Prologic Processing Unit`, rawData );
    this.fields.push(
      { field: `bDescriptorSubtype`, index: 2, size: 1, },
    );
  }
};

export class UacAc3dStereoDescriptor extends Usb.UsbBaseNode {
  // UAC 1.0 -- 4.3.2.6.3 -- Table 4-11
  constructor( rawData ) {
    super( `Audio Control 3D-Stereo Extender Processing Unit`, rawData );
    this.fields.push(
      { field: `bDescriptorSubtype`, index: 2, size: 1, },
    );
  }
};

export class UacAcReverberationDescriptor extends Usb.UsbBaseNode {
  // UAC 1.0 -- 4.3.2.6.4 -- Table 4-12
  constructor( rawData ) {
    super( `Audio Control Reverberation Processing Unit`, rawData );
    this.fields.push(
      { field: `bDescriptorSubtype`, index: 2, size: 1, },
    );
  }
};

export class UacAcChorusProcessingDescriptor extends Usb.UsbBaseNode {
  // UAC 1.0 -- 4.3.2.6.5 -- Table 4-13
  constructor( rawData ) {
    super( `Audio Control Chorus Processing Unit`, rawData );
    this.fields.push(
      { field: `bDescriptorSubtype`, index: 2, size: 1, },
    );
  }
};

export class UacAcDynamicRangeDescriptor extends Usb.UsbBaseNode {
  // UAC 1.0 -- 4.3.2.6.6 -- Table 4-14
  constructor( rawData ) {
    super( `Audio Control Dynamic Range Compressor Processing Unit`, rawData );
    this.fields.push(
      { field: `bDescriptorSubtype`, index: 2, size: 1, },
    );
  }
};

export class UacAcExtensionUnitDescriptor extends Usb.UsbBaseNode {
  // UAC 1.0 -- 4.3.2.7 -- Table 4-15
  constructor( rawData ) {
    super( `Audio Control Extension Unit`, rawData );
    this.fields.push(
      { field: `bDescriptorSubtype`, index: 2, size: 1, },
    );
  }
};

export class UacAcAssociatedInterfaceDescriptor extends Usb.UsbBaseNode {
  // UAC 1.0 -- 4.3.2.8 -- Table 4-16
  constructor( rawData ) {
    super( `Audio Control Associated Interface`, rawData );
    this.fields.push(
      { field: `bDescriptorSubtype`, index: 2, size: 1, },
    );
  }
};

export class UacAcInterruptEndpointDescriptor extends Usb.UsbBaseNode {
  // UAC 1.0 -- 4.4.2.1 -- Table 4-17
  constructor( rawData ) {
    super( `Audio Control Interrupt Endpoint`, rawData );
    this.fields.push(
      { field: `bEndpointAddress`, index: 2, size: 1, },
      { field: `bmAttributes`, index: 3, size: 1, },
      { field: `wMaxPacketSize`, index: 4, size: 2, },
      { field: `bInterval`, index: 6, size: 1, },
      { field: `bRefresh`, index: 7, size: 1, },
      { field: `bSynchAddress`, index: 8, size: 1, },
    );
  }
};

export class UacAsInterfaceDescriptor extends Usb.UsbBaseNode {
  // UAC 1.0 -- 4.5.2 -- Table 4-19
  constructor( rawData ) {
    super( `Audio Streaming Interface`, rawData );
    this.fields.push(
      { field: `bDescriptorSubtype`, index: 2, size: 1, },
      { field: `bTerminalLink`, index: 3, size: 1, },
      { field: `bDelay`, index: 4, size: 1, },
      { field: `wFormatTag`, index: 5, size: 2, },
    );
  }
};

// export class xxxDescriptor extends Usb.UsbBaseNode {
//   // UAC 1.0 -- 4.3.2.x -- Table 4-x
//   constructor( rawData ) {
//     super( `Audio Control xxx`, rawData );
//     this.fields.push(
//       { field: `bDescriptorSubtype`, index: 2, size: 1, },
//     );
//   }
// };
