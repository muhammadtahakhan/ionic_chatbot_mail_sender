import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent } from '@angular/router';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AuthenticationService } from './services/authentication.service';

interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  selectedPath = '';
 
  pages = [
    
   
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public authenticationService: AuthenticationService,
    private menu: MenuController,
    public speech: SpeechRecognition,
  ) {
    this.initializeApp();
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }




  goAccount() {
    this.router.navigateByUrl('/user-account');
  }
  goInbox() {
    this.router.navigateByUrl('/user-account');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authenticationService.logout();
      this.authenticationService.authenticationState.subscribe(
        res=>{
         
          console.log('auth status', res);
          if(!res){
            this.router.navigate(['user-account']);
                        
          }else{
            this.router.navigate(['']);
          }
        }
      )
 
        });
  }

 
logout(){
  this.menu.close();
  this.authenticationService.logout();
}


}
