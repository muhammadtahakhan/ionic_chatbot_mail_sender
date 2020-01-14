import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login-service';
import { ToastService } from 'src/app/services/toast-service';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from 'src/app/services/register-service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  loading = false;

  data = {button: 'Register',
  city: 'City',
  cityPlaceholder: 'Your City',
  country: 'Country',
  countryPlaceholder: 'Your Country',
  email: 'Email',
  emailPlaceholder: 'Your Email',
  logo: 'assets/imgs/logo/login.png',
  password: 'Password',
  passwordPlaceholder: 'Your Password',
  register: 'Register',
  skip: 'Skip',
  toolbarTitle: 'Register + logo 1',
  username: 'Username',
  usernamePlaceholder: 'Your Username'};
    type: string;

 form = {name: '', username: '',  email: '', password: '', c_password: '' }

    constructor(
        public navCtrl: NavController,
        private service: RegisterService,
        private toastCtrl: ToastService,
        public authenticationService: AuthenticationService,
        private speechRecognition: SpeechRecognition,
        private faio: FingerprintAIO,
        private tts: TextToSpeech,
        private ref: ChangeDetectorRef,
        private route: ActivatedRoute) {
        this.type = this.route.snapshot.paramMap.get('type');

    }
    ngOnInit() {
    }


    isType(item) {
        return item === parseInt(this.type, 10);
    }

    // events
    onRegister(params): void {
      this.tts.speak('Registration is in process please wait.')
      .then(() => {console.log('Success'); this.takeFirstname();  })
      .catch((reason: any) => console.log(reason));
      console.log(params);
      this.authenticationService.signup(params).subscribe(
            res => { 
              this.tts.speak('Registration completed successfully.')
                .then(() => {this.navCtrl.navigateForward('login');  })
                .catch((reason: any) => console.log(reason));
             },
            error => {
              this.tts.speak('some thing went wrong, please fill form again, thanks')
                .then(() => {this.start();  })
                .catch((reason: any) => console.log(reason));
            },
            () => { }
        );

    }


    onSkip(event): void {
        this.toastCtrl.presentToast('Navigated to login');
        this.navCtrl.navigateForward('login');
    }


  ionViewDidEnter() {
    this.start();
  }

  reset() {
    this.form.name = '';
    this.form.email = '';
    this.form.username = '';
    this.form.password = '';
    this.form.c_password = '';
    
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
          this.form.username = '';
          this.tts.speak('username is null now, start again')
          .then(() => {console.log('Success');  this.takeusername(); })
          .catch((reason: any) => console.log(reason));
        }
        else  if(matches[0]=='next'){
        this.tts.speak('Please spell Email address')
        .then(() => { console.log('Success');  this.takeuseremail(); })
        .catch((reason: any) => console.log(reason));

       }else{
        this.form.username = this.form.username?this.form.username+matches[0]:''+matches[0]
        this.form.username = this.form.username.replace(/ +/g, "");
        this.form = Object.assign({}, this.form);
        // this.user.get('username').setValue( (this.user.get('username').value?this.user.get('username').value+matches[0]:''+matches[0] ).replace(/\s+/g, '')  );
        this.tts.speak('say next work')
        .then(() => {console.log('Success');  this.takeusername(); })
        .catch((reason: any) => console.log(reason));
       }
       this.ref.detectChanges();
      },
      (onerror) => {console.log('error:', onerror);  }
    )

  }

  takeuseremail() {

    this.speechRecognition.startListening()
    .subscribe(

      (matches: Array<string>) => {
        console.log(matches);
        if(matches[0]=='back'){
        this.goBack();
        }
        else if(matches[0].includes('reset') && ( matches[0].includes('hole') || matches[0].includes('whole') ) ){
          this.tts.speak('whole form is null now atart again, start again, sepll username')
          .then(() => { this.reset();this.ref.detectChanges(); this.takeusername(); })
          .catch((reason: any) => console.log(reason));
        }
        else if(matches[0].includes('reset') || matches[0].includes('remove')){
          this.form.email = '';
          this.ref.detectChanges();
          this.tts.speak('email is null now, start again')
          .then(() => {console.log('Success');  this.takeuseremail(); })
          .catch((reason: any) => console.log(reason));
        }
        else if(matches[0]=='next'){
          if(!this.validateEmail(this.form.email)){
            this.tts.speak('invalid email address please, speal again again')
            .then(() => { this.form.email = ''; this.ref.detectChanges();  this.takeuseremail(); })
            .catch((reason: any) => console.log(reason));

        }

        this.tts.speak('Please spell password')
        .then(() => { console.log('Success');  this.takePassword(); })
        .catch((reason: any) => console.log(reason));
       
       }else{
        this.form.email = this.form.email?this.form.email+matches[0]:''+matches[0];
        this.form.email = this.form.email.replace(/ +/g, "");
        this.form = Object.assign({}, this.form);
        this.ref.detectChanges();
        // this.user.get('email').setValue( (this.user.get('email').value?this.user.get('email').value+matches[0]:''+matches[0] ).replace(/\s+/g, '') );
        this.tts.speak('say next work')
        .then(() => {console.log('Success');  this.takeuseremail(); })
        .catch((reason: any) => console.log(reason));
       }
       this.ref.detectChanges();
      },
      (onerror) => {console.log('error:', onerror);  }
    ) 

  }

  takeFirstname(){

    this.speechRecognition.startListening()
    .subscribe(

      (matches: Array<string>) => {
        console.log(matches);
        if(matches[0]=='back'){
        this.goBack();
        }
        else if(matches[0].includes('reset') && ( matches[0].includes('hole') || matches[0].includes('whole') ) ){
          this.tts.speak('whole form is null now atart again, start again, , Please spell your username')
          .then(() => { this.reset(); this.ref.detectChanges(); this.takeusername(); })
          .catch((reason: any) => console.log(reason));
        }
        else if(matches[0].includes('reset') || matches[0].includes('remove')){
          this.form.name = '';
          this.ref.detectChanges();
          this.tts.speak('First name is null now, start again')
          .then(() => {console.log('Success');  this.takeFirstname(); })
          .catch((reason: any) => console.log(reason));
        }
       else if(matches[0]=='next'){
        this.tts.speak('Please spell username')
        .then(() => { console.log('Success');  this.takeusername(); })
        .catch((reason: any) => console.log(reason));

       } else {
        this.form.name = this.form.name ? this.form.name + matches[0] : '' + matches[0];
        this.form = Object.assign({}, this.form);
        // this.user.get('name').setValue( this.user.get('name').value?this.user.get('name').value+matches[0]:''+matches[0] );
        this.tts.speak('say next work')
        .then(() => {console.log('Success');  this.takeFirstname(); })
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
          this.form.password = '';
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
        this.form.password = this.form.password?this.form.password+matches[0]:''+matches[0]
        this.form = Object.assign({}, this.form);
        // this.user.get('password').setValue( this.user.get('password').value?this.user.get('password').value+matches[0]:''+matches[0]);
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
          this.form.c_password = '';
          this.ref.detectChanges();
          this.tts.speak('confirm password is null now, start again')
          .then(() => {console.log('Success');  this.takeConfirmPasswordname(); })
          .catch((reason: any) => console.log(reason));
        }
        else if(matches[0] === 'submit' || matches[0] === 'done' || matches[0]=='thanks' || matches[0]=='next' || matches[0]=='sign up' || matches[0]=='signup'){
        this.tts.speak('Thanks, signup is processing')
        .then(() => { console.log('Success'); this.signup(); })
        .catch((reason: any) => console.log(reason));
       
       }else{
        this.form.c_password = this.form.c_password?this.form.c_password+matches[0]:''+matches[0]
        this.form = Object.assign({}, this.form);
        // this.user.get('c_password').setValue( this.user.get('c_password').value?this.user.get('c_password').value+matches[0]:''+matches[0]);
        this.tts.speak('say next work')
        .then(() => {console.log('Success');  this.takeConfirmPasswordname(); })
        .catch((reason: any) => console.log(reason));
       }
       this.ref.detectChanges();
      },
      (onerror) => {console.log('error:', onerror);  }
    ) 


  }

  signup(){


    this.faio.isAvailable()
    .then(isAvailable => {

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
    .then((result: any) => { console.log(result); this.finishSignup(); })
    .catch((error: any) => console.log(error));



    }).catch((error: any) =>{ this.finishSignup(); console.log(error)} );

  }

  finishSignup(){
    this.loading = true;
    this.authenticationService.signup(this.form).pipe(
      finalize(() => this.loading = false),
    ).subscribe(
      res => {

        this.tts.speak('Signup successfull, plz login')
        .then(() => { console.log('Success');   this.navCtrl.navigateForward(['login']); })
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

   validateEmail(email){
          var re = /\S+@\S+\.\S+/;
          return re.test(email);
      }

  goBack() {
    this.navCtrl.navigateForward(['login']);
  }


}
