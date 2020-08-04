
const DescriptorType = {
  Device: 0x01,
  Configuration: 0x02,
  String: 0x03,
  Inteface: 0x04,
  Endpoint: 0x05,
  DeviceQualifier: 0x06,
  OtherSpeedConfig: 0x07,
  InterfaceAssociation: 0x0B,
};

module.exports = Object.freeze({
  DescriptorType: DescriptorType,
});
