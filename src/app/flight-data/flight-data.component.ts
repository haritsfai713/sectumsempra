import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import * as anime from 'animejs';
import { AuthService } from '../services/auth.service';
import { FlightDataService } from '../services/flight-data.service';
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
  constructor(
    private flightdataservice: FlightDataService,
    private auth: AuthService,
    private rout: Router
  ) {}

  ngOnInit(): void {
    this.auth.verifyToken().subscribe(
      (res) => {
        this.user.nama = res.data.nama
        this.user.email = res.data.email

      },

      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 500) {
            this.rout.navigate(['/login']);
          }
        }
      }
    );
  }
}
