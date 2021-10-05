import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit} from '@angular/core';
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
    "nama": "",
    "email" : "",
  }
  public isMap = false;

  public alt = 0;
  public gs = 0
  public room = ""; 

  constructor(
    private flightdataservice: FlightDataService,
    private auth: AuthService,
    private rout: Router,
    private voice: VoiceActivationService,
    public webSocketService : WebSocketService
    
  ) {
    this.voice.init();
  }

  ngOnInit(): void {
    this.auth.verifyToken().subscribe(
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 500) {
            this.rout.navigate(['/login']);
          }
        }
      }
    );

    this.webSocketService.listen("test-event").subscribe((data) => {
      
      console.log(data);
    })

    // this.webSocketService.openWebSocket()
    // setInterval( () => {
    //   this.alt = this.webSocketService.alt;
    //   this.gs = this.webSocketService.gs;
    // }, 200);





  }

  ngOnDestroy() {
    // this.webSocketService.closeWebsocket()
  }

  startVoice(){
    this.voice.start();

  }

  stopVoice(){
    this.voice.stop();
  }
  onKey(event: any) {
    this.room = event.target.value
    const payload = { room : this.room, data : ""}
    this.webSocketService.emit("room", JSON.stringify(payload)); 
  }




}
