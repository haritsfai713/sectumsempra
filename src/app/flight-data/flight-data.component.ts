import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import * as anime from 'animejs';
import { AuthService } from '../services/auth.service';
import { FlightDataService } from '../services/flight-data.service';
import { VoiceActivationService } from '../services/voice-activation.service';
anime;

@Component({
  selector: 'app-flight-data',
  templateUrl: './flight-data.component.html',
  styleUrls: ['./flight-data.component.css'],
})
export class FlightDataComponent implements OnInit {
  public user = {
    "nama": "",
    "email" : "",
  }
  public isMap = false;

  constructor(
    private flightdataservice: FlightDataService,
    private auth: AuthService,
    private rout: Router,
    private voice: VoiceActivationService
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

  }

  startVoice(){
    this.voice.start();

  }

  stopVoice(){
    this.voice.stop();
  }




}
