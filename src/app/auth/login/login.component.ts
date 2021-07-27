import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { getUserProjection } from 'ol/proj';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {
    "email": "",
    "password": ""
  }

  constructor(private auth: AuthService, private rout: Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    this.auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        localStorage.setItem('nama', res.data[0].nama)
        localStorage.setItem('email', res.data[0].email)
        this.rout.navigate(['/dashboard'])

      },
      err => console.log(err)
    )
  }

}
