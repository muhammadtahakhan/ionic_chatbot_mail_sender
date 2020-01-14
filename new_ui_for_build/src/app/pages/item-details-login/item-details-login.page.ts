import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { LoginService } from '../../services/login-service';
import { ToastService } from 'src/app/services/toast-service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { finalize, takeWhile } from 'rxjs/operators';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
    templateUrl: 'item-details-login.page.html',
    styleUrls: ['item-details-login.page.scss'],
    providers: [LoginService],
    changeDetection: ChangeDetectionStrategy.Default,

})
export class ItemDetailsLoginPage implements OnInit, OnDestroy  {

    data = {};
    type: string;
    loading = false;
    user = {password: '', username: ''};
    username = '';
    password = '';
    private alive = true;

    public isUsernameValid = true;
    public isPasswordValid = true;

    constructor(
        public http: HttpClient,
        public navCtrl: NavController,
        private service: LoginService,
        private toastCtrl: ToastService,
        public authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private faio: FingerprintAIO,
        private tts: TextToSpeech,
        private speechRecognition: SpeechRecognition,
        private ref: ChangeDetectorRef
        ) {

        this.type = this.route.snapshot.paramMap.get('type');
      
    }

    ngOnInit() {
        console.log('ngOnInit', this.authenticationService.isAuthenticated() )
        if ( this.authenticationService.isAuthenticated() ) {
          this.authenticationService.logout();
        }


        }

    ngOnDestroy() {
      console.log('[takeWhile] ngOnDestory');
      this.alive = false;
    }

    ionViewDidEnter() {
      console.log('ionViewDidEnter');
      this.start();
    }

    start() {
   // Request permissions
      // this.speechRecognition.requestPermission()
      //  .then(
      //    () => console.log('Granted'),
      //    () => console.log('Denied'));

      this.toastCtrl.presentToast('start...');
      this.tts.speak({text: 'Please spell your username, once done call next for spell password',
        locale: 'en-GB', rate: 0.80})
      .then(() => {this.toastCtrl.presentToast('start... takeUser'); this.takeUser();  })
      .catch((reason: any) => console.log(reason));
    }

    isType(item) {
        return item === parseInt(this.type, 10);
    }

    takeUser() {

        this.speechRecognition.startListening()
        .pipe(takeWhile(() => this.alive))
        .subscribe((matches: Array<string>) => {
            console.log(matches);
            if ( matches[0] === 'back') {
            this.goBack();
            }
            else if (matches[0].includes('reset') || matches[0].includes('remove')) {
              this.username = '';
              this.user.username = '';
              this.ref.detectChanges();
              this.tts.speak('username is null now, start again')
              .then(() => {console.log('Success');  this.takeUser(); })
              .catch((reason: any) => console.log(reason));
            }
            else if(matches[0].includes('reset') && ( matches[0].includes('hole') || matches[0].includes('whole') ) ){
              this.tts.speak('whole form is null now atart again, Please spell your username,')
              .then(() => {
                this.user.password = '';
                this.password = '';
                this.username = '';
                this.user.username = '';
                this.ref.detectChanges();
                this.takeUser()
               })
              .catch((reason: any) => console.log(reason));
            }
            else if(matches[0] === 'register' || matches[0] === 'signup' || matches[0] === 'sign up') {
              this.onRegister();
            }
            else if ( matches[0] === 'next') {
            this.tts.speak('Please spell your password')
            .then(() => { console.log('Success');  this.takePass(); })
            .catch((reason: any) => console.log(reason));

           } else {
           this.username = this.user.username = this.user.username + matches[0];
          
            // this.user.get('username').setValue( this.user.get('username').value+matches[0]);
            this.tts.speak('say next work')
            .then(() => {console.log('Success');  this.takeUser(); })
            .catch((reason: any) => console.log(reason));
           }
           this.ref.detectChanges();
          },
          (onerror) => console.log('error:', onerror)
        )
      }

      takePass(){

        this.speechRecognition.startListening()
        .pipe(takeWhile(() => this.alive))
        .subscribe(
          (matches: Array<string>) => {
            console.log(matches);
            if(matches[0]=='back'){
              this.goBack();
            }
            else if(matches[0].includes('reset') && ( matches[0].includes('hole') || matches[0].includes('whole') ) ){
              this.tts.speak('whole form is null now atart again, Please spell your username,')
              .then(() => { 
                this.user.password = '';
                this.password = '';
                this.username = '';
                this.user.username = '';
                this.ref.detectChanges();
                this.takeUser();
               })
              .catch((reason: any) => console.log(reason));
            }
           else if(matches[0].includes('reset') || matches[0].includes('remove')){
              this.user.password = '';
              this.password = '';
              this.ref.detectChanges();
              this.tts.speak('password is null now, start again')
              .then(() => {console.log('Success');  this.takePass(); })
              .catch((reason: any) => console.log(reason));
            }
            else if(matches[0]=='register' || matches[0]=='signup' || matches[0]=='sign up'){
              this.onRegister();
            }

            // tslint:disable-next-line: max-line-length
            else  if( matches[0] === 'next' || matches[0] === 'submit' || matches[0] === 'done' || matches[0] === 'thanks' || matches[0] === 'login') {
            this.onLogin(this.user);
          }else{
            this.password = this.user.password = (this.user.password+matches[0]).replace(/\s+/g, '');
            this.ref.detectChanges();
            // this.user.get('password').setValue((this.user.get('password').value+matches[0]).replace(/\s+/g, '') );
            this.tts.speak('say next work')
            .then(() => {console.log('Success');  this.takePass(); })
            .catch((reason: any) => console.log(reason));

          }
            this.ref.detectChanges();

          },
          (onerror) => console.log('error:', onerror)
        )
      }


    // events
    onLogin(params): void {
        this.user = params;
        console.log(params);
        // this.toastCtrl.presentToast('onLogin:' + JSON.stringify(params));
        this.faio.isAvailable()
        .then(isAvailable=>{
          this.tts.speak('please scan you finger')
          .then(() => {console.log('Success'); })
          .catch((reason: any) => console.log(reason));

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
      this.authenticationService.login(this.user)
      .pipe(
        finalize(() => this.loading = false),
      )
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        res => { console.log(res); },
        error => {  
          this.tts.speak('opps something went wrong, please fill form again ')
              .then(() => {
                this.username = '';
                this.user.username = '';
                this.user.password = '';
                this.password = '';
                this.ref.detectChanges();
                this.start(); })
              .catch((reason: any) => console.log(reason));  },
        () => {}
      );


      this.tts.speak('Thanks, You will be login soon')
        .then(() => {console.log('Success'); })
        .catch((reason: any) => console.log(reason));

    }
    onRegister(params = {}): void {
        this.toastCtrl.presentToast('onRegister:' + JSON.stringify(params));
        this.navCtrl.navigateForward('register');
    }
    onSkip(event): void {
        this.toastCtrl.presentToast('onSkip');
        this.navCtrl.navigateForward('register');
    }

    goBack() {
      this.navCtrl.navigateForward(['home']);
    }

     mkkgoRegiser() {
      this.navCtrl.navigateForward(['register']);
    }

}
