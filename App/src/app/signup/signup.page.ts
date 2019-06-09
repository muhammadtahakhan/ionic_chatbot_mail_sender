import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user : FormGroup;
  constructor( private router: Router,  
                private speechRecognition: SpeechRecognition, 
                private faio: FingerprintAIO,
                private tts: TextToSpeech,
                public authenticationService:AuthenticationService,
                ) {

      this.user = new FormGroup({
        name: new FormControl('', Validators.required),
        role_id: new FormControl(1),
        email: new FormControl('', Validators.required),
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        c_password: new FormControl('', Validators.required),
     });

     }

  ngOnInit() {
   
  }

  ionViewDidEnter(){
    this.start();
  }

  start(){
    this.tts.speak('Please spell your First Name, once done call next for spell password')
    .then(() => {console.log('Success'); this.takeFirstname();  })
    .catch((reason: any) => console.log(reason));
  }

  takeFirstname(){

    this.speechRecognition.startListening()
    .subscribe(

      (matches: Array<string>) => {
        console.log(matches);
        if(matches[0]=='back'){
        this.goBack();
        }
       if(matches[0]=='next'){
        this.tts.speak('Please spell last name')
        .then(() => { console.log('Success');  this.takeLastname(); })
        .catch((reason: any) => console.log(reason));
       
       }else{

        this.user.get('firstname').setValue( this.user.get('firstname').value+matches[0]);
        this.tts.speak('say next work')
        .then(() => {console.log('Success');  this.takeFirstname(); })
        .catch((reason: any) => console.log(reason));
       }
       
      },
      (onerror) => console.log('error:', onerror)
    ) 

  }
  takeLastname(){

    this.speechRecognition.startListening()
    .subscribe(

      (matches: Array<string>) => {
        console.log(matches);
        if(matches[0]=='back'){
        this.goBack();
        }
       if(matches[0]=='next'){
        this.tts.speak('Please spell username')
        .then(() => { console.log('Success');  this.takeusername(); })
        .catch((reason: any) => console.log(reason));
       
       }else{

        this.user.get('lastname').setValue( this.user.get('lastname').value+matches[0]);
        this.tts.speak('say next work')
        .then(() => {console.log('Success');  this.takeLastname(); })
        .catch((reason: any) => console.log(reason));
       }
       
      },
      (onerror) => console.log('error:', onerror)
    ) 

  }
  takeusername(){

    
    this.speechRecognition.startListening()
    .subscribe(

      (matches: Array<string>) => {
        console.log(matches);
        if(matches[0]=='back'){
        this.goBack();
        }
       if(matches[0]=='next'){
        this.tts.speak('Please spell password')
        .then(() => { console.log('Success');  this.takePasswordname(); })
        .catch((reason: any) => console.log(reason));
       
       }else{

        this.user.get('username').setValue( this.user.get('username').value+matches[0]);
        this.tts.speak('say next work')
        .then(() => {console.log('Success');  this.takeusername(); })
        .catch((reason: any) => console.log(reason));
       }
       
      },
      (onerror) => console.log('error:', onerror)
    ) 

  }
  takePasswordname(){

    this.speechRecognition.startListening()
    .subscribe(

      (matches: Array<string>) => {
        console.log(matches);
        if(matches[0]=='back'){
        this.goBack();
        }
       if(matches[0]=='next'){
        this.tts.speak('Please spell password again')
        .then(() => { console.log('Success');  this.takeConfirmPasswordname(); })
        .catch((reason: any) => console.log(reason));
       
       }else{

        this.user.get('password').setValue( this.user.get('password').value+matches[0]);
        this.tts.speak('say next work')
        .then(() => {console.log('Success');  this.takePasswordname(); })
        .catch((reason: any) => console.log(reason));
       }
       
      },
      (onerror) => console.log('error:', onerror)
    ) 

  }
  takeConfirmPasswordname(){

    this.speechRecognition.startListening()
    .subscribe(

      (matches: Array<string>) => {
        console.log(matches);
        if(matches[0]=='back'){
        this.goBack();
        }
       if(matches[0]=='done' || matches[0]=='next'){
        this.tts.speak('Thanks')
        .then(() => { console.log('Success'); this.signup(); })
        .catch((reason: any) => console.log(reason));
       
       }else{

        this.user.get('c_password').setValue( this.user.get('c_password').value+matches[0]);
        this.tts.speak('say next work')
        .then(() => {console.log('Success');  this.takePasswordname(); })
        .catch((reason: any) => console.log(reason));
       }
       
      },
      (onerror) => console.log('error:', onerror)
    ) 


  }

  signup(){


    this.authenticationService.signup(this.user.value).subscribe(
      res=>{ console.log(res) },
      error => { console.log(error) },
      ()=>{}
    );


  }

  goBack(){

    this.router.navigate(['user-account']);
    
  }

}
