import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { parameterRecords } from '../models/parameterRecords';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.css']
})
export class ParameterComponent implements OnInit {

  constructor(private auth: AuthService, private rout: Router) { }

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
  public param_id: number = 0;
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
  }

}
