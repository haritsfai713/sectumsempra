import { Injectable } from '@angular/core';

declare var webkitSpeechRecognition: any;
declare var SpeechSynthesisUtterance: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceActivationService {

recognition =  new webkitSpeechRecognition();
  speech = new SpeechSynthesisUtterance();
  isStoppedSpeechRecog = false;
  public text = '';
  public transc = '';
  tempWords : any;


  constructor() { }

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
    console.log("End speech recognition")
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';

  }
  readoutloud() {

    if(this.transc.includes("altitude")){
      this.speech.text = "current altitude is meter";
    }
    if(this.transc.includes("ground speed")){
      this.speech.text = "current ground speed is meter per second";
    }
    if(this.transc.includes("battery")){
      this.speech.text = "current battery is percent";
    }

    //  this.speech.text = "hello"
     this.speech.volume = 1;
     this.speech.rate = 1;
     this.speech.pitch = 1;
     console.log("success");

     window.speechSynthesis.speak(this.speech);
  }
}

