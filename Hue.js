'use strict';
const settings = require('./settings');
const neeoapi = require('neeo-sdk');
const readline = require('readline');
const fs = require('fs');

var fileData = null;
var brainIp; 
var brainPort;

var lineReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const controller = require('./HueController');
const { stringify } = require('querystring');
const { connect } = require('http2');
//const { rawListeners } = require('process'); // Is this still usefull 

const driverTable = new Array();
let HueBridgeUser;
var myAPI;
const v3 = require('node-hue-api').v3
  , discovery = v3.discovery
  , hueApi = v3.api 
;

function readConfig() {
  return new Promise(function (resolve, reject) {
    fs.readFile('./config.js', (err, data) => {
      
      if (err) {console.log('No config file, the initial setup will be launched');}
      else { fileData = JSON.parse(data); }
      resolve();
    })
    
  })
}

function InitiateHue () {
  return new Promise(function (resolve, reject) {
    //lineReader.question('Running Hue setup.', function() {
    //lineReader.close();
    console.log('Running Hue Setup.')
    console.log('Trying to detect Hue Bridge');
    v3.discovery.nupnpSearch()
    .then ((results) => {
      console.log('Congratulations, your Bridge has been detected with success:')
      console.log(JSON.stringify(results, null, 2));
      console.log('Hang on, you still need to give access... Go to your Hue Bridge and press the main button.');
      var setupInterval = setInterval(() => {
        var theApi = v3.api.createLocal(results[0].ipaddress).connect()
          .then ((api) => {
            return api.users.createUser('node-hue-api', 'Neeo');
          })
          .then ((user) => {
            console.log('The user has been found successfully, let\'s save it.');
            fileData = user;
            fs.writeFile('./config.js', JSON.stringify(user), err => {
              clearInterval(setupInterval);
              if (err) {
                  console.log('Error writing file', err);
                  reject(err);
              } else {
                  console.log('The user has been saved successfully, you are connected to the bridge now.');
                  resolve();
              }
            })
          })
          .catch(() => {console.log('.')})
      }, 5000);
    })
    
    .catch((err) => {
      console.log('The bridge couldn\'t be detected: ' + err);
      reject (err);
    })
  })
}

//getting the Hue user key in the config file.
function connectHue() {
  return new Promise(function (resolve, reject) {
    if(fileData){HueBridgeUser = fileData.username};
    v3.discovery.nupnpSearch()
      .then(searchResults => {
        const host = searchResults[0].ipaddress;
        if (HueBridgeUser) {
          v3.api.createLocal(host).connect(HueBridgeUser)
          .then(api => {myAPI = api;})
          .then(() => {
            myAPI.lights.getAll()
            .then((LightsList) => {
              LightsList.forEach(light => {
              console.log(light._data.id + ' - ' + light._data.name)
              });
              resolve();
            })
            .catch(err => {
                console.log('Your key seems to be wrong.')
                InitiateHue().then(()=>{resolve()})
            })
          })
        }
        else {
          console.log('No bridge user defined');    
          InitiateHue().then(()=>{resolve()})  
        }
      })
      .catch( (err) => {
        console.log(err);
        InitiateHue().then(()=>{resolve()})
      }) 
  })
}





function createDevices () {
  return new Promise(function (resolve, reject) {
  for (let roomIndex in settings.rooms)
  {
     const myController = new controller(myAPI, settings.rooms[roomIndex].lamps)
     const theDevice = neeoapi.buildDevice('jac Hue ' + settings.rooms[roomIndex].name + ' v0.9.73')
      .setManufacturer('Philips')
      .setType('AVRECEIVER')
      .addAdditionalSearchToken('SDK')
      .addButtonGroup('POWER')
      .addButtonGroup('Controlpad')
      .addButton({ name: 'INPUT HDMI 1', label: '.' })
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
      .addButtonHandler((name, deviceId) => myController.onButtonPressed(name, deviceId))
      //.registerSubscriptionFunction(functionTable[roomIndex]);
      //.registerSubscriptionFunction(myController.registerStateUpdateCallback.bind(this));
      .registerSubscriptionFunction(myController.registerStateUpdateCallback);
  
      driverTable.push(theDevice)
      resolve(driverTable);
    }
  })
  
}




/*
 * The last step is to export the driver, this makes it available to the
 * to tools like the CLI to start running the driver.
*/


//DISCOVERING BRAIN
        
function discoverBrain() {
  return new Promise(function (resolve, reject) {
    console.log('Trying to discover a NEEO Brain...');
    neeoapi.discoverOneBrain()
      .then((brain) => {
        console.log('- Brain discovered:', brain.name);
        console.log('at IP: ' + brain.iparray)
        brainIp = brain.iparray.toString();
        resolve();
      })
      .catch ((err) => {
        console.log("Brain couldn't be discovered, check if it is on and on the same wifi network: " + err);
        reject();
      })
    })
}

function setupNeeo() {
  return new Promise(function (resolve, reject) {
    if (fileData){
      brainIp = fileData.brainip;
      brainPort = fileData.brainport;
    }
    if (!brainPort) {brainPort = 4234;}

    if (!brainIp) {
      discoverBrain().then(() => {
        runNeeo();
        resolve();
      })
    }
    else {
      runNeeo();
    }
    resolve();
  })
}

function runNeeo () {
  return new Promise(function (resolve, reject) {
      const neeoSettings = {
      brain: brainIp.toString(),
      port: brainPort.toString(),
      name: "Hue Advanced Driver",
      devices: driverTable
    }; 

    console.log('Trying to start the Driver')
    neeoapi.startServer(neeoSettings)
      .then(() => {
          fileData.brainip = brainIp;
          fileData.brainport = brainPort;
          fs.writeFile('./config.js', JSON.stringify(fileData), err => {
            if (err) {
                console.log('Error writing file', err);
            } else {
                console.log('Driver running, you can search it on the remote control.');
            }
            resolve();
          })
       
      })
      .catch(err => {
          console.log('Failed running Neeo with error: ' + err);
          brainPort = Number(brainPort)+1;
          console.log('trying to increment port:', brainPort);
          runNeeo();
      });
    })

}



// MAIN
readConfig()
  .then(() => {
    connectHue()
      .then (() => {
         createDevices()
        .then (() => {
          
          setupNeeo();
        })
      })
    
    })
  
