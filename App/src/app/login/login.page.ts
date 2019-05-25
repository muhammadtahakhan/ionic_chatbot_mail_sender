import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user : FormGroup;

 currentInput = 'user name'


  constructor( private router: Router,  private speechRecognition: SpeechRecognition, 
    private tts: TextToSpeech) { 

     this.user = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
     });


    }

  ngOnInit() {


    this.takeUser();
    
  }


  takeUser(){
    this.tts.speak('What is you user-name')
    .then(() => {console.log('Success');  })
    .catch((reason: any) => console.log(reason));
    this.speechRecognition.startListening()
    .subscribe(

      (matches: Array<string>) => {
        console.log(matches);
       
          this.user.get('username').setValue(matches[0]);
        this.takePass();
               
      },
      (onerror) => console.log('error:', onerror)
    )
  }

takePass(){
  this.tts.speak('What is you password')
  .then(() => {console.log('Success');  })
  .catch((reason: any) => console.log(reason));
  this.speechRecognition.startListening()
  .subscribe(

    (matches: Array<string>) => {
      console.log(matches);
     
    
        this.user.get('password').setValue(matches[0]);
     
      
    },
    (onerror) => console.log('error:', onerror)
  )
}


 
  login(){
    console.log('login');
  }

}
