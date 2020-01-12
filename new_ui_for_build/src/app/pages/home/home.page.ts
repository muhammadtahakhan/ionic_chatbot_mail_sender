// import { AppSettings } from './../../services/app-settings';
import { Component, OnInit } from '@angular/core';
// import { HomeService } from './../../services/home-service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast-service';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
// import { IntroPage } from '../intro-page/intro-page.page';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  // providers: [HomeService]
})
export class HomePage implements OnInit {

  item = { "toolbarTitle": " Voice basef email system for blinds",
  "title": "Voice basef email system for blinds",
  "subtitle": "",
  "subtitle2": "",
  "link": "",
  "description": "For better understanding how our template works please read documentation.",
  "background": "assets/imgs/background/8.jpg"};

  constructor(
    private router: Router,
    private toastCtrl: ToastService,
    private tts: TextToSpeech,
    private speechRecognition: SpeechRecognition,
    // private homeService:HomeService,
    public modalController: ModalController) {
  }

  ngOnInit() {
  this.start();

  }

  start() {
    this.tts.speak({text: 'you are at home, what you want, to check your inbox say "inbox" or send email say "new email" or outbox , or setting for setting',
    locale: 'en-GB'})
  .then(() => {this.toastCtrl.presentToast('start... takeUser'); this.getdirection();  })
  .catch((reason: any) => console.log(reason));

  }

  getdirection(){

    this.speechRecognition.startListening()
    .subscribe((matches: Array<string>) => {
        console.log(matches);
        if ( matches[0] === 'new email') {
          this.goTo('compose-email');
        }

        if ( matches[0] === 'inbox') {
          this.goTo('inbox');


       } else if ( matches[0] === 'outbox') {
        this.goTo('outbox');


       } else if ( matches[0].includes("setting")) {
        this.goTo('setting');


       } else {

       }

      },
      (onerror) => console.log('error:', onerror)
    )

  }



  goTo(url) {
    this.router.navigate([url]);
  }
}
