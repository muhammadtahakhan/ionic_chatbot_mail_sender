import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user : FormGroup;

 currentInput = 'user name'


  constructor( private router: Router,  private speechRecognition: SpeechRecognition, 
    private faio: FingerprintAIO,
    private tts: TextToSpeech) { 

     this.user = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
     });


    }

  ngOnInit() {
    
    }

  ionViewDidEnter(){
    this.start();
  }

  start(){
    this.tts.speak('Please spell your username, once done call next for spell password')
    .then(() => {console.log('Success'); this.takeUser();  })
    .catch((reason: any) => console.log(reason));
  }


  takeUser(){
   
    this.speechRecognition.startListening()
    .subscribe(

      (matches: Array<string>) => {
        console.log(matches);
        if(matches[0]=='back'){
        this.goBack();
        }
       if(matches[0]=='next'){
        this.tts.speak('Please spell your password')
        .then(() => { console.log('Success');  this.takePass(); })
        .catch((reason: any) => console.log(reason));
       
       }else{

        this.user.get('username').setValue( this.user.get('username').value+matches[0]);
        this.tts.speak('say next work')
        .then(() => {console.log('Success');  this.takeUser(); })
        .catch((reason: any) => console.log(reason));
       }
      
       
       
                     
      },
      (onerror) => console.log('error:', onerror)
    )
  }

takePass(){

  this.speechRecognition.startListening()
  .subscribe(

    (matches: Array<string>) => {
      console.log(matches);
      if(matches[0]=='back'){
        this.router.navigate(['user-account']);
      }
     
    if(matches[0]=='submit' || matches[0]=='done' || matches[0]=='thanks'){
      this.login();
    }else{
      this.user.get('password').setValue(this.user.get('password').value+matches[0]);
      this.tts.speak('say next work')
      .then(() => {console.log('Success');  this.takePass(); })
      .catch((reason: any) => console.log(reason));
   
    }
      
      
    },
    (onerror) => console.log('error:', onerror)
  )
}

goBack(){
  this.router.navigate(['user-account']);
}


 
  login(){
    this.faio.isAvailable()
    .then(isAvailable=>{


      this.faio.show({
        clientId: 'Fingerprint-Demo',
        clientSecret: 'password', //Only necessary for Android
        // disableBackup:true,  //Only for Android(optional)
        // localizedFallbackTitle: 'Use Pin', //Only for iOS
        // localizedReason: 'Please authenticate' //Only for iOS
    })
    .then((result: any) => console.log(result))
    .catch((error: any) => console.log(error));



    }).catch((error: any) => console.log(error));
    
  }


  swipeEvent(event){
    alert(event.direction);
   console.log(event.direction);
 }

}
