import { Injectable, OnInit } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class MavlinkService  {
  public i = 1000
  //public coordinate = [107.5721, -6.9823]
  public lon = 107.5721
  public lat = -6.9823
  public parsedData: any
  public yaw = 0 ;


  constructor(private webSocketService: WebSocketService) { }

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
    */
  }

  Init(): void {
    console.log("inittttt dari mavlink service")
    this.webSocketService.listen('test-event').subscribe((data: any) => {
      if(this.webSocketService.room == "") {
        this.parsedData = data

      }
      else {
        this.parsedData = JSON.parse(data)

      }

      console.log(data)


      switch (this.parsedData.message) {
        case 'ATTITUDE':
          this.yaw = this.parsedData.mavData.yaw;
          break;
        case 'GLOBAL_POSITION_INT':
          this.lon = this.parsedData.mavData.lon/10000000 ;
          this.lat = this.parsedData.mavData.lat/10000000 ;
          break;

      }
    });
  };


  getyaw(){
    // console.log("yaw : ",this.yaw*180/Math.PI)
    return(this.yaw)
    // return(this.yaw = -2.984*180/Math.PI)

  }



  getCoordinate(){
    //console.log('lon: ' ,this.lon)
    //console.log('lat: ' ,this.lat)
    return [this.lon, this.lat]
  }


  public convertMS(time:any) {
    let hour, minute, seconds;
    seconds = Math.floor(time / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    hour = hour % 24;
    return {
      hour: hour,
      minute: minute,
      seconds: seconds
    };
  }


  // loadMavlinkSerial(port: any) {
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


