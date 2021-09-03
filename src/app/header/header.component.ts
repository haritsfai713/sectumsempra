import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgModel } from "@angular/forms"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @Input('userData') public dataUser : any ;

  dataUser = {
    nama: localStorage.getItem("nama"),
    email: localStorage.getItem("email"),
  }


  public list = false;
  public user = false;

  // CONNECT KE UAV LEWAT APA ? (serial, udp)
  public connectUsing = "";


  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  listUAV(){
    this.list = !this.list;
  }

  userPopup(){
    this.user = !this.user;
  }

  logoutUser(){
    this.auth.logout();
  }

  connect(){
    if (this.connectUsing === "serial") {
      // this.serial.connect();
    }
  }


}
