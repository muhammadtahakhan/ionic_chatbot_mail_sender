import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { takeWhile } from 'rxjs/operators';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit, OnDestroy {

  private alive = true;
  data = {
    btnPrev: "Previous",
  btnNext: "Next",
  btnFinish: "Finish",
 items:[
   {iconSlider: "icon-star-outline",
   title: "Welcome",
   description: "Even without sight there is still vision"},
  //  {iconSlider: "icon-star-half",
  //  title: "For Developers",
  //  description: "Save hours of developing. Tons of funcional components."},
  //  {iconSlider: "icon-star",
  //  title: "For Designers",
  //  description: "Endless possibilities. Combine layouts as you wish."}
 ]
};

  constructor(
      private tts: TextToSpeech,
      private speechRecognition: SpeechRecognition,
      private modalController: ModalController,
      public navCtrl: NavController,
     ) {

  }

   closeModal() {
      //  localStorage.setItem("SHOW_START_WIZARD", 'true');
      // this.modalController.dismiss();
      console.log('initial-route');
      this.navCtrl.navigateForward('initial-route');
  }

  ngOnDestroy() {
    console.log('[takeWhile] ngOnDestory');
    this.alive = false;
  }

  ngOnInit(){

    setTimeout(() => {
      this.start();
    }, 2000);

  }

  start(){
    console.log('start-->')
    this.tts.speak({text: 'Welcome to blind peopels email client mobile application,',
        locale: 'en-GB', rate: 0.80})
      .then(() => { this.navCtrl.navigateForward('initial-route'); })
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

}
