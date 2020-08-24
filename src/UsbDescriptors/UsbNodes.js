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
    return `${this.type}: rawData.length=[${this.rawData.byteLength}] rawData=[${this.rawData}]`;
  }
}

class UsbBaseNode extends TreeNode {
  constructor( type, rawData ) {
    super( type );
    this.rawData = new Uint8Array( rawData );
    this.fields = {
      bLength: this.rawData[0],
      bDescriptorType: this.rawData[1],
    };
  }

  bLength = () => {
    return this.fields.bLength;
  }

  bDescriptorType = () => {
    return this.fields.bDescriptorType;
  }

  Print = () => {
    return `${this.type}:`
      + ` rawData.length=[${this.rawData.byteLength}]`
      + ` bLength=[${this.bLength()}]`
      + ` bDescriptorType=[${this.bDescriptorType()}]`
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

  Print = () => {
    return `${this.type}:`
      + ` rawData.length=[${this.rawData.byteLength}]`
      + ` bLength=[${this.bLength()}]`
      + ` bDescriptorType=[${this.bDescriptorType()}]`
      + ` rawData=[${this.rawData}]`
    ;
  }
}

class DeviceDescriptor extends UsbBaseNode {
  constructor( rawData ) {
    super( `Device`, rawData ); 
  }

  Verify = () => {
    // TODO: verify structure is correct
    if( this.rawData.byteLength !== 18 ) return false;
    return true;
  }

  idVendor = () => {
    const dataView = new Uint16Array( this.rawData, 8, 1 );
    return dataView[0];
  }

  idProduct = () => {
    const dataView = new Uint16Array( this.rawData, 10, 1 );
    return dataView[0];
  }

  Print = () => {
    return `${this.type}:`
      + ` verified=[${this.Verify()}]`
      + ` bLength=[${this.bLength()}]`
      + ` idVendor=[${this.idVendor()}]`
      + ` idProduct=[${this.idProduct()}]`
    ;
  }
};

class ConfigurationDescriptor extends UsbBaseNode {
  constructor( rawData ) {
    super( `Configuration`, rawData );
  }

  Verify = () => {
    // TODO: verify structure is correct
    if( this.rawData.byteLength !== 9 ) return false;
    return true;
  }

  wTotalLength = () => {
    const dataView = new Uint16Array( this.rawData, 2, 1 );
    return dataView[0];
  }

  Print = () => {
    return `${this.type}: verified=[${this.Verify()}] bLength=[${this.bLength()}] wTotalLength=[${this.wTotalLength()}]`;
  }
}

class InterfaceDescriptor extends UsbBaseNode {
  constructor( rawData ) {
    super( `Interface`, rawData );
    this.fields["bInterfaceNumber"] = this.rawData[2];
  }

  bInterfaceNumber = () => {
    return this.fields.bInterfaceNumber;
  }

  bAlternateSetting = () => {
    const dataView = new Uint8Array( this.rawData, 3, 1 );
    return dataView[0];
  }

  bNumEndpoints = () => {
    const dataView = new Uint8Array( this.rawData, 4, 1 );
    return dataView[0];
  }

  bInterfaceClass = () => {
    const dataView = new Uint8Array( this.rawData, 5, 1 );
    return dataView[0];
  }

  bInterfaceSubClass = () => {
    const dataView = new Uint8Array( this.rawData, 6, 1 );
    return dataView[0];
  }

  Verify = () => {
    if( this.rawData.byteLength !== 9 ) return false;
    return true;
  }

  Print = () => {
    return `${this.type}: verified=[${this.Verify()}] bLength=[${this.bLength()}] bInterfaceNumber=[${this.bInterfaceNumber()}] bAlternateSetting=[${this.bAlternateSetting()}] bInterfaceClass=[${this.bInterfaceClass()}] bInterfaceSubClass=[${this.bInterfaceSubClass()}]`;
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
  
  Print = () => {
    return `${this.type}:`
      + ` verified=[${this.Verify()}]`
      + ` bLength=[${this.bLength()}]`
    ;
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
  
  Print = () => {
    return `${this.type}:`
      + ` verified=[${this.Verify()}]`
      + ` bLength=[${this.bLength()}]`
    ;
  }
};

class InterfaceAssosciationDescriptor extends UsbBaseNode {
  constructor( rawData ) {
    super( `Interface Association`, rawData );
  }

  Verify = () => {
    // TODO: verify structure is correct
    if( this.rawData.byteLength !== 8 ) return false;
    if( this.bFunctionClass() === 0 ) return false;
    return true;
  }

  bFirstInterface = () => {
    const dataView = new Uint8Array( this.rawData, 2, 1 );
    return dataView[0];
  }

  bInterfaceCount = () => {
    const dataView = new Uint8Array( this.rawData, 3, 1 );
    return dataView[0];
  }

  bFunctionClass = () => {
    const dataView = new Uint8Array( this.rawData, 4, 1 );
    return dataView[0];
  }

  bFunctionSubClass = () => {
    const dataView = new Uint8Array( this.rawData, 5, 1 );
    return dataView[0];
  }

  bFunctionProtocol = () => {
    const dataView = new Uint8Array( this.rawData, 6, 1 );
    return dataView[0];
  }

  Print = () => {
    return `${this.type}:`
      + ` verified=[${this.Verify()}]`
      + ` bLength=[${this.bLength()}]`
      + ` bFirstInterface=[${this.bFirstInterface()}]`
      + ` bInterfaceCount=[${this.bInterfaceCount()}]`
      + ` bFunctionClass=[${this.bFunctionClass()}]`
    ;
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
