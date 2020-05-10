
'use strict';
const settings = require('./settings');
const v3 = require('node-hue-api').v3
  , discovery = v3.discovery
  , hueApi = v3.api 
;
let HueBridgeUser = settings.philipshuebridgeuser;
const neeoapi = require('neeo-sdk');
const colorTable = {
  'Col_Red': 'Red',
  'Col_Orange': 'Orange',
  'Col_Light_Orange': 'Light Orange',
  'Col_Warm_White': 'Warm White',
  'Col_Full_White': 'Full White',
  'Col_Cold_White' : 'Cold White', 
  'Col_Green' : 'Green',
  'Col_Light_Blue' : 'Light Blue',
  'Col_Deep_Blue' : 'Deep Blue',
  'Col_Pink' : 'Pink',
}
const BrightMax = 254;
const BrightMin = 1;
const ZoneMax = 12;
const ZoneMin = 0;

function setHueData (TheAPI, TheLamp, vState, vBrightness, vColor) {
  console.log(TheLamp + " : " + vBrightness + " : " + vColor + " : " + vState);
  if (vState) {
    if ('Col_Red'== vColor) {
      TheAPI.lights.setLightState(TheLamp,{
          on: vState,
          bri: vBrightness,
          hue: 25652,
          sat: 254,
          effect: 'none',
          xy: [ 0.674, 0.322 ],
          ct: 289,
          alert: 'none',
          colormode: 'xy',
          mode: 'homeautomation',
          reachable: true
      }).then(() => {console.log('done : ' + TheLamp + ' - ' + vBrightness + vState)})
    }
    else if ('Col_Orange'== vColor) {
      TheAPI.lights.setLightState(TheLamp,{
        on: vState,
          bri: vBrightness,  
          hue: 7458,
          sat: 252,
          effect: 'none',
          xy: [ 0.5958, 0.3791 ],
          ct: 153,
          alert: 'none',
          colormode: 'xy',
          mode: 'homeautomation',
          reachable: true
        }).then(() => {console.log('done : ' + TheLamp + ' - ' + vBrightness + vState)})
      }
    else if ('Col_Light_Orange'== vColor) {
      TheAPI.lights.setLightState(TheLamp,{
        on: vState,
          bri: vBrightness,  
          hue: 37458,
          sat: 149,
          effect: 'none',
          xy: [ 0.5158, 0.3721 ],
          ct: 235,
          alert: 'none',
          colormode: 'xy',
          mode: 'homeautomation',
          reachable: true
        }).then(() => {console.log('done : ' + TheLamp + ' - ' + vBrightness + vState)})
      }
    else if ('Col_Warm_White'== vColor) {
      TheAPI.lights.setLightState(TheLamp,{
          on: vState,
          bri: vBrightness,  
          hue: 65511,
          sat: 43,
          effect: 'none',
          xy: [ 0.4302, 0.3675 ],
          ct: 322,
          alert: 'none',
          colormode: 'xy',
          mode: 'homeautomation',
          reachable: true
        }).then(() => {console.log('done : ' + TheLamp + ' - ' + vBrightness + vState)})
      }
    else if ('Col_Full_White'== vColor) {
      TheAPI.lights.setLightState(TheLamp,{
          on: vState,
          bri: vBrightness,  
          hue: 34153,
          sat: 243,
          effect: 'none',
          xy: [ 0.3157, 0.33 ],
          ct: 156,
          alert: 'none',
          colormode: 'xy',
          mode: 'homeautomation',
          reachable: true
        }).then(() => {console.log('done : ' + TheLamp + ' - ' + vBrightness + vState)})
      }
    else if ('Col_Cold_White'== vColor) {
      TheAPI.lights.setLightState(TheLamp,{
          on: vState,
          bri: vBrightness,  
          hue: 35616,
          sat: 238,
          effect: 'none',
          xy: [ 0.3016, 0.3005 ],
          ct: 153,
          alert: 'none',
          colormode: 'xy',
          mode: 'homeautomation',
          reachable: true
        }).then(() => {console.log('done : ' + TheLamp + ' - ' + vBrightness + vState)})
      }
    else if ('Col_Green'== vColor) {
      TheAPI.lights.setLightState(TheLamp,{
          on: vState,
          bri: vBrightness,  
          hue: 25653,
          sat: 254,
          effect: 'none',
          xy: [ 0.4084, 0.5168 ],
          ct: 289,
          alert: 'none',
          colormode: 'xy',
          mode: 'homeautomation',
          reachable: true
        }).then(() => {console.log('done : ' + TheLamp + ' - ' + vBrightness + vState)})
      }
    else if ('Col_Light_Blue'== vColor) {
      TheAPI.lights.setLightState(TheLamp,{
          on: vState,
          bri: vBrightness,    
          hue: 43110,
          sat: 252,
          effect: 'none',
          xy: [ 0.2102, 0.1248 ],
          ct: 153,
          alert: 'none',
          colormode: 'xy',
          mode: 'homeautomation',
          reachable: true
        }).then(() => {console.log('done : ' + TheLamp + ' - ' + vBrightness + vState)})
      }
    else if ('Col_Deep_Blue'== vColor) {
      TheAPI.lights.setLightState(TheLamp,{
          on: vState,
          bri: vBrightness,    
          hue: 46989,
          sat: 251,
          effect: 'none',
          xy: [ 0.1708, 0.0465 ],
          ct: 153,
          alert: 'none',
          colormode: 'xy',
          mode: 'homeautomation',
          reachable: true
        }).then(() => {console.log('done : ' + TheLamp + ' - ' + vBrightness + vState)})
      }
    else if ('Col_Pink'== vColor) {
      TheAPI.lights.setLightState(TheLamp,{
          on: vState,
          bri: vBrightness,    
          hue: 59221,
          sat: 253,
          effect: 'none',
          xy: [ 0.5005, 0.226 ],
          ct: 443,
          alert: 'none',
          colormode: 'xy',
          mode: 'homeautomation',
          reachable: true
        }).then(() => {console.log('done : ' + TheLamp + ' - ' + vBrightness + vState)})
      }
  }
  else {
     TheAPI.lights.setLightState(TheLamp,{
      on: false
    }).then(() => {console.log('done off')})
  }
};

function SetLightState (TargetAPI, Brightness, Color, State, Zone, LampList) {
  let relativeBrightness;
  console.log('zone: ' + Zone+ ' Bri : ' + Brightness+ ' col: ' + Color + 'list : ' + LampList);
  if (Zone) {
    if (State) {
      if (Number(Zone) <= (Number(LampList.length) - 1)) {
        for (var key in LampList) {
          if (Number(key) <= Number(Zone)) {//in zone
            setHueData(TargetAPI, LampList[key], true, Brightness, Color)
          }
          else {
            if ((Number(key) - Number(Zone))<1) {//little outside Zone 
              relativeBrightness = Math.round(Number(Brightness)*(Number(Zone) + 1 - Number(key)));
                setHueData(TargetAPI, LampList[key], true, relativeBrightness, Color)
            }
            else {//full outside the zone
                setHueData(TargetAPI, LampList[key], false, Brightness, Color);
            }
          }
        } 
      }
      else {
        Zone = Number(Zone) + 1 - Number (LampList.length);
        for (var key in LampList) {
          if (Number(key) > Number(Zone)) {//full in the zone
            setHueData(TargetAPI, LampList[key], true, Brightness, Color)
          }
          else { 
            if ((Number(Zone) - Number(key))<1) { //little outside
            relativeBrightness = Math.round(Number(Brightness)*(Number(key) + 1 - Number(Zone)));
                setHueData(TargetAPI, LampList[key], true, relativeBrightness, Color)
            }
            else {//outside
              setHueData(TargetAPI, LampList[key], false, Brightness, Color);
            }
          } 
        }
      }
    }
    else {//switch off.
      for (var key in LampList) {
        setHueData(TargetAPI, LampList[key], false, Brightness, Color);
      }
      
    }
  }
  else {//one lamp in the room, so no zone.
        setHueData(TargetAPI, LampList[0], State, Brightness, Color)
  }
}



const appName = 'node-hue-api';
const deviceName = 'Hue4Neeo';

module.exports = function controller(theLightTable) {
 
    this.lightsTable = theLightTable;
    this.CurrentLightColor = 'Col_Warm_White';
    this.CurrentZone;
    this.colorList;
    this.myAPI;
    this.LightSlider = 254;
    this.sendComponentUpdate;
    var self = this;
    v3.discovery.nupnpSearch()
    .then(searchResults => {
      const host = searchResults[0].ipaddress;
      if (HueBridgeUser != '') {
        v3.api.createLocal(host).connect(HueBridgeUser)
        .then(api => {this.myAPI = api;
          api.lights.getAll().then((LightsList) => {
            LightsList.forEach(light => {
              console.log(light._data.id + ' - ' + light._data.name)
            });
          }) 
        })
      }
      else {console.log('You need to use the setup button first on the remote.')}
    })
    .catch( (err) => {console.log('could not create the object ' + err)}) 
    
  this.browse = {

      getter: (deviceId, params) => this.fetchList(deviceId, params),

      action: (deviceId, params) => this.handleSceneAction(deviceId, params),

    };      
    
  this.registerStateUpdateCallback = function(updateFunction) {
    console.log('[CONTROLLER] register update state for Hue');
    self.sendComponentUpdate = updateFunction;
  };

  this.zoneSet = function(deviceId, value) {
    self.CurrentZone = value;
    console.log(self.CurrentZone);
    self.sendComponentUpdate({uniqueDeviceId: deviceId,component: 'Zone',value: self.CurrentZone})
      .catch( (err) => {}); 
    SetLightState (self.myAPI, self.LightSlider, self.CurrentLightColor, true, self.CurrentZone, self.lightsTable);
    }
  this.zoneGet= function () {
      return self.CurrentZone;
  }

  this.brightnessSet = function(deviceId, value) {
    self.LightSlider = value;
    self.sendComponentUpdate({uniqueDeviceId: deviceId,component: 'Brightness',value: self.LightSlider}).catch(function (err) {});
    SetLightState (self.myAPI, value, self.CurrentLightColor, true, self.CurrentZone, self.lightsTable);
  };

  this.brightnessGet = function(deviceId) {
    return self.LightSlider;
  }

  this.fetchList = function(deviceId, params) {
    self.colorList = neeoapi.buildBrowseList({
      title: 'Colors',
      totalMatchingItems: 10,
      limit: 10,
      offset: 0,
      browseIdentifier: 'browseEverything',
      uiAction : 'close'
    })
    for (var key in colorTable) {
      self.colorList.addListItem({
        title:colorTable[key],label: 'Philips HUE Scene', 
        thumbnailUri: encodeURI(settings.imagesurl + key + '.jpg'),
        actionIdentifier: key, 
        /*uiAction: 'goBack'*/})
    }
    
    return self.colorList;
         
  }

  this.handleSceneAction = function(deviceId, params) {
    self.CurrentLightColor = params.actionIdentifier;
    SetLightState (self.myAPI, self.LightSlider, self.CurrentLightColor, true, self.CurrentZone, self.lightsTable);
  
  };

  this.onButtonPressed = function(name, deviceId) {
    console.log(`[CONTROLLER] ${name} button pressed for device ${deviceId}`);
    if (name == "POWER ON") {
     SetLightState (self.myAPI, self.LightSlider, self.CurrentLightColor, true, self.CurrentZone, self.lightsTable);
    }
    else if (name == "POWER OFF") {
      SetLightState (self.myAPI, self.LightSlider, self.CurrentLightColor, false, self.CurrentZone, self.lightsTable);
   }
    else if (name == "CURSOR RIGHT") {
      self.LightSlider = Number(self.LightSlider) + 20; if (self.LightSlider > BrightMax) {self.LightSlider = BrightMax};
      self.sendComponentUpdate({uniqueDeviceId: deviceId,component: 'Brightness',value: self.LightSlider})
      .catch( (err) => {console.log(err)});
      SetLightState (self.myAPI, self.LightSlider, self.CurrentLightColor, true, self.CurrentZone, self.lightsTable);
    }
    else if (name == "CURSOR LEFT") {
      self.LightSlider = Number(self.LightSlider) - 20; if (self.LightSlider < BrightMin) {self.LightSlider = BrightMin};
      self.sendComponentUpdate({uniqueDeviceId: deviceId,component: 'Brightness',value: self.LightSlider})
      .catch( (err) => {console.log(err)});
      SetLightState (self.myAPI, self.LightSlider, self.CurrentLightColor, true, self.CurrentZone, self.lightsTable);
   }
    else if (name == "CURSOR UP") {
      self.CurrentZone = Number(self.CurrentZone) + 0.25; if (self.CurrentZone > ZoneMax) {self.CurrentZone = ZoneMax};
      self.sendComponentUpdate({uniqueDeviceId: deviceId,component: 'Zone',value: self.CurrentZone})
      .catch( (err) => {console.log(err)});
      SetLightState (self.myAPI, self.LightSlider, self.CurrentLightColor, true, self.CurrentZone, self.lightsTable);
   }
    else if (name == "CURSOR DOWN") {
      self.CurrentZone = Number(self.CurrentZone) - 0.25; if (self.CurrentZone < ZoneMin) {self.CurrentZone = ZoneMin};
      self.sendComponentUpdate({uniqueDeviceId: deviceId,component: 'Zone',value: self.CurrentZone})
      .catch( (err) => {console.log(err)}); 
      SetLightState (self.myAPI, self.LightSlider, self.CurrentLightColor, true, self.CurrentZone, self.lightsTable);
    }
    else if (name == "SETUP") {
      console.log('Trying to detect Hue Bridge');
      v3.discovery.nupnpSearch()
      .then ((results) => {
        console.log('Congratulations, your Bridge has been detected with success:')
        console.log(JSON.stringify(results, null, 2));
        console.log('Hang on, you still need to give access...');
        return v3.api.createLocal(results[0].ipaddress).connect()
      })
      .then ((api) => {
        return api.users.createUser('node-hue-api', 'Neeo');
      })
      .then ((user) => {
        console.log('This is the philipshuebridgeuser value you are looking for:');
        console.log(user.username)
       })
      .catch((err) => {
        if (err._hueError != undefined) { 
            if (err._hueError.payload.type == '101') {
              console.log('Oups, you didn\'t press the Link button on your Philips Hue Bridge. You have to push the button and then you have 20 seconds to press the setup button on the remote');
            }
        }
        else {console.log(err);}
      })
      //link button not pressed
    }
  }
}
