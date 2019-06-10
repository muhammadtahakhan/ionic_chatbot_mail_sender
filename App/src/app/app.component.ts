import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent } from '@angular/router';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AuthenticationService } from './services/authentication.service';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

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
   {title:'inbox', url:'inbox', count:10, icon: 'mail'},
   {title:'Outbox', url:'outbox', count:0, icon: 'cloud-upload'},
   {title:'Send Item', url:'senditem', count:15, icon: 'at'},
   {title:'Contact', url:'contact', count:5, icon: 'clipboard'},
   {title:'Archive', url:'archive', count:50, icon: 'archive'},
   {title:'Detete Items', url:'deleteitem', count:50, icon: 'trash'},
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public authenticationService: AuthenticationService,
    private menu: MenuController,
    public speech: SpeechRecognition,
    private speechRecognition: SpeechRecognition, 
    private tts: TextToSpeech
  ) {
    this.initializeApp();
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }
  ngOnInit() {}


  ionViewDidEnter() {

  //   this.tts.speak('well come, say login to login , or say signup for signup')
  //   .then(() => {console.log('Success');  this.takeRoute();})
  //   .catch((reason: any) => console.log(reason));


  //   this.speechRecognition.hasPermission()
  //   .then((hasPermission: boolean) => {

  //     if (!hasPermission) {
  //     this.speechRecognition.requestPermission()
  //       .then(
  //         () => {
  //           console.log('Granted');
  //           this.takeRoute();
  //         },
  //         () => console.log('Denied')
  //       )
  //     }

  //  });

  }

  takeRoute(){
   
    this.speechRecognition.startListening()
    .subscribe(

      (matches: Array<string>) => {
        console.log(matches);
        if(matches[0]=='login' || matches[0]=='log in'){
          this.router.navigate(['login'])
          
        }
        if(matches[0]=='sign up' || matches[0]=='signup'){
          this.router.navigate(['signup'])
        }
        
      },
      (onerror) => console.log('error:', onerror)
    )
         
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
            // this.router.navigate(['user-account']);
            this.router.navigate(['welcome']);
                        
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

goTo(url){
  this.router.navigate([url]);
}


}
