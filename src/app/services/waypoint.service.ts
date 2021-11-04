
// import from angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import from local
import { ObjectWaypoint } from '../models/waypoint';
import { WAYPOINTS } from '../models/waypoints';
import { FlightDataService } from "./flight-data.service";

// import from rxjs
import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class WaypointService {

  constructor(private httpClient: HttpClient, private flightDataService: FlightDataService) {console.log('Initialize WaypoinitService') }
  waypoints = WAYPOINTS;

  add(waypoint: ObjectWaypoint) {
    this.waypoints.push(waypoint);
    //console.log('totalWaypoints in service', this.waypoints.length)
    //console.log('added to service', waypoint.g   etCoordinate())
    //console.log('finalWaypoint',this.waypoints)
  }

  addOn(waypoint : ObjectWaypoint, n : number){
    let temp_waypoints = this.waypoints
    this.waypoints = temp_waypoints.slice(0,n).concat(waypoint).concat(temp_waypoints.slice(n , -1))
  }

  clear() {
    this.waypoints = [];
  }

  remove(n : number){
    let temp_waypoints = this.waypoints
    this.waypoints = temp_waypoints.slice(0,n).concat(temp_waypoints.slice(n , -1))
  }

  getCoordinateOn(n:number){
    return this.waypoints[n].getCoordinate()
  }

  getCoordinateArray(){
    let temp: number[][] = [];
    for (var i = 0; i < (this.waypoints.length); i++){
      temp.push(this.waypoints[i].getCoordinate() );
    }
    return temp
  }
  //save(filename:string){}

  getWaypoints(): Observable<ObjectWaypoint[]> {
    return of(this.waypoints);
  }
  sendWaypoint() {
    //console.log("masuksini")
    //console.log(this.getCoordinateArray())
    var temp: any[];
    temp = []
    for(let i = 0;i<this.getCoordinateArray().length;i++){
      let arrTotal = this.getCoordinateArray()
      //console.log("arrTotal:",arrTotal)
      let latitude = arrTotal [i][1];
      let longitude = arrTotal [i][0];
      temp.push({latitude, longitude});
      //console.log("latitude:",latitude)
      //console.log(temp)
    }

    return (this.flightDataService.sendWaypoint(temp));
  }
}
