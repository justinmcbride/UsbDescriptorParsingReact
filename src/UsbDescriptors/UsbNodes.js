const _ = require('lodash');

class TreeNode {
  constructor(type) {
    this.children = [];
    this.type = type ?? "Unknown TreeNode";
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

class RootNode extends TreeNode {
  constructor() {
    super( `Root` );
    this.children = [];
  }

  Print = () => {
    return `${this.type}`;
  }
};

class DanglingDataNode extends TreeNode {
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

class UsbBaseNode extends TreeNode {
  constructor( type, rawData ) {
    super( type );
    this.rawData = new Uint8Array( rawData );
    this.fields = [
      {
        field: `bLength`,
        index: 0,
        size: 1,
      },
      {
        field: `bDescriptorType`,
        index: 1,
        size: 1,
      },
    ];
  }

  retrieve = ( field ) => {
    const fieldItem = _.find( this.fields, { field: field } );
    if( !fieldItem || fieldItem === null ) {
      console.error( `Couldn't find field=[${field}]` );
      debugger;
      return null;
    }

    let dataView = 0;
    if( fieldItem.size === 1 ) {
      dataView = new Uint8Array( this.rawData.buffer, fieldItem.index, 1 );
    } else if( fieldItem.size === 2 ) {
      dataView = new Uint16Array( this.rawData.buffer, fieldItem.index, 1 );
    }  else if( fieldItem.size === 4 ) {
      dataView = new Uint32Array( this.rawData.buffer, fieldItem.index, 1 );
    }
    else {
      // meh?
      debugger;
    }
    return dataView[0];
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

class UnknownDescriptor extends UsbBaseNode {
  constructor( rawData ) {
    super( `Unknown Descriptor`, rawData );
  }
}

class DeviceDescriptor extends UsbBaseNode {
  constructor( rawData ) {
    super( `Device`, rawData );
    this.fields.push( {
      field: `idVendor`,
      index: 8,
      size: 2,
    });
    this.fields.push( {
      field: `idProduct`,
      index: 10,
      size: 2,
    });
  }

  Verify = () => {
    // TODO: verify structure is correct
    if( this.rawData.byteLength !== 18 ) return false;
    return true;
  }
};

class ConfigurationDescriptor extends UsbBaseNode {
  constructor( rawData ) {
    super( `Configuration`, rawData );
    this.fields.push( {
      field: `wTotalLength`,
      index: 2,
      size: 2,
    });
  }

  Verify = () => {
    // TODO: verify structure is correct
    if( this.rawData.byteLength !== 9 ) return false;
    return true;
  }
}

class InterfaceDescriptor extends UsbBaseNode {
  constructor( rawData ) {
    super( `Interface`, rawData );
    this.fields.push( {
      field: `bInterfaceNumber`,
      index: 2,
      size: 1,
    });
    this.fields.push( {
      field: `bAlternateSetting`,
      index: 3,
      size: 1,
    });
    this.fields.push( {
      field: `bNumEndpoints`,
      index: 4,
      size: 1,
    });
    this.fields.push( {
      field: `bInterfaceClass`,
      index: 5,
      size: 1,
    });
    this.fields.push( {
      field: `bInterfaceSubClass`,
      index: 6,
      size: 1,
    });
  }

  Verify = () => {
    if( this.rawData.byteLength !== 9 ) return false;
    return true;
  }
};

class EndpointDescriptor extends UsbBaseNode {
  constructor(rawData) {
    super( `Endpoint`, rawData );
  }

  Verify = () => {
    if( this.rawData.byteLength !== 7 ) return false;
    return true;
  }
};

class SuperSpeedEndpointCompanionDescriptor extends UsbBaseNode {
  constructor( rawData ) {
    super( `SS Endpoint Companion`, rawData );
  }

  Verify = () => {
    if ( this.rawData.byteLength !== 6 ) return false;
    return true;
  }
};

class InterfaceAssosciationDescriptor extends UsbBaseNode {
  constructor( rawData ) {
    super( `Interface Association`, rawData );
    this.fields.push( {
      field: `bFirstInterface`,
      index: 2,
      size: 1,
    });
    this.fields.push( {
      field: `bInterfaceCount`,
      index: 3,
      size: 1,
    });
    this.fields.push( {
      field: `bFunctionClass`,
      index: 4,
      size: 1,
    });
    this.fields.push( {
      field: `bFunctionSubclass`,
      index: 5,
      size: 1,
    });
    this.fields.push( {
      field: `bFunctionProtocol`,
      index: 6,
      size: 1,
    });
  }

  Verify = () => {
    // TODO: verify structure is correct
    if( this.rawData.byteLength !== 8 ) return false;
    return true;
  }
};

module.exports = {
  DanglingDataNode: DanglingDataNode,
  RootNode: RootNode,
  UsbBaseNode: UsbBaseNode,
  UnknownDescriptor: UnknownDescriptor,
  DeviceDescriptor: DeviceDescriptor,
  ConfigurationDescriptor: ConfigurationDescriptor,
  InterfaceDescriptor: InterfaceDescriptor,
  EndpointDescriptor: EndpointDescriptor,
  SuperSpeedEndpointCompanionDescriptor: SuperSpeedEndpointCompanionDescriptor,
  InterfaceAssosciationDescriptor: InterfaceAssosciationDescriptor,
};
