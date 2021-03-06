import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { AuthenticationService } from '../services/authentication.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  loading = false;
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
    this.user.reset();
    this.tts.speak('Please spell your First Name, once done call next for next field')
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
        else if(matches[0]=='reset'){
          this.start()
        }
       else if(matches[0]=='next'){
        this.tts.speak('Please spell email address')
        .then(() => { console.log('Success');  this.takeuseremail(); })
        .catch((reason: any) => console.log(reason));
       
       }else{

        this.user.get('name').setValue( this.user.get('name').value?this.user.get('name').value+matches[0]:''+matches[0] );
        this.tts.speak('say next work')
        .then(() => {console.log('Success');  this.takeFirstname(); })
        .catch((reason: any) => console.log(reason));
       }
       
      },
      (onerror) => {console.log('error:', onerror);  }
    )

  }

  takeuseremail(){

    
    this.speechRecognition.startListening()
    .subscribe(

      (matches: Array<string>) => {
        console.log(matches);
        if(matches[0]=='back'){
        this.goBack();
        }
        else if(matches[0]=='reset'){
          this.start()
        }
        else if(matches[0]=='next'){
        this.tts.speak('Please spell username')
        .then(() => { console.log('Success');  this.takeusername(); })
        .catch((reason: any) => console.log(reason));
       
       }else{

        this.user.get('email').setValue( (this.user.get('email').value?this.user.get('email').value+matches[0]:''+matches[0] ).replace(/\s+/g, '') );
        this.tts.speak('say next work')
        .then(() => {console.log('Success');  this.takeuseremail(); })
        .catch((reason: any) => console.log(reason));
       }
       
      },
      (onerror) => {console.log('error:', onerror);  }
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
        else if(matches[0]=='reset'){
          this.start()
        }
        else  if(matches[0]=='next'){
        this.tts.speak('Please spell password')
        .then(() => { console.log('Success');  this.takePassword(); })
        .catch((reason: any) => console.log(reason));
       
       }else{

        this.user.get('username').setValue( (this.user.get('username').value?this.user.get('username').value+matches[0]:''+matches[0] ).replace(/\s+/g, '')  );
        this.tts.speak('say next work')
        .then(() => {console.log('Success');  this.takeusername(); })
        .catch((reason: any) => console.log(reason));
       }
       
      },
      (onerror) => {console.log('error:', onerror);  }
    ) 

  }

  takePassword(){

    this.speechRecognition.startListening()
    .subscribe(

      (matches: Array<string>) => {
        console.log(matches);
        if(matches[0]=='back'){
        this.goBack();
        }
        else if(matches[0]=='reset'){
          this.start()
        }
        else if(matches[0]=='next'){
        this.tts.speak('Please spell password again')
        .then(() => { console.log('Success');  this.takeConfirmPasswordname(); })
        .catch((reason: any) => console.log(reason));
       
       }else{

        this.user.get('password').setValue( this.user.get('password').value?this.user.get('password').value+matches[0]:''+matches[0]);
        this.tts.speak('say next work')
        .then(() => {console.log('Success');  this.takePassword(); })
        .catch((reason: any) => console.log(reason));
       }
       
      },
      (onerror) => {console.log('error:', onerror);  }
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
        else if(matches[0]=='reset'){
          this.start()
        }
        else if(matches[0]=='submit' || matches[0]=='done' || matches[0]=='thanks' || matches[0]=='next' || matches[0]=='sign up' || matches[0]=='signup'){
        this.tts.speak('Thanks, signup is processing')
        .then(() => { console.log('Success'); this.signup(); })
        .catch((reason: any) => console.log(reason));
       
       }else{

        this.user.get('c_password').setValue( this.user.get('c_password').value?this.user.get('c_password').value+matches[0]:''+matches[0]);
        this.tts.speak('say next work')
        .then(() => {console.log('Success');  this.takeConfirmPasswordname(); })
        .catch((reason: any) => console.log(reason));
       }
       
      },
      (onerror) => {console.log('error:', onerror);  }
    ) 


  }

  signup(){


    this.faio.isAvailable()
    .then(isAvailable=>{


      this.faio.show({
        clientId: 'Fingerprint-Demo',
        clientSecret: 'password', //Only necessary for Android
        // disableBackup:true,  //Only for Android(optional)
        // localizedFallbackTitle: 'Use Pin', //Only for iOS
        // localizedReason: 'Please authenticate' //Only for iOS
    })
    .then((result: any) => { console.log(result); this.finishSignup(); })
    .catch((error: any) => console.log(error));



    }).catch((error: any) =>{ this.finishSignup(); console.log(error)} );

  }

  finishSignup(){
    this.loading = true;
    this.authenticationService.signup(this.user.value).pipe(
      finalize(() => this.loading = false),
    ).subscribe(
      res => {

        this.tts.speak('Signup successfull, plz login')
        .then(() => { console.log('Success');   this.router.navigate(['login']); })
        .catch((reason: any) => console.log(reason));

        },
      error => {
        console.log(error);
        this.tts.speak(error.error.message)
        .then(() => { this.start(); })
        .catch((reason: any) => console.log(reason));

      },
      () => { }
    );

  }

  goBack(){

    this.router.navigate(['user-account']);
    
  }

}
