import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { NavController } from '@ionic/angular';
import { MenuService } from './services/menu-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [];
  headerMenuItem: any = {background: 'assets/imgs/background/16.jpg',
  image: 'assets/imgs/logo/login-3.png',
  title: 'Eye Electronic Mail'};
  isEnabledRTL = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authenticationService: AuthenticationService,
    private navController: NavController,
    private menuService: MenuService,
    private router: Router,
  ) {
    this.isEnabledRTL = localStorage.getItem('isEnabledRTL') === 'true';
    this.initializeApp();
    this.appPages = this.menuService.getAllThemes()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#0091D2');
      document.body.removeAttribute('class');
      document.body.classList.add('blue-gradient-3');
        this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.authenticationService.logout();
        this.authenticationService.authenticationState.subscribe(
          res=>{

            console.log('auth status', res);
            if(!res){
              // this.router.navigate(['user-account']);
              this.router.navigate(['login']);

            }else{
              this.router.navigate(['home']);
            }
          }
        )

          });
      this.setRTL();

    });
  }

  setRTL() {
    document.getElementsByTagName('html')[0]
            .setAttribute('dir', this.isEnabledRTL  ? 'rtl' : 'ltr');
  }

  openPage(page) {
    this.navController.navigateRoot([page.url], {});
  }
}
