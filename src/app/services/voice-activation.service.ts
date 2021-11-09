import { Injectable, OnInit } from '@angular/core';
import { WebSocketService } from './web-socket.service';

declare var webkitSpeechRecognition: any;
declare var SpeechSynthesisUtterance: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceActivationService implements OnInit {

recognition =  new webkitSpeechRecognition();
  speech = new SpeechSynthesisUtterance();
  isStoppedSpeechRecog = false;
  public text = '';
  public transc = '';
  public room = 0;

  // FLIGHT DATA COMPONENT
  public parsedData : any;
  public lon = 0;
  public lat = 0;
  public alt = 0;
  public groundspeed = 0;
  public pitch = 0;
  public yaw = 0;
  public roll = 0;
  public time = {
    hour : 0,
    minute : 0,
    seconds : 0
  };

  tempWords : any;


  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {


  }


  init() {

    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.addEventListener('result', (e:any) => {
      const transcript = Array.from(e.results)
        .map((result:any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      this.transc = transcript;
    });

    this.webSocketService.listen('test-event').subscribe((data: any) => {
      if(this.webSocketService.room == "") {
        this.parsedData = data

      }
      else {
        this.parsedData = JSON.parse(data)

      }


      switch (this.parsedData.message) {
        case 'ATTITUDE':
          this.pitch = this.parsedData.mavData.pitch*180/Math.PI;
          this.yaw = this.parsedData.mavData.yaw*180/Math.PI;
          this.roll = this.parsedData.mavData.roll;
          this.time = this.convertMS(this.parsedData.mavData.time_boot_ms);
          break;
        case 'GLOBAL_POSITION_INT':
          this.lon = this.parsedData.mavData.lon ;
          this.lat = this.parsedData.mavData.lat ;
          this.alt = this.parsedData.mavData.relative_alt/1000;
          break;
        case 'VFR_HUD':
          // this.alt = this.parsedData.mavData.alt;
          this.groundspeed = this.parsedData.mavData.groundspeed;
          break;


      }
    });

    // this.webSocketService.listen('test-event').subscribe((data: any) => {
    //   if(this.room == 0) {
    //     this.parsedData = data

    //   }
    //   else {
    //     this.parsedData = JSON.parse(data)
    //   }


    //   switch (this.parsedData.message) {
    //     case 'ATTITUDE':
    //       this.pitch = this.parsedData.mavData.pitch;
    //       this.yaw = this.parsedData.mavData.yaw;
    //       this.roll = this.parsedData.mavData.roll;
    //       this.time = this.parsedData.mavData.time_boot_ms;
    //       break;
    //     case 'VFR_HUD':
    //       this.alt = this.parsedData.mavData.alt;
    //       this.groundspeed = this.parsedData.mavData.groundspeed;
    //   }
    //   console.log(this.parsedData);

    // });



    // this.webSocket.openWebSocket()
    // setInterval( () => {
    //   this.alt = this.webSocket.alt;
    //   this.gs = this.webSocket.gs;
    // }, 200);

    // this.webSocketService.openWebSocket()
    // setInterval( () => {
    //   this.alt = this.webSocketService.alt;
    //   this.gs = this.webSocketService.gs;
    // }, 200);


  }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started")
    this.recognition.addEventListener('end', (condition:any) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("End speech recognition")
      } else {
        this.wordConcat()
        this.recognition.start();
        this.readoutloud();

      }
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat();
    this.recognition.stop();
    this.tempWords = '';
    console.log("End speech recognition")
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';

  }
  readoutloud() {

    if(this.transc.includes("altitude")){
      // this.alt.toFixed(2);
      this.speech.text = "current altitude is" + this.alt.toFixed(2) + "meter";
    }
    if(this.transc.includes("ground") && this.transc.includes("speed")){
      this.speech.text = "current ground speed is" + this.groundspeed.toFixed(2) + "meter per second";
    }
    if(this.transc.includes("roll")){
      this.speech.text = "current roll is at angle of" + this.roll.toFixed(2) +"degree";
    }

    if(this.transc.includes("pitch")){
      this.speech.text = "current pitch is at angle of" + this.pitch.toFixed(2) +"degree";
    }
    if(this.transc.includes("yaw")){
      this.speech.text = "current yaw is at angle of" + this.yaw.toFixed(2) +"degree";
    }

    if(this.transc.includes("position")){
      this.speech.text = "current position is at longitude of" + this.lon.toFixed(2) +"and latitude of" + this.lat.toFixed(2);
    }

    //  this.speech.text = "hello"
     this.speech.volume = 1;
     this.speech.rate = 1;
     this.speech.pitch = 1;
     console.log("success");

     window.speechSynthesis.speak(this.speech);
    //  this.speech.text ="";
  }

  public convertMS(time:any) {
    let hour, minute, seconds;
    seconds = Math.floor(time / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    hour = hour % 24;
    return {
      hour: hour,
      minute: minute,
      seconds: seconds
    };
  }



}

