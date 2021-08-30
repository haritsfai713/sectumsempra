import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public alt = 0;
  public gs = 0;
  public webSocket : WebSocket | undefined 

  constructor() { }

  public openWebSocket() {
    this.webSocket = new WebSocket('ws://localhost:3000');

    this.webSocket.addEventListener('open', (event) => {
      console.log("connected to WS server")
    })
    this.webSocket.addEventListener('message', (event) => {
      var message = JSON.parse(event.data)
      console.log(message)
      if (message["nama"] === "alt"){
        this.alt = message["value"]
      }
      if (message["nama"] === "gs"){
        this.gs = message["value"]
      }

      // this.message = event.data
    })

    // this.webSocket.onopen = (event) => {
    //   console.log('Open', event)
    // }

    // this.webSocket.onmessage = (event) => {
    //  this.message = JSON.parse(event.data);
    // };

    // this.webSocket.onclose = (event) => {
    //   console.log('Close', event);
    // }
  }

  public sendMessage() {
    this.webSocket?.send("hello from client 1");
  }
  
  public closeWebsocket() {
    this.webSocket?.close(); 
  }


}
