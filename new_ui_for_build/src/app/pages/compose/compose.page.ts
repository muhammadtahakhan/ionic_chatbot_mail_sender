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
  selector: 'app-compose',
  templateUrl: './compose.page.html',
  styleUrls: ['./compose.page.scss'],
})
export class ComposePage implements OnInit {

  to = 'to@mail.com';
  cc = 'cc@mail.com';
  subject = 'test mail';
  message = 'Hello dear, ';

  constructor(
    public navCtrl: NavController,
    private service: RegisterService,
    private toastCtrl: ToastService,
    public authenticationService: AuthenticationService,
    private speechRecognition: SpeechRecognition,
    private faio: FingerprintAIO,
    private ref: ChangeDetectorRef,
    private tts: TextToSpeech,
    private route: ActivatedRoute) {


}
  ngOnInit() {
  }

  ionViewDidEnter() {
    this.start();
  }

  reset() {
   this.to = '';
   this.cc = '';
   this.subject = '';
   this.message = '';
  }

  start(){
    this.reset();
    this.tts.speak('Please spell to email, once done call next for next field')
    .then(() => {console.log('Success'); this.taketoemail();  })
    .catch((reason: any) => console.log(reason));
  }

taketoemail() {

  this.speechRecognition.startListening()
  .subscribe(

    (matches: Array<string>) => {
      console.log(matches);
      if(matches[0] === 'back'){
      this.goBack();
      }
      else if(matches[0] === 'reset'){
        this.start()
      }
     else if(matches[0] === 'next'){
      this.tts.speak('Please spell carbon copy email address')
      .then(() => { console.log('Success');  this.takeccemail(); })
      .catch((reason: any) => console.log(reason));

     }  else {
      this.to = this.to ? this.to + matches[0] : '' + matches[0];
      this.to = this.to.replace(/ +/g, "");
      this.tts.speak('say next work')
      .then(() => {console.log('Success');  this.taketoemail(); })
      .catch((reason: any) => console.log(reason));
     }
      this.ref.detectChanges();
    },
    (onerror) => {console.log('error:', onerror);  }
  )

}

takeccemail() {

  this.speechRecognition.startListening()
  .subscribe(

    (matches: Array<string>) => {
      console.log(matches);
      if(matches[0] === 'back'){
      this.goBack();
      }
      else if(matches[0] === 'reset'){
        this.start()
      }
     else if(matches[0] === 'next'){
      this.tts.speak('Please spell subject')
      .then(() => { console.log('Success');  this.takesubject(); })
      .catch((reason: any) => console.log(reason));

     }  else {
      this.cc = this.cc ? this.cc + matches[0] : '' + matches[0];
      this.tts.speak('say next work')
      .then(() => {console.log('Success');  this.takeccemail(); })
      .catch((reason: any) => console.log(reason));
     }
      this.ref.detectChanges();
    },
    (onerror) => {console.log('error:', onerror);  }
  )

}

takesubject() {
  this.speechRecognition.startListening()
  .subscribe(

    (matches: Array<string>) => {
      console.log(matches);
      if(matches[0] === 'back'){
      this.goBack();
      }
      else if(matches[0] === 'reset'){
        this.start()
      }
     else if(matches[0] === 'next'){
      this.tts.speak('Please spell message')
      .then(() => { console.log('Success');  this.takemessage(); })
      .catch((reason: any) => console.log(reason));

     }  else {
      this.cc = this.cc ? this.cc + matches[0] : '' + matches[0];
      this.tts.speak('say next work')
      .then(() => {console.log('Success');  this.takesubject(); })
      .catch((reason: any) => console.log(reason));
     }
      this.ref.detectChanges();
    },
    (onerror) => {console.log('error:', onerror);  }
  )


}

takemessage() {
  this.speechRecognition.startListening()
  .subscribe(

    (matches: Array<string>) => {
      console.log(matches);
      if(matches[0] === 'back'){
      this.goBack();
      }
      else if(matches[0] === 'reset'){
        this.start()
      }
     else if(matches[0] === 'next' || matches[0] === 'done' || matches[0] === 'submit'){
      this.tts.speak('Please wait')
      .then(() => { console.log('Success');  this.send(); })
      .catch((reason: any) => console.log(reason));

     }  else {
      this.cc = this.cc ? this.cc + matches[0] : '' + matches[0];
      this.tts.speak('say next work')
      .then(() => {console.log('Success');  this.takemessage(); })
      .catch((reason: any) => console.log(reason));
     }
     this.ref.detectChanges();
    },
    (onerror) => {console.log('error:', onerror);  }
  )

}

send() {
   const data = {message: this.message, to: this.to, subject: this.subject};
   this.service.send_email(data).subscribe(
      res => {
        this.toastCtrl.presentToast('email sended successfully');
        this.tts.speak('email sended successfully')
        .then(() => {this.goBack(); })
        .catch((reason: any) => {console.log(reason); this.goBack();});
      },
      error => {
        this.toastCtrl.presentToast('opps some thing went wrong tryagain');
        this.tts.speak('opps some thing went wrong tryagain')
        .then(() => {this.goBack(); })
        .catch((reason: any) => {console.log(reason); this.goBack();});
      },
      () => {}
    );
  }

  goBack() {
    this.navCtrl.navigateBack(['home']);
  }

}
