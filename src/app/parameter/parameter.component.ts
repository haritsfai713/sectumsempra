import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { parameterRecords } from '../models/parameterRecords';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.css']
})
export class ParameterComponent implements OnInit {
  public room:any
  constructor(private auth: AuthService, private rout: Router, public websocket: WebSocketService) { }
  public allparam: any = []
  public parameters: parameterRecords = {
    _id: "",
    children: [{
      param_count: 1,
      param_id: "SYSID_THISMAV",
      param_index: 0,
      param_type: 1,
      param_value: 9,
    }]
  }
  public param_count: number = 0;
  public param_id: string = "";
  public param_index: number = 0;
  public param_type: number = 0;
  public param_value: number = 0;

  public getParamBtn: boolean = false;
  public sendParamBtn: boolean = false;

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
      this.websocket.listen('get-parameter').subscribe((data: any) => {
        var dataobj = JSON.parse(data)
        // console.log(dataobj.param_value)
        if(!(dataobj in this.allparam) && this.allparam.length < 100){
          this.allparam.push(dataobj);
        }
        // this.allparam.param_index = dataobj.param_index;
        // this.allparam.param_id = dataobj.param_id;
        // this.allparam.param_value = dataobj.param_value;
        // this.allparam.param_type = dataobj.param_type;
        console.log(this.allparam)
        // console.log(this.allparam.length)
      })
  }

  onKey(event: any) {
    this.room = event.target.value;
  }

  getAllParameters(){
    const payload = { room: this.room, data: "Meminta data semua parameter" };
    this.websocket.emit('req-parameter', JSON.stringify(payload));
  }
  sendAllParameters(){
    const payload = { room: this.room, data: this.allparam };
    this.websocket.emit('set-parameter', JSON.stringify(payload));
  }

  leaveroom() {
    this.websocket.room = this.room
    const payload = { room: this.room, data: '' };
    console.log(payload)
    this.websocket.emit('leave-room', JSON.stringify(payload));
  }

}
