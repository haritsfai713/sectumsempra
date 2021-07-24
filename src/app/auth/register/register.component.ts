import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {
    "nama": "",
    // "phone": "",
    // "address": "",
    "email": "",
    "password": "",
    "passwordConfirm": ""
  }

  constructor(private auth: AuthService, private rout: Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    this.auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        console.log(this.registerUserData)
        this.rout.navigate(['/login'])

      },
      err => console.log(err)
    )
  }

}
