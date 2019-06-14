import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private router: Router, public authenticationService:AuthenticationService,  private tts: TextToSpeech) {
    if(this.authenticationService.isAuthenticated())
    this.router.navigate(['']);

   }

  ngOnInit() {

  
  }

  ionViewDidEnter(){
    this.tts.speak('Welcome, this is blind peopels app')
    .then(() => {console.log('Success');  this.finish(); })
    .catch((reason: any) => console.log(reason));
  }


  
finish() {
  this.router.navigateByUrl('/user-account');
}


}
