import { Component, OnInit } from '@angular/core';
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
    private tts: TextToSpeech,
    private route: ActivatedRoute) {


}
  ngOnInit() {
  }

  send() {
   const data = {message: this.message, to: this.to, subject: this.subject};
   this.service.send_email(data).subscribe(
      res => {},
      error => {},
      () => {}
    );
  }

}
