import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.page.html',
  styleUrls: ['./user-account.page.scss'],
})
export class UserAccountPage implements OnInit {
  bgcolor: string = 'white';

  constructor( private router: Router, private speechRecognition: SpeechRecognition, private tts: TextToSpeech) { }

  ngOnInit() {}


  ionViewDidEnter() {

    this.tts.speak('say login to login , or say signup for signup')
    .then(() => {console.log('Success');  this.takeRoute();})
    .catch((reason: any) => console.log(reason));


    this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {

      if (!hasPermission) {
      this.speechRecognition.requestPermission()
        .then(
          () => {
            console.log('Granted');
            this.takeRoute();
          },
          () => console.log('Denied')
        )
      }

   });


  }

  takeRoute(){
   
    this.speechRecognition.startListening()
    .subscribe(

      (matches: Array<string>) => {
        console.log(matches);
        if(matches[0]=='login'){
          this.router.navigate(['login'])
          
        }
        if(matches[0]=='sign up'){
          this.router.navigate(['signup'])
        }
        
      },
      (onerror) => console.log('error:', onerror)
    )
         
  }

  start() {

    this.speechRecognition.startListening()
      .subscribe(

        (matches: Array<string>) => {
          console.log(matches);
          this.bgcolor = matches[0];
        },
        (onerror) => console.log('error:', onerror)
      )

}

  goToSignup(){
    this.router.navigateByUrl('/signup');
  }

  goTOLogin(){
    this.router.navigateByUrl('/login');
  }

}
