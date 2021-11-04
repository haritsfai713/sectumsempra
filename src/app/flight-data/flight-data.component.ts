import { HttpErrorResponse } from '@angular/common/http';
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

  public room = '';

  // FLIGHT DATA COMPONENT
  public parsedData : any;
  public alt = 0;
  public groundspeed = 0;
  public pitch = 0;
  public yaw = 0;
  public roll = 0;

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

      this.parsedData = JSON.parse(data);

      switch (this.parsedData.message) {
        case 'ATTITUDE':
          this.pitch = this.parsedData.fields.pitch;
          this.yaw = this.parsedData.fields.yaw;
          this.roll = this.parsedData.fields.roll;
          break;
        case 'VFR_HUD':
          this.alt = this.parsedData.fields.alt;
          this.groundspeed = this.parsedData.fields.groundspeed;
      }
      console.log(this.parsedData);
    });

    // this.webSocketService.openWebSocket()
    // setInterval( () => {
    //   this.alt = this.webSocketService.alt;
    //   this.gs = this.webSocketService.gs;
    // }, 200);
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
  onKey(event: any) {
    this.room = event.target.value;
    const payload = { room: this.room, data: '' };
    this.webSocketService.emit('room', JSON.stringify(payload));
  }
}
