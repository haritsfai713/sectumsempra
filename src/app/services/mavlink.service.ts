import { Injectable } from '@angular/core';
// const mavlink = require('mavlink');

@Injectable({
  providedIn: 'root'
})
export class MavlinkService {

  constructor() { }

  // loadMavlinkSerial(port: any) {
  //   mavlink.on("ready", function () {
  //     //parse incoming serial data
  //     port.on("data", function (data: any) {
  //      mavlink.parse(data);
  //     });

  //     //listen for messages
  //    mavlink.on("message", function (message: any) {
  //       console.log(message);
  //     });

  //     port.on("message", () => {
  //      mavlink.on("HEARTBEAT", function (message: any , fields: any) {
  //         console.log(fields);
  //       });
  //     });

  //     // myMAV.createMessage(
  //     //   "PARAM_REQUEST_LIST",
  //     //   {
  //     //     //Membuat messagenya terlebih dahulu
  //     //     target_system: 1,
  //     //     target_component: 1,
  //     //   },
  //     //   function (message) {
  //     //     console.log("Requesting all parameters to PX4...");
  //     //     //Gunakan mavlink v1 (karena meliputi array of char)
  //     //     use_v1 = true;
  //     //     setTimeout(() => {
  //     //       //Mengirim PARAM_REQUEST_LIST ke PX4
  //     //       port.write(message.buffer);
  //     //     }, 1000);
  //     //     setTimeout(() => {
  //     //       //Timeout untuk mematikan parser mavlink v1
  //     //       use_v1 = false;
  //     //     }, 2000);
  //     //   }
  //     // );
  //   })
  // }
}
