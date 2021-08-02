import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SerialService {

  constructor() { }

  async connect() {
    if ('serial' in navigator) {
      try {
        const port = await (navigator as any).serial.requestPort();
        await console.log(port)
        await port.open({ baudRate: 9600 });
        // this.reader = port.readable.getReader();
        // this.writer = port.writable.getWriter();

        // this.verif = true;
      }
      catch(err) {
        console.error('There was an error opening the serial port:', err);
        // this.verif = false;
      }
    } else {
      console.error('Web serial doesn\'t seem to be enabled in your browser. Try enabling it by visiting:')
      console.error('chrome://flags/#enable-experimental-web-platform-features');
      console.error('opera://flags/#enable-experimental-web-platform-features');
      console.error('edge://flags/#enable-experimental-web-platform-features');
    }
  }

  async clickConnect(){
    await this.connect()
  }


}

