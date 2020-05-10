# Hue Driver for Neeo

This driver allows advanced interactions with Philips Hue (colors, multi-rooms, zones) and NEEO Remote (legacy). If you don't have the remote, you don't want this driver.
It is essentially leveraging on this excellent node.js library:
https://github.com/peter-murray/node-hue-api.
So 99.9% of the Kudos comes to Peter Murray.

This driver was developed quick and dirty essentially for me but requested by some users so don't panic if there are some bugs on your setup (there is none on mine) and let me know so I can fix.

SETUP:
Step 0:
You should have the last version of node.js installed, preferably on a rasppberry pi for convenience.
Step 1:
To install you thus first have to install the node.js API hode-hue-api as described in the previous link.
$ npm install node-hue-api
Step 2:
Clone this repository on a path of your choice.
Step 3: 
Inside your directory, type:
$ npm install
Step 4:
you can run the application by typing:
$ node index.js
You should get a message looking like that: "You need to use the setup button first on the remote."
Step 5:
Know you need to edit the settings file:
"rooms":[
  {"name":"living", "lamps":[12,16,20,19,14,18,17]},            
  {"name":"bedroom", "lamps":[13,15]},
  {"name":"kidsroom", "lamps":[11]}],
"neeobrainip": "192.168.1.26",
"neeobrainport": "5001",
"philipshuebridgeuser": "",
//"imagesurl": "http://192.168.1.11:3000/store/"
"imagesurl": "https://raw.githubusercontent.com/jac459/NeeoHueDriver/master/Resources/"

rooms is a table which can contain as many rooms as you need, basically all the rooms of your house where you have an Hue bulb.
In each room, you need to list all the bulbs/lamps you have, right now, you can not know the ID of your lamp but still, put in the table the right number of lamps, as the interface will autoconfigure based on it. If you change the numbers of lamps in a room, you need to delete the driver from the neeo app and recreate it. For now, if you have 3 lamp in only your kitchen for example, you should have:
"rooms":[{"name":"kitchen", "lamps":[1,2,3]}]
neeobrainip should have the IP adress of your Neeo Brain: find it in the 'about' menu of your neeo mobile app, the LAN IP part.
neeobrainport can be any of your choice.

You can save the settings file now and restart the driver (ctrl-C and node index.js).
Step 6:
Now you can go to your Neeo App and get the driver. It is seen as a mediacenter and not just a light as it requires more advanced feature than just a light. It is not a problem as you can call it through a recipe with the right lamp logo. For now, just change the default name 'mediacenter' to HUE as the name will still be visible in the interface.
Step 7: 
Create a recipe with Lamp logo to invoke your HUE and chose the following shortcuts: SETUP, ZONE, BRIGHTNESS and COLORS.
Others can be directly invoked by the hardware buttons of your remote.
Step 8:
Press the link button of your HUE bridge for 1 sec and press within 20 seconds the setup button in your Neeo remote.
It will give you a complex number which is your personal key, copy it in your settings file on the philipshuebridgeuser value.
Save and restart the driver.
Step 9:
Now when restarting, you should see the list of your found lamps and their corresponding ID. You can now go back to the settings on the lamps table of your rooms and put the right lamp on the right table (save and restart again.
BE CAREFUL: the order in which you put the lamps in the lamps table matters as it will define the order in which the lamps swich on with the zone slider. The best is to follow the location order of your lamp so you can illumiate zones flawlessly. When you have many lamps in one room the effect is really good (for example to have a dinner and a living zone). To have all the lamps switched on, you need to have the zone slider in the midle.

Note: If you are new to Neeo drivers, I strongly recommend you to install PM2 in your raspberry, it allows you to run the drivers as daemon and restart when needed.



