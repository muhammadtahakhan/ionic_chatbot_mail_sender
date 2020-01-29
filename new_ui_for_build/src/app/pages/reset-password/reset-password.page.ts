import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RegisterService } from 'src/app/services/register-service';
import { ToastService } from 'src/app/services/toast-service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { ActivatedRoute } from '@angular/router';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  item = {username: '', password: '', c_password: ''};
  isCPasswordValid = true;
  isPasswordValid = true;
  isUsernameValid = true;

  constructor( public navCtrl: NavController,
               private service: RegisterService,
               private toastCtrl: ToastService,
               public authenticationService: AuthenticationService,
               private speechRecognition: SpeechRecognition,
               private faio: FingerprintAIO,
               private tts: TextToSpeech,
               private ref: ChangeDetectorRef,
               private route: ActivatedRoute) { }

  ngOnInit() {
  }

  reset() {

    this.item.username = '';
    this.item.password = '';
    this.item.c_password = '';

  }

  ionViewDidEnter() {
    this.start();
  }

  start() {
    this.reset();
    this.ref.detectChanges();
    this.tts.speak('Please spell your username, once done call next for next field')
    .then(() => {console.log('Success'); this.takeusername();  })
    .catch((reason: any) => console.log(reason));
  }

  takeusername(){

    this.speechRecognition.startListening()
    .subscribe(

      (matches: Array<string>) => {
        console.log(matches);
        if(matches[0]=='back'){
        this.goBack();
        }
        else if(matches[0].includes('reset') && ( matches[0].includes('hole') || matches[0].includes('whole') ) ){
          this.tts.speak('whole form is null now atart again, Please spell your username')
          .then(() => { this.reset();this.ref.detectChanges(); this.takeusername(); })
          .catch((reason: any) => console.log(reason));
        }
        else if(matches[0].includes('reset') || matches[0].includes('remove')){
          this.item.username = '';
          this.tts.speak('username is null now, start again')
          .then(() => {console.log('Success');  this.takeusername(); })
          .catch((reason: any) => console.log(reason));
        }
        else  if(matches[0]=='next'){
        this.tts.speak('Please spell Password')
        .then(() => { console.log('Success');  this.takePassword(); })
        .catch((reason: any) => console.log(reason));

       }else{
        this.item.username = this.item.username?this.item.username+matches[0]:''+matches[0]
        this.item.username = this.item.username.replace(/ +/g, "");
        this.item = Object.assign({}, this.item);
        this.tts.speak('say next work')
        .then(() => {console.log('Success');  this.takeusername(); })
        .catch((reason: any) => console.log(reason));
       }
       this.ref.detectChanges();
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
        else if(matches[0].includes('reset') && ( matches[0].includes('hole') || matches[0].includes('whole') ) ){
          this.tts.speak('whole form is null now atart again, start again, Please spell your username')
          .then(() => { this.reset(); this.ref.detectChanges(); this.takeusername(); })
          .catch((reason: any) => console.log(reason));
        }
        else if(matches[0].includes('reset') || matches[0].includes('remove')){
          this.item.password = '';
          this.ref.detectChanges();
          this.tts.speak('password is null now, start again')
          .then(() => {console.log('Success');  this.takePassword(); })
          .catch((reason: any) => console.log(reason));
        }
        else if(matches[0]=='next'){

        this.tts.speak('Please spell password again')
        .then(() => { console.log('Success');  this.takeConfirmPasswordname(); })
        .catch((reason: any) => console.log(reason));

       } else {
        this.item.password = this.item.password?this.item.password+matches[0]:''+matches[0]
        this.item = Object.assign({}, this.item);
        this.tts.speak('say next work')
        .then(() => {console.log('Success');  this.takePassword(); })
        .catch((reason: any) => console.log(reason));
       }
       this.ref.detectChanges();
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
        else if(matches[0].includes('reset') && ( matches[0].includes('hole') || matches[0].includes('whole') ) ){
          this.tts.speak('whole form is null now atart again, start again, Please spell your username')
          .then(() => { this.reset(); this.ref.detectChanges(); this.takeusername(); })
          .catch((reason: any) => console.log(reason));
        }
        else if(matches[0].includes('reset') || matches[0].includes('remove')){
          this.item.c_password = '';
          this.ref.detectChanges();
          this.tts.speak('confirm password is null now, start again')
          .then(() => {console.log('Success');  this.takeConfirmPasswordname(); })
          .catch((reason: any) => console.log(reason));
        }
        else if(matches[0] === 'submit' || matches[0] === 'done' || matches[0]=='thanks' || matches[0]=='next' || matches[0]=='sign up' || matches[0]=='signup'){
          this.validate();

       }else{
        this.item.c_password = this.item.c_password?this.item.c_password+matches[0]:''+matches[0]
        this.item = Object.assign({}, this.item);
        this.tts.speak('say next work')
        .then(() => {console.log('Success');  this.takeConfirmPasswordname(); })
        .catch((reason: any) => console.log(reason));
       }
       this.ref.detectChanges();
      },
      (onerror) => {console.log('error:', onerror);  }
    ) 


  }

  validate(){
    if(this.item.password != this.item.c_password){
      this.tts.speak('password dose not  match, plz fill again')
      .then(() => {
        this.item.password = '';
        this.item.c_password = '';
        this.ref.detectChanges();
        this.takePassword();

       })
      .catch((reason: any) => console.log(reason));
    }else{
      this.submit();
    }
  }

  submit() {

    this.authenticationService.reset_password(this.item).subscribe(
      res=>{
        this.tts.speak('reset password successfully, login now')
        .then(() => { console.log('Success');   this.navCtrl.navigateForward(['login']); })
        .catch((reason: any) => console.log(reason));

      },
      error=>{
        console.log(error);
        this.tts.speak(error.message+"please fill form again")
        .then(() => { this.start(); })
        .catch((reason: any) => console.log(reason));

      },
      ()=>{}
    )
  }

  goBack() {
    this.navCtrl.navigateForward(['login']);
  }

}
