// import { AppSettings } from './../../services/app-settings';
import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { HomeService } from './../../services/home-service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast-service';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
// import { IntroPage } from '../intro-page/intro-page.page';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  // providers: [HomeService]
})
export class HomePage implements OnInit, AfterViewInit {

  item = { "toolbarTitle": " Voice base email system for blinds",
  "title": "Voice base email system for blinds",
  "subtitle": "",
  "subtitle2": "",
  "link": "",
  "description": "For better understanding how our template works please read documentation.",
  "background": "assets/imgs/background/33.jpeg"};

  constructor(
    private router: Router,
    private toastCtrl: ToastService,
    private tts: TextToSpeech,
    private speechRecognition: SpeechRecognition,
    public authenticationService: AuthenticationService,
    // private homeService:HomeService,
    public modalController: ModalController) {
  }

  ngOnInit() {
  

  }

  ngAfterViewInit(){
    this.start();
  }

  start() {
    this.tts.speak({text: 'you are at home, what you want, to check your inbox say "inbox" or send email say "new email" or outbox , or setting for setting',
    locale: 'en-GB', rate: 0.80})
  .then(() => {this.toastCtrl.presentToast('start... takeUser'); this.getdirection();  })
  .catch((reason: any) => console.log(reason));

  }

  again(){
    this.tts.speak({text: 'sorry come again, you are at home, what you want, to check your inbox say "inbox" or send email say "new email" or outbox , or setting for setting',
    locale: 'en-GB', rate: 0.80})
  .then(() => {this.toastCtrl.presentToast('start... takeUser'); this.getdirection();  })
  .catch((reason: any) => console.log(reason));
  }

  getdirection(){

    this.speechRecognition.startListening()
    .subscribe((matches: Array<string>) => {
        console.log(matches);
        if ( matches[0].includes("new") || matches[0].includes("compose") ) {
          this.goTo('compose-email');
        }

        else if ( matches[0].includes("inbox")) {
          this.goTo('inbox');


       } else if ( matches[0] === 'outbox' || matches[0].includes('sent') ) {
        this.goTo('outbox');


       }else if ( matches[0] === 'logout' || matches[0].includes('logout') ) {
        this.authenticationService.logout();


       }else if ( matches[0] === 'trash' || matches[0].includes('delete') || matches[0].includes('trash')) {
        this.goTo('trash');


       } else if ( matches[0].includes("setting")) {
        this.goTo('setting');


       } else {
        this.again();
       }

      },
      (onerror) => console.log('error:', onerror)
    )

  }



  goTo(url) {
    this.router.navigate([url]);
  }
}
