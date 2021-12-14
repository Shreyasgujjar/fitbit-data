import document from "document";
import { inbox } from "file-transfer";
import { HeartRateSensor } from "heart-rate";
import fs from "fs";
import { me } from "companion";
import { Accelerometer } from "accelerometer";
import * as messaging from "messaging";
import { Gyroscope } from "gyroscope";

let message_interval = "";
let acc_x = 0;
let acc_y = 0;
let acc_z = 0;

if (Accelerometer && Gyroscope) {
   console.log("This device has an Accelerometer!");
   const accelerometer = new Accelerometer({ frequency: 1 });
  const gyroscope = new Gyroscope({ frequency: 1 });
  const hrm = new HeartRateSensor();
   accelerometer.addEventListener("reading", () => {
     // hrm.addEventListener("reading", () => {});
     // gyroscope.addEventListener("reading", () => {});
     // sendMessage(accelerometer.x,accelerometer.y,accelerometer.z);
     messaging.peerSocket.onopen = function() {
        // Ready to send messages
        // sendMessage(accelerometer.x,accelerometer.y,accelerometer.z);
       message_interval = setInterval(function(){ sendMessage(accelerometer.x,accelerometer.y,accelerometer.z, gyroscope.x, gyroscope.y, gyroscope.z, hrm.heartRate); }, 1000);
       // setIntreval(sendMessage, 5000);
      }
     messaging.peerSocket.onerror = function(err) {
        // Handle any errors
        console.log("Connection error: " + err.code + " - " + err.message);
      }
     
     messaging.peerSocket.onclose = () => {
        clearInterval(message_interval);
      };
     // console.log(`${accelerometer.x},${accelerometer.y},${accelerometer.z}`);
   });
  hrm.start();
  gyroscope.start();
   accelerometer.start();
} else {
   console.log("This device does NOT have an Accelerometer!");
}

function sendMessage(x, y, z, gx, gy, gz, hr){
  console.log("data :" + gx + " " + gy +" " + gz + " " + hr);
  var data = {
    gyr_data_x: gx,
    gyr_data_y: gy,
    gyr_data_z: gz,
    acc_data_x: x,
    acc_data_y: y,
    acc_data_z: z,
    hr: hr
  }
  
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send the data to peer as a message
    messaging.peerSocket.send(data);
  }
  
}

