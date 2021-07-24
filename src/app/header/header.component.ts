import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public list = false;
  public user = false;
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



}
