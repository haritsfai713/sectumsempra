import { HttpErrorResponse } from '@angular/common/http';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as anime from 'animejs';
import { Socket } from 'socket.io-client';
import { AuthService } from '../services/auth.service';
import { FlightDataService } from '../services/flight-data.service';
import { VoiceActivationService } from '../services/voice-activation.service';
import { WebSocketService } from '../services/web-socket.service';

anime;

@Component({
  selector: 'app-flight-data',
  templateUrl: './flight-data.component.html',
  styleUrls: ['./flight-data.component.css'],
})
export class FlightDataComponent implements OnInit, OnDestroy {
  public user = {
    nama: '',
    email: '',
  };
  public isMap = false;

  public room = "";

  // FLIGHT DATA COMPONENT
  public parsedData : any;
  public alt = 0;
  public groundspeed = 0;
  public pitch = 0;
  public yaw = 0;
  public roll = 0;
  public time = {
    hour : 0,
    minute : 0,
    seconds : 0
  };

  constructor(
    private flightdataservice: FlightDataService,
    private auth: AuthService,
    private rout: Router,
    private voice: VoiceActivationService,
    public webSocketService: WebSocketService
  ) {
    this.voice.init();
  }

  ngOnInit(): void {
    this.auth.verifyToken().subscribe((err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 500) {
          this.rout.navigate(['/login']);
        }
      }
    });



    this.webSocketService.listen('test-event').subscribe((data: any) => {
      if(this.room == "") {
        this.parsedData = data

      }
      else {
        this.parsedData = JSON.parse(data)

      }
      this.webSocketService.room = this.room ;


      switch (this.parsedData.message) {
        case 'ATTITUDE':
          this.pitch = this.parsedData.mavData.pitch;
          this.yaw = this.parsedData.mavData.yaw;
          this.roll = this.parsedData.mavData.roll;
          this.time = this.convertMS(this.parsedData.mavData.time_boot_ms);

          break;
        case 'VFR_HUD':
          // this.alt = this.parsedData.mavData.alt;
          this.groundspeed = this.parsedData.mavData.groundspeed;
          break;
        case 'GLOBAL_POSITION_INT' :
          this.alt = this.parsedData.mavData.relative_alt/1000;

      }
      // console.log(this.parsedData);

    });

    // this.webSocketService.openWebSocket()
    // setInterval( () => {
    //   this.alt = this.webSocketService.alt;
    //   this.gs = this.webSocketService.gs;
    // }, 200);
  }

  ngAfterViewInit() {
    requestAnimationFrame(() => {
      this.animateAll();
    });
  }

  public animateAll() {
    (<any>anime).default({
      targets: ["#sky", "#bar"],
      translateY: this.pitch*180/Math.PI,
      duration: 0
    });

    (<any>anime).default({
      targets: "#arrow-degree",
      rotate: this.yaw*180/Math.PI,
      duration: 0
    });

    (<any>anime).default({
      targets: "#arrow",
      rotate: this.roll*180/Math.PI,
      duration: 0
    });

    (<any>anime).default({
      targets: ["#alt", "#pos"],
      innerHTML: this.alt,
      duration: 0,
      round: 10
    });

    (<any>anime).default({
      targets: "#gdspeed",
      innerHTML: this.groundspeed,
      duration: 0,
      round: 10
    });

    if (this.time['seconds'] != 0) {
      (<any>anime).default({
        targets: "#second",
        innerHTML: this.time['seconds'],
        duration: 0,
        round: 0
      });
      (<any>anime).default({
        targets: "#minute",
        innerHTML: this.time['minute'],
        duration: 0,
        round: 0
      });
      (<any>anime).default({
        targets: "#hour",
        innerHTML: this.time['hour'],
        duration: 0,
        round: 0
      });
    }



    requestAnimationFrame(() => {
      this.animateAll();
    });
  }

  ngOnDestroy() {
    // this.webSocketService.closeWebsocket()
  }

  startVoice() {
    this.voice.start();
  }

  stopVoice() {
    this.voice.stop();
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

  onKey(event: any) {
    this.room = event.target.value;
    const payload = { room: this.room, data: '' };
    this.webSocketService.emit('room', JSON.stringify(payload));
  }
}
