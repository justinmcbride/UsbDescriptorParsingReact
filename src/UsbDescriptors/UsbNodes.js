import _ from 'lodash';

import UsbConstants from './UsbConstants';

export class TreeNode {
  constructor(type) {
    this.children = [];
    this.type = type ?? "Unknown TreeNode";
    this.validChildren = [];
  }

  Print = () => {
    return `${this.type}`;
  }

  PrintTreeFromHere = (tabLevel) => {
    let formattedOutput = "";
    const tabs = "  ".repeat(tabLevel);
    formattedOutput += tabs;
    formattedOutput += this.Print();
    formattedOutput += "\n"

    for( let child of this.children )
    {
      formattedOutput += child.PrintTreeFromHere(tabLevel + 1);
    }

    return formattedOutput;
  }
};

export class RootNode extends TreeNode {
  constructor() {
    super( `Root` );
    this.children = [];
  }

  Print = () => {
    return `${this.type}`;
  }
};

export class DanglingDataNode extends TreeNode {
  constructor( rawData ) {
    super( `Dangling Data` );
    this.rawData = new Uint8Array( rawData );
  }

  Print = () => {
    return `${this.type}:`
      + ` rawData.length=[${this.rawData.byteLength}]`
      + ` rawData=[${this.rawData}]`
    ;
  }
}

export class UsbBaseNode extends TreeNode {
  constructor( type, rawData ) {
    super( type );
    this.rawData = new Uint8Array( rawData );
    this.dataView = new DataView( this.rawData.buffer );
    this.fields = [
      { field: `bLength`, index: 0, size: 1, },
      { field: `bDescriptorType`, index: 1, size: 1, },
    ];
  }

  retrieve = ( field ) => {
    const fieldItem = _.find( this.fields, { field: field } );
    if( !fieldItem || fieldItem === null ) {
      console.error( `Couldn't find field=[${field}]` );
      debugger;
      return null;
    }

    let dataValue = 0;
    if( fieldItem.size === 1 ) {
      dataValue = this.dataView.getUint8(fieldItem.index);
    } else if( fieldItem.size === 2 ) {
      dataValue = this.dataView.getUint16(fieldItem.index, true);
    }  else if( fieldItem.size === 4 ) {
      dataValue = this.dataView.getUint32(fieldItem.index, true);
    }
    else {
      // meh?
      debugger;
    }
    return dataValue;
  }

  bLength = () => {
    return this.retrieve(`bLength`);
  }

  bDescriptorType = () => {
    return this.retrieve(`bDescriptorType`);
  }

  Print = () => {
    let fieldsString = ``;
    _.forEach( this.fields, (field) => {
      fieldsString += ` ${field.field}=[${this.retrieve(field.field)}]`;
    });

    return `${this.type}:`
      + ` rawData.length=[${this.rawData.byteLength}]`
      + fieldsString
      + ` rawData=[${this.rawData}]`
    ;
  }

  Verify = () => {
    return false;
  }
};

export class UnknownDescriptor extends UsbBaseNode {
  constructor( rawData ) {
    super( `Unknown Descriptor`, rawData );
  }
}

export class DeviceDescriptor extends UsbBaseNode {
  constructor( rawData ) {
    super( `Device`, rawData );
    this.fields.push(
      { field: `bcdUSB`, index: 2, size: 2, },
      { field: `bDeviceClass`, index: 4, size: 1, },
      { field: `bDeviceSubClass`, index: 5, size: 1, },
      { field: `bDeviceProtocol`, index: 6, size: 1, },
      { field: `bMaxPacketSize`, index: 7, size: 1, },
      { field: `idVendor`, index: 8, size: 2, },
      { field: `idProduct`, index: 10, size: 2, },
      { field: `bcdDevice`, index: 12, size: 2, },
      { field: `iManufacturer`, index: 14, size: 1, },
      { field: `iProduct`, index: 15, size: 1, },
      { field: `iSerialNumber`, index: 16, size: 1, },
      { field: `bNumConfigurations`, index: 17, size: 1, },
    );
  }

  bcdUSB = () => {
    const bcd = this.retrieve('bcdUSB');
    const major = ( bcd & 0xff00 ) >> 8;
    const minor = ( bcd & 0x00f0 ) >> 4;
    const submr = ( bcd & 0x000f );
    return `${major}.${minor}.${submr}`;
  }

  Verify = () => {
    // TODO: verify structure is correct
    if( this.rawData.byteLength !== 18 ) return false;
    return true;
  }
};

export class ConfigurationDescriptor extends UsbBaseNode {
  constructor( rawData ) {
    super( `Configuration`, rawData );
    this.fields.push(
      { field: `wTotalLength`, index: 2, size: 2, },
      { field: `bNumInterfaces`, index: 4, size: 1, },
      { field: `bConfigurationValue`, index: 5, size: 1, },
      { field: `iConfiguration`, index: 6, size: 1, },
      { field: `bmAttributes`, index: 7, size: 1, },
      { field: `bMaxPower`, index: 8, size: 1, },
    );
  }

  Verify = () => {
    // TODO: verify structure is correct
    if( this.rawData.byteLength !== 9 ) return false;
    return true;
  }
}

export class InterfaceDescriptor extends UsbBaseNode {
  constructor( rawData ) {
    super( `Interface`, rawData );
    this.fields.push(
      { field: `bInterfaceNumber`, index: 2, size: 1, },
      { field: `bAlternateSetting`, index: 3, size: 1, },
      { field: `bNumEndpoints`, index: 4, size: 1, },
      { field: `bInterfaceClass`, index: 5, size: 1, },
      { field: `bInterfaceSubClass`, index: 6, size: 1, },
      { field: `bInterfaceProtocol`, index: 7, size: 1, },
      { field: `iInterface`, index: 8, size: 1, },
    );

    const classValue = _.find(UsbConstants.Class, (item) => {
      return item.value === this.retrieve(`bInterfaceClass`);
    });
    if (classValue === undefined ) debugger;
    this.className = classValue.string;
  }

  Verify = () => {
    if( this.rawData.byteLength !== 9 ) return false;
    return true;
  }

  ClassName = () => {
    return this.className;
  }
};

export class EndpointDescriptor extends UsbBaseNode {
  constructor(rawData) {
    super( `Endpoint`, rawData );
    this.fields.push(
      { field: `bEndpointAddress`, index: 2, size: 1, },
      { field: `bmAttributes`, index: 3, size: 1, },
      { field: `wMaxPacketSize`, index: 4, size: 2, },
      { field: `bInterval`, index: 6, size: 1, },
    );
  }

  Verify = () => {
    if( this.rawData.byteLength !== 7 ) return false;
    return true;
  }
};

export class SuperSpeedEndpointCompanionDescriptor extends UsbBaseNode {
  constructor( rawData ) {
    super( `SS Endpoint Companion`, rawData );
  }

  Verify = () => {
    if ( this.rawData.byteLength !== 6 ) return false;
    return true;
  }
};

export class InterfaceAssosciationDescriptor extends UsbBaseNode {
  constructor( rawData ) {
    super( `Interface Association`, rawData );
    this.fields.push( 
      { field: `bFirstInterface`, index: 2, size: 1, },
      { field: `bInterfaceCount`, index: 3, size: 1, },
      { field: `bFunctionClass`, index: 4, size: 1, },
      { field: `bFunctionSubclass`, index: 5, size: 1, },
      { field: `bFunctionProtocol`, index: 6, size: 1, },
      { field: `iFunction`, index: 7, size: 1, },
    );
  }

  Verify = () => {
    // TODO: verify structure is correct
    if( this.rawData.byteLength !== 8 ) return false;
    return true;
  }
};

