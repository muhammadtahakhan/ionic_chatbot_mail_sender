import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { AuthenticationService } from '../services/authentication.service';
import { finalize } from 'rxjs/operators';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading = false;

  user: FormGroup;

  currentInput = 'user name';


  constructor(private http: HTTP, public authenticationService:AuthenticationService,  private router: Router,  private speechRecognition: SpeechRecognition, 
    private faio: FingerprintAIO,
    private tts: TextToSpeech) { 

     this.user = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
     });


    }

  ngOnInit() {
    console.log('ngOnInit', this.authenticationService.isAuthenticated())
    if( this.authenticationService.isAuthenticated() ){
      this.authenticationService.logout();
    }
   
    
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
     
    if(matches[0]=='submit' || matches[0]=='done' || matches[0]=='thanks' || matches[0]=='login'){
      this.login();
    }else{
      this.user.get('password').setValue((this.user.get('password').value+matches[0]).replace(/\s+/g, '') );
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
    .then((result: any) => {console.log(result); this.sayfinalWord(); })
    .catch((error: any) => console.log(error));



    }).catch((error: any) =>{this.sayfinalWord(); console.log('finger', error)} );
    
  }

  sayfinalWord(){
  this.loading = true;
 
  this.authenticationService.login(this.user.value)
  .pipe(
    finalize(() => this.loading = false),
  )
  .subscribe(
    res=>{ console.log(res) },
    error => { console.log(error);  },
    ()=>{}
  );


    this.tts.speak('Thanks, You will be login soon')
    .then(() => {console.log('Success'); })
    .catch((reason: any) => console.log(reason));


  }


  swipeEvent(event){
    alert(event.direction);
   console.log(event.direction);
 }

}
