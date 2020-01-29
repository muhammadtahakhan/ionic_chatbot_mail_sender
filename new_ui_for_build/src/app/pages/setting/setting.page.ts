import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastService } from 'src/app/services/toast-service';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { NavController } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit, OnDestroy {
  alive = true;

  item = {
    'name': '',
    'email': '',
    'password':'',
    'c_password':'',
    'app_password': ''
   };


  constructor(
      public navCtrl: NavController,
      public authenticationService: AuthenticationService,
      private tts: TextToSpeech,
      private speechRecognition: SpeechRecognition,
      private ref: ChangeDetectorRef,
      private toastCtrl: ToastService
      ) {

  }

  ngOnInit() {
    this.get_user_date();
  }

  ngOnDestroy() {
    console.log('[takeWhile] ngOnDestory');
    this.alive = false;
  }
  get_user_date() {
    this.toastCtrl.presentToast('please wait');

    this.authenticationService.get_user_data().subscribe(
      (res: any) => {
        this.item = res.data;
        this.start();
        },
      error => {},
      () => {}
    );

  }

  start() {

    this.tts.speak('what field you want to update?, if you want to set emial say email, for email application password say password')
            .then(() => {
              this.speechRecognition.startListening()
              .pipe(takeWhile(() => this.alive))
              .subscribe(
                (matches: Array<string>) => {
                  console.log(matches);
                  if(matches[0]=='back'){
                    this.goBack();
                  }
                  else if(matches[0].includes('reset') && ( matches[0].includes('hole') || matches[0].includes('whole'))){
                    this.item.email = '';
                    this.item.name = '';
                    this.item.app_password = '';
                    this.ref.detectChanges();
                    this.tts.speak({text:'all form is reset now ',  rate: 0.80})
                    .then(() => { this.start(); })
                    .catch((reason: any) => console.log(reason));
                  }
                  else if(matches[0].includes('save')){
                    this.validate();
                  }
                  else if(matches[0].includes("email")) {
                    this.item.email = '';
                    this.tts.speak({text:'say new Email', rate: 0.80})
                    .then(() => {   this.set_email(); })
                    .catch((reason: any) => console.log(reason));

                  }else if(matches[0].includes("name")) {
                    this.item.name = '';
                    this.tts.speak({text:'say new name',  rate: 0.80})
                    .then(() => {  this.set_name(); })
                    .catch((reason: any) => console.log(reason));

                  }else if(matches[0].includes("password")) {
                    this.item.password = '';
                    this.item.c_password = '';
                    this.tts.speak({text:'say new password',  rate: 0.80})
                    .then(() => {  this.takePassword(); })
                    .catch((reason: any) => console.log(reason));

                  }else if(matches[0].includes("password") && matches[0].includes("app")) {
                    this.item.app_password = '';
                    this.tts.speak({text:'say new applcation password',  rate: 0.80})
                    .then(() => {   this.set_app_password(); })
                    .catch((reason: any) => console.log(reason));

                  }else{

                  this.tts.speak({text:'unable to understand, please say again',  rate: 0.80})
                  .then(() => { this.start(); })
                  .catch((reason: any) => console.log(reason));

                }
                  this.ref.detectChanges();

                },
                (onerror) => console.log('error:', onerror)
              )
             })
            .catch((reason: any) => console.log(reason));

  }

  set_email() {
    this.speechRecognition.startListening()
    .pipe(takeWhile(() => this.alive))
    .subscribe(
      (matches: Array<string>) => {
        if(matches[0] == 'back') {
          this.goBack();
        } 
        else if(matches[0].includes('reset') && ( matches[0].includes('hole') || matches[0].includes('whole'))){
          this.item.email = '';
          this.item.name = '';
          this.item.app_password = '';
          this.ref.detectChanges();
          this.tts.speak({text:'all form is reset now ',  rate: 0.80})
          .then(() => { this.start(); })
          .catch((reason: any) => console.log(reason));
        }
        else if(matches[0].includes("name")) {
          this.item.name = '';
          this.tts.speak({text:'say new name',  rate: 0.80})
          .then(() => {  this.set_name(); })
          .catch((reason: any) => console.log(reason));
         
        }else if(matches[0].includes("password")) {
          this.item.password = '';
          this.item.c_password = '';
          this.tts.speak({text:'say new password',  rate: 0.80})
          .then(() => {  this.takePassword(); })
          .catch((reason: any) => console.log(reason));

        }else if(matches[0].includes("password") && matches[0].includes("app")) {
          this.item.app_password = '';
          this.tts.speak({text:'say new password',  rate: 0.80})
          .then(() => { this.set_app_password(); })
          .catch((reason: any) => console.log(reason));

         
        }else if(matches[0].includes("reset")){
          this.item.email = '';
          this.tts.speak({text:'email field is null now start again',  rate: 0.80})
          .then(() => { this.set_email(); })
          .catch((reason: any) => console.log(reason));

        }else if(matches[0].includes("done") || matches[0].includes("save") || matches[0].includes("update")){
          this.validate();
        }
        else{
          this.item.email =  this.item.email + matches[0];
          this.item.email =  this.item.email.replace(/ +/g, "");
          this.tts.speak({text:'say next word',  rate: 0.80})
          .then(() => { this.set_email(); })
          .catch((reason: any) => console.log(reason));
        }
        this.ref.detectChanges();
      },
      error => {},
      () => {}
    );

  }

  set_name() {

    this.speechRecognition.startListening()
    .pipe(takeWhile(() => this.alive))
    .subscribe(
      (matches: Array<string>) => {
        if(matches[0] == 'back') {
          this.goBack();
        }
        else if(matches[0].includes('reset') && ( matches[0].includes('hole') || matches[0].includes('whole'))){
          this.item.email = '';
          this.item.name = '';
          this.item.app_password = '';
          this.ref.detectChanges();
          this.tts.speak({text:'all form is reset now ',  rate: 0.80})
          .then(() => { this.start(); })
          .catch((reason: any) => console.log(reason));
        }
        
        else if(matches[0].includes("email")) {
          this.item.email = '';
          this.tts.speak({text:'say new email',  rate: 0.80})
          .then(() => { this.set_email(); })
          .catch((reason: any) => console.log(reason));
          
        }else if(matches[0].includes("password")) {
          this.item.password = '';
          this.item.c_password = '';
          this.tts.speak({text:'say new password',  rate: 0.80})
          .then(() => {  this.takePassword(); })
          .catch((reason: any) => console.log(reason));

        }else if(matches[0].includes("password") && matches[0].includes("app")) {
          this.item.app_password = '';
          this.tts.speak({text:'say new password',  rate: 0.80})
          .then(() => {  this.set_app_password(); })
          .catch((reason: any) => console.log(reason));
         
        }else if(matches[0].includes("reset")){
          this.item.name = '';
          this.tts.speak({text:'name field is null now, start again',  rate: 0.80})
          .then(() => { this.set_name(); })
          .catch((reason: any) => console.log(reason));

        }
        else if(matches[0].includes("done") || matches[0].includes("save") || matches[0].includes("update")){
          this.validate();
        }
        else{
          this.item.name =  this.item.name + matches[0];
          this.tts.speak({text:'say next word',  rate: 0.80})
          .then(() => { this.set_name(); })
          .catch((reason: any) => console.log(reason));
        }
        this.ref.detectChanges();
      },
      error => {},
      () => {}
    );


  }

  set_app_password() {

    this.speechRecognition.startListening()
    .pipe(takeWhile(() => this.alive))
    .subscribe(
      (matches: Array<string>) => {
        if(matches[0] == 'back') {
          this.goBack();
        }
        else if(matches[0].includes("reset") && matches[0].includes("whole")){
          this.item.email = '';
          this.item.name = '';
          this.item.app_password = '';
          this.ref.detectChanges();
          this.tts.speak({text:'all form is reset now ',  rate: 0.80})
          .then(() => { this.start(); })
          .catch((reason: any) => console.log(reason));
        }
        else if(matches[0].includes("email")) {
          this.item.email = '';
          this.tts.speak({text:'say new email',  rate: 0.80})
          .then(() => {   this.set_email(); })
          .catch((reason: any) => console.log(reason));

        }else if(matches[0].includes("name")) {
          this.item.name = '';
          this.tts.speak({text: 'say new email',  rate: 0.80})
          .then(() => {   this.set_name(); })
          .catch((reason: any) => console.log(reason));


        }else if(matches[0].includes("reset")){
          this.item.app_password = '';
          this.tts.speak({text:'app_password field is null now start again',  rate: 0.80})
          .then(() => { this.set_app_password(); })
          .catch((reason: any) => console.log(reason));

        }
        else if(matches[0].includes("done") || matches[0].includes("save") || matches[0].includes("update")){
          this.validate();
        }
        else{
          this.item.app_password =  this.item.app_password + matches[0];
          this.item.app_password =  this.item.app_password.replace(/ +/g, "");
          this.tts.speak({text:'say next word',  rate: 0.80})
          .then(() => { this.ref.detectChanges(); this.set_app_password(); })
          .catch((reason: any) => console.log(reason));
        }
        this.ref.detectChanges();
      },
      error => {},
      () => {}
    );


  }

  validate() {
      if(this.validateEmail( this.item.email)){
          if(this.item.password != this.item.c_password){
              this.item.password = '';
              this.item.c_password = '';
              this.ref.detectChanges();
              this.tts.speak({text:'password dose not match, fill again',  rate: 0.80})
              .then(() => { this.set_email(); })
              .catch((reason: any) => console.log(reason));
          }else{
              this.save();
          }
          
      }
      else {

          this.item.email = '';
          this.ref.detectChanges();
          this.tts.speak({text:'invalid email field, fill again',  rate: 0.80})
          .then(() => { this.set_email(); })
          .catch((reason: any) => console.log(reason));
      }

  }

   validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }


  save() {
    this.tts.speak({text:'please wait,  update in process',  rate: 0.80})
    .then(() => {
      this.save_date();

      })
    .catch((reason: any) => {console.log(reason);  this.save_date();});


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
          this.item.email = '';
          this.item.name = '';
          this.item.app_password = '';
          this.ref.detectChanges();
          this.tts.speak({text:'all form is reset now ',  rate: 0.80})
          .then(() => { this.start(); })
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
          this.item.email = '';
          this.item.name = '';
          this.item.app_password = '';
          this.ref.detectChanges();
          this.tts.speak({text:'all form is reset now ',  rate: 0.80})
          .then(() => { this.start(); })
          .catch((reason: any) => console.log(reason));
        }
        else if(matches[0].includes('reset') || matches[0].includes('remove')){
          this.item.c_password = '';
          this.ref.detectChanges();
          this.tts.speak('confirm password is null now, start again')
          .then(() => {console.log('Success');  this.takeConfirmPasswordname(); })
          .catch((reason: any) => console.log(reason));
        }
        else if(matches[0] === 'submit' || matches[0] === 'done' || matches[0]=='thanks' || matches[0]=='next' || matches[0]=='update' ){
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





  save_date(){
    this.authenticationService.save_user_data(this.item).subscribe(
      res => {
        this.toastCtrl.presentToast('fields updated successfully');
        this.tts.speak({text:'Fields updated successfully', rate: 0.80}).then(() => { this.goBack() }).catch((reason: any) => {console.log(reason); this.goBack();}) },
      (error) => { 
        this.toastCtrl.presentToast('some thing went worng, please try again');
        this.tts.speak({text: 'some thing went worng, please try again',  rate: 0.80}).then(() => {  }).catch((reason: any) => {}); },
      () => {}
      );
  }

  goBack() {
    this.navCtrl.navigateForward(['home']);
  }

}
