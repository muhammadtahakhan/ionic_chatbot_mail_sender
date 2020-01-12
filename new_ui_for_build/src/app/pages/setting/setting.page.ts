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
        } else if(matches[0].includes("name")) {
          this.item.name = '';
          this.tts.speak({text:'say new name',  rate: 0.80})
          .then(() => {  this.set_name(); })
          .catch((reason: any) => console.log(reason));
         
        }else if(matches[0].includes("password")) {
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
          this.save();
        }
        else{
          this.item.email =  this.item.email + matches[0];
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
        } else if(matches[0].includes("email")) {
          this.item.email = '';
          this.tts.speak({text:'say new email',  rate: 0.80})
          .then(() => { this.set_email(); })
          .catch((reason: any) => console.log(reason));
          
        }else if(matches[0].includes("password")) {
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
          this.save();
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
        } else if(matches[0].includes("email")) {
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
          this.save();
        }
        else{
          this.item.app_password =  this.item.app_password + matches[0];
          this.tts.speak({text:'say next word',  rate: 0.80})
          .then(() => { this.set_app_password(); })
          .catch((reason: any) => console.log(reason));
        }
        this.ref.detectChanges();
      },
      error => {},
      () => {}
    );


  }


  save() {
    this.tts.speak({text:'please wait,  update in process',  rate: 0.80})
    .then(() => {
      this.save_date();
     
      })
    .catch((reason: any) => {console.log(reason);  this.save_date();});


  }

  save_date(){
    this.authenticationService.save_user_data(this.item).subscribe(
      res => {
        this.toastCtrl.presentToast('fields updated successfully');
        this.tts.speak({text:'fields updated successfully', rate: 0.80}).then(() => { this.goBack() }).catch((reason: any) => {console.log(reason); this.goBack();}) },
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
