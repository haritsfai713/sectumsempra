import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {
  public Lon = 107.5721
  public Lat = -6.9823
  public isMap = true
  public room = "";
  public parsedData : any;
  public yaw = 0 ;

  constructor(private auth: AuthService, private rout: Router,private webSocketService:WebSocketService) { }

  ngOnInit(): void {
    this.auth.verifyToken()
    .subscribe(
      res => console.log(res),
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 500) {
            this.rout.navigate(['/login'])
          }
        }
      }
    )
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
          this.yaw = this.parsedData.mavData.yaw;
          break;

      }
      // console.log(this.parsedData);

    });
  }

  onKey(event: any) {
    this.room = event.target.value;
    const payload = { room: this.room, data: '' };
    this.webSocketService.emit('room', JSON.stringify(payload));
  }
}

