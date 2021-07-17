import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { FlightRecord } from '../models/flightrecord';
import { parameterRecords } from '../models/parameterRecords';
import { btnParamStatus } from '../models/btnParamStatus';

@Injectable({
  providedIn: 'root'
})
export class FlightDataService {

  private url = "";

  constructor(private httpClient: HttpClient) { console.log('Initialize flightdata Service')}

  getFlightRecords(): Observable<FlightRecord> {
    return this.httpClient.get<FlightRecord>(this.url+'api/flightdatas')
      .pipe(map(res => { return res }));
  }

  getParameterRecords(): Observable<parameterRecords> {
    return this.httpClient.get<parameterRecords>(this.url+'api/parameters')
      .pipe(map(res => { return res }));
  }

  getBtnParamStatus(): Observable<btnParamStatus> {
    return this.httpClient.get<btnParamStatus>(this.url+'api/btnparams')
      .pipe(map(res => { return res }));
  }


  sendData(url:any, data:any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'aplication/json');

    return this.httpClient.post(this.url+'api/' + url, data, {headers: headers})
    .pipe(map(res => { return res }));
  }

  sendParameterRecords(data:any) {
    return this.sendData('parameter', data);
  }

  sendFlightRecord(data:any) {
    return this.sendData('flightdata', data);
  }

  sendWaypoint(data:any) {
    //console.log("sending mission data")
    return this.sendData('waypoint', data);
  }

  sendBtnParamStatus(data:any) {
    return this.sendData('btnparam', data);
  }
}
