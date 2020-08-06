class UsbBaseNode {
  constructor( rawData ) {
    this.rawData = new Uint8Array( rawData ).buffer;
    this.children = [];
  }

  bLength = () => {
    const dataView = new Uint8Array( this.rawData, 0, 1 );
    return dataView[0];
  }

  bDescriptorType = () => {
    const dataView = new Uint8Array( this.rawData, 1, 1 );
    return dataView[0];
  }

  Print = () => {
    return `Unknown: rawData.length=[${this.rawData.byteLength}] bLength=[${this.bLength()}] bDescriptorType=[${this.bDescriptorType()}] rawData=[${new Uint8Array( this.rawData )}]`;
  }

  Verify = () => {
    return false;
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

class RootNode extends UsbBaseNode {
  constructor() {
    super( null );
  }

  Print = () => {
    return `Root`;
  }
};

class DeviceDescriptor extends UsbBaseNode {
  constructor( rawData ) {
    super( rawData );
  }

  Verify = () => {
    // TODO: verify structure is correct
    if ( this.rawData.byteLength !== 18 ) return false;
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
    return `Device: verified=[${this.Verify()}] bLength=[${this.bLength()}] idVendor=[${this.idVendor()}] idProduct=[${this.idProduct()}]`;
  }
};

class ConfigurationDescriptor extends UsbBaseNode {
  constructor( rawData ) {
    super( rawData );
  }

  Verify = () => {
    // TODO: verify structure is correct
    if ( this.rawData.byteLength !== 9 ) return false;
    return true;
  }

  wTotalLength = () => {
    const dataView = new Uint16Array( this.rawData, 2, 1 );
    return dataView[0];
  }

  Print = () => {
    return `Configuration: verified=[${this.Verify()}] bLength=[${this.bLength()}] wTotalLength=[${this.wTotalLength()}]`;
  }
}

class InterfaceDescriptor extends UsbBaseNode {
  constructor( rawData ) {
    super( rawData );
  }

  bInterfaceNumber = () => {
    const dataView = new Uint8Array( this.rawData, 2, 1 );
    return dataView[0];
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
    if ( this.rawData.byteLength !== 9 ) return false;
    return true;
  }

  Print = () => {
    return `Interface: verified=[${this.Verify()}] bLength=[${this.bLength()}] bInterfaceNumber=[${this.bInterfaceNumber()}] bAlternateSetting=[${this.bAlternateSetting()}] bInterfaceClass=[${this.bInterfaceClass()}] bInterfaceSubClass=[${this.bInterfaceSubClass()}]`;
  }
};

module.exports = {
  UsbBaseNode: UsbBaseNode,
  RootNode: RootNode,
  DeviceDescriptor: DeviceDescriptor,
  ConfigurationDescriptor: ConfigurationDescriptor,
  InterfaceDescriptor: InterfaceDescriptor,
};
