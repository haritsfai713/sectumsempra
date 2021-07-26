import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private _url = "http://localhost:3000/api"

  private _url = "http://localhost:3000/api/v1"

  constructor(private http: HttpClient, private rout: Router) {

  }

  registerUser(user:any) {
    // return this.http.post<any>(this._url + "/register",user);
    return this.http.post<any>(this._url + "/users/signup",user);
  }
  loginUser(user:any) {
    // return this.http.post<any>(this._url + "/login",user);
    return this.http.post<any>(this._url + "/users/login",user);
  }

  loggedin() {
    return !!localStorage.getItem('token')
  }

  verifyToken() {
    // return this.http.get<any>(this._url + "/special");
    return this.http.get<any>(this._url + "/users/verifyToken");
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logout(){
    localStorage.removeItem('token')
    this.rout.navigate(['/login'])
  }
}
