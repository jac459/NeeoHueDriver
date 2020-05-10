'use strict';
const settings = require('./settings');
const neeoapi = require('neeo-sdk');
const controller = require('./HueController');
var driverTable = new Array();

for (var roomIndex in settings.rooms)
{
  var myController = new controller(settings.rooms[roomIndex].lamps)
  var hueDriver = neeoapi.buildDevice('jac Hue ' + settings.rooms[roomIndex].name + ' v0.7.4')
    .setManufacturer('Philips')
    .setType('AVRECEIVER')
    .addAdditionalSearchToken('SDK')
    .addButtonGroup('POWER')
    .addButtonGroup('Controlpad')
    .addButton({ name: 'SETUP', label: 'setup' })
    .addSlider(
      { name: 'Brightness', label: 'Brightness', range: [1,254], unit: 'Lux' },
        {
          setter: myController.brightnessSet, getter: myController.brightnessGet
        }) 
    .addSlider(
      { name: 'Zone', label: 'Zone', range: [0,((settings.rooms[roomIndex].lamps.length - 1)*2)] },
        {
          setter: myController.zoneSet, getter: myController.zoneGet
        }) 
    .addDirectory({
      name: 'Colors',
      label: 'Colors',
    }, myController.browse) // This will forward events to the controller handler
    // Then we wire the controller handler for these capabilities
    //hueDriver.addButtonHandler((name, deviceId) => hueController.onButtonPressed(name, deviceId));
    // hueDriver.registerSubscriptionFunction(hueController.registerStateUpdateCallback);
    .addButtonHandler((name, deviceId) => myController.onButtonPressed(name, deviceId))
    .registerSubscriptionFunction(myController.registerStateUpdateCallback);
    
    driverTable.push(hueDriver);

}



/*
 * The last step is to export the driver, this makes it available to the
 * to tools like the CLI to start running the driver.
*/

const neeoSettings = {
  brain: settings.neeobrainip,
  port: settings.neeobrainport,
  name: "JAC Hue",
  devices: driverTable
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


