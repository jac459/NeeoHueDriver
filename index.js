'use strict';

const lightsTableLiving = [12,16,20,19,14,18,17];
//const lightsTableLiving = [12,16,20,14];
const lightsTableRoom = [13,15];
const lightsTableKids = [11];
const neeoapi = require('neeo-sdk');
const controller = require('./HueController');
const hueLivingController = new controller(lightsTableLiving);
const hueRoomController = new controller(lightsTableRoom);
const hueKidsController = new controller(lightsTableKids);


// First we set the device info, used to identify it on the Brain
const hueLivingDriver = neeoapi.buildDevice('jac Hue Living v2.0.2')
  .setManufacturer('Philips')
  .setType('AVRECEIVER')
  .addAdditionalSearchToken('SDK')
  .addButtonGroup('POWER')
  .addButtonGroup('Controlpad')

  .addSlider(
    { name: 'Brightness', label: 'Brightness', range: [1,254], unit: 'Lux' },
      {
        setter: hueLivingController.brightnessSet, getter: hueLivingController.brightnessGet
      }) 
  .addSlider(
    { name: 'Zone', label: 'Zone', range: [0,((lightsTableLiving.length - 1)*2)] },
      {
        setter: hueLivingController.zoneSet, getter: hueLivingController.zoneGet
      }) 
  .addDirectory({
    name: 'Colors',
    label: 'Colors',
  }, hueLivingController.browse) // This will forward events to the controller handler
   
  // Then we wire the controller handler for these capabilities
  //hueDriver.addButtonHandler((name, deviceId) => hueController.onButtonPressed(name, deviceId));
 // hueDriver.registerSubscriptionFunction(hueController.registerStateUpdateCallback);
 .addButtonHandler((name, deviceId) => hueLivingController.onButtonPressed(name, deviceId))
 .registerSubscriptionFunction(hueLivingController.registerStateUpdateCallback);
 
// First we set the device info, used to identify it on the Brain
const hueRoomDriver = neeoapi.buildDevice('jac Hue Room v2.0.2')
  .setManufacturer('Philips')
    .setType('AVRECEIVER')
  .addAdditionalSearchToken('SDK')
  .addButtonGroup('POWER')
  .addButtonGroup('Controlpad')

  .addSlider(
    { name: 'Brightness', label: 'Brightness', range: [1,254], unit: 'Lux' },
      {
        setter: hueRoomController.brightnessSet, getter: hueRoomController.brightnessGet
      }) 
  .addSlider(
    { name: 'Zone', label: 'Zone', range: [0,((lightsTableRoom.length - 1)*2)] },
      {
        setter: hueRoomController.zoneSet, getter: hueRoomController.zoneGet
      }) 
  .addDirectory({
    name: 'Colors',
    label: 'Colors',
  }, hueRoomController.browse) // This will forward events to the controller handler
   
  // Then we wire the controller handler for these capabilities
  //hueDriver.addButtonHandler((name, deviceId) => hueController.onButtonPressed(name, deviceId));
 // hueDriver.registerSubscriptionFunction(hueController.registerStateUpdateCallback);
 .addButtonHandler((name, deviceId) => hueRoomController.onButtonPressed(name, deviceId))
 .registerSubscriptionFunction(hueRoomController.registerStateUpdateCallback);
 
// First we set the device info, used to identify it on the Brain
const hueKidsDriver = neeoapi.buildDevice('jac Hue Kids v2.0.2')
  .setManufacturer('Philips')
    .setType('AVRECEIVER')
  .addAdditionalSearchToken('SDK')
  .addButtonGroup('POWER')
  .addButtonGroup('Controlpad')

  .addSlider(
    { name: 'Brightness', label: 'Brightness', range: [1,254], unit: 'Lux' },
      {
        setter: hueKidsController.brightnessSet, getter: hueKidsController.brightnessGet
      }) 
  .addSlider(
    { name: 'Zone', label: 'Zone', range: [0,((lightsTableKids.length - 1)*2)] },
      {
        setter: hueKidsController.zoneSet, getter: hueKidsController.zoneGet
      }) 
  .addDirectory({
    name: 'Colors',
    label: 'Colors',
  }, hueKidsController.browse) // This will forward events to the controller handler
   
  // Then we wire the controller handler for these capabilities
  //hueDriver.addButtonHandler((name, deviceId) => hueController.onButtonPressed(name, deviceId));
 // hueDriver.registerSubscriptionFunction(hueController.registerStateUpdateCallback);
 .addButtonHandler((name, deviceId) => hueKidsController.onButtonPressed(name, deviceId))
 .registerSubscriptionFunction(hueKidsController.registerStateUpdateCallback);
 

/*
 * The last step is to export the driver, this makes it available to the
 * to tools like the CLI to start running the driver.
*/

const neeoSettings = {
  brain: "192.168.1.26",
  port: 1100,
  name: "JAC Hue Living",
  devices: [hueLivingDriver, hueKidsDriver, hueRoomDriver]
}; 
neeoapi
  .startServer(neeoSettings)
  .then(() => {
    console.log("# READY! use the NEEO app to search for: Hue");
  })
  .catch(err => {
    console.error("ERROR!", err);
    process.exit(1);
  });


