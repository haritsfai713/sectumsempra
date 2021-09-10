import { Injectable } from '@angular/core';
// var mavlink = require("mavlink") //ERROR

@Injectable({
  providedIn: 'root'
})
export class MavlinkService {
  public i = 1000
  //public coordinate = [107.5721, -6.9823]
  public lon = 107.5721
  public lat = -6.9823

  initDummy(){
  console.log('initilizing dummy')
    /*
    var y = this.i
    setInterval(function (f = y){
      y--
      console.log(f)
      console.log(y)
      //this.MavlinkService.changevalue(f)
    },100)
    this.i = y
  */

  }

  getyaw(){
    this.i--
    //console.log("yaw : ",this.i /10)
    return(this.i/10)

  }

  getCoordinate(){
    //console.log('lon: ' ,this.lon)
    //console.log('lat: ' ,this.lat)
    return [this.lon,this.lat]
  }

  constructor() { }

  loadMavlinkSerial(port: any) {
    // mavlink.on("ready", function () {
    //   //parse incoming serial data
    //   port.on("data", function (data: any) {
    //    mavlink.parse(data);
    //   });

    //   //listen for messages
    //  mavlink.on("message", function (message: any) {
    //     console.log(message);
    //   });

    //   port.on("message", () => {
    //    mavlink.on("HEARTBEAT", function (message: any , fields: any) {
    //       console.log(fields);
    //     });
    //   });

    //   myMAV.createMessage(
    //     "PARAM_REQUEST_LIST",
    //     {
    //       //Membuat messagenya terlebih dahulu
    //       target_system: 1,
    //       target_component: 1,
    //     },
    //     function (message) {
    //       console.log("Requesting all parameters to PX4...");
    //       //Gunakan mavlink v1 (karena meliputi array of char)
    //       use_v1 = true;
    //       setTimeout(() => {
    //         //Mengirim PARAM_REQUEST_LIST ke PX4
    //         port.write(message.buffer);
    //       }, 1000);
    //       setTimeout(() => {
    //         //Timeout untuk mematikan parser mavlink v1
    //         use_v1 = false;
    //       }, 2000);
    //     }
    //   );
    // })

  }
}


