import { Component } from '@angular/core';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'cs-splash-screen-layout-1',
  templateUrl: 'splash-screen-layout-1.page.html',
  styleUrls: ['splash-screen-layout-1.page.scss'],
})
export class SplashScreenLayout1Page  {


  constructor(public viewCtrl: PopoverController, public splashScreen: SplashScreen) {

   }


  ionViewDidEnter() {

    this.splashScreen.hide();

    setTimeout(() => {
      this.viewCtrl.dismiss(SplashScreenLayout1Page);
      console.log('-->');
    }, 2000000);

  }
}
