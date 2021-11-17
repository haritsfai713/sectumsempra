import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public alt = 0;
  public gs = 0;
  public socket: any;
  public room = "";
  public MODE : any;
  constructor() {
    // this.socket = io("https://gcs-webapp-2021-backend.herokuapp.com/")
    this.socket = io("https://gcs-webapp-2021-backend.herokuapp.com/", {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    })

  }
 listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      })
    })
  }

  emit(eventName : any, data : any) {
    this.socket.emit(eventName, data);
  }




  // public openWebSocket() {


  //   this.webSocket = new WebSocket('ws://localhost:3000');

  //   this.webSocket.addEventListener('open', (event) => {
  //     console.log("connected to WS server")
  //   })
  //   this.webSocket.addEventListener('message', (event) => {
  //     var message = JSON.parse(event.data)
  //     console.log(message)
  //     if (message["nama"] === "alt"){
  //       this.alt = message["value"]
  //     }
  //     if (message["nama"] === "gs"){
  //       this.gs = message["value"]
  //     }

  //     // this.message = event.data
  //   })

  //   // this.webSocket.onopen = (event) => {
  //   //   console.log('Open', event)
  //   // }

  //   // this.webSocket.onmessage = (event) => {
  //   //  this.message = JSON.parse(event.data);
  //   // };

  //   // this.webSocket.onclose = (event) => {
  //   //   console.log('Close', event);
  //   // }
  // }

  // public sendMessage() {
  //   this.webSocket?.send("hello from client 1");
  // }

  // public closeWebsocket() {
  //   this.webSocket?.close();
  // }


}
