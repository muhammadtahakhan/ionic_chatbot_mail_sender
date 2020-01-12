import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { takeWhile } from 'rxjs/operators';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-initial-route',
  templateUrl: './initial-route.page.html',
  styleUrls: ['./initial-route.page.scss'],
})
export class InitialRoutePage implements AfterViewInit, OnInit, OnDestroy {
  private alive = true;
  constructor(  private tts: TextToSpeech,
                private speechRecognition: SpeechRecognition,
                public navCtrl: NavController) { }

  ngOnInit() {

  }

  ngAfterViewInit(){
    this.start();
  }

  ngOnDestroy() {
    console.log('[takeWhile] ngOnDestory');
    this.alive = false;
  }

  start() {
    console.log('start-->')
    this.tts.speak({text: 'what do you want , say login to login or say register to register',
        locale: 'en-GB'})
      .then(() => { this.take_route(); })
      .catch((reason: any) => {  } );
  }

  take_route(){
    this.speechRecognition.startListening()
    .pipe(takeWhile(() => this.alive))
    .subscribe(
      (matches: Array<string>) => {
        console.log(matches);
        if ( matches[0].includes('login')) {
            this.navCtrl.navigateForward('login');
        } else if (matches[0].includes('login')) {
          this.navCtrl.navigateForward('register');
        }
      },
      error => { });
  }

  goLogin() {
    this.navCtrl.navigateForward('login');
  }

  goRegister() {
    this.navCtrl.navigateForward('register');
  }

}
