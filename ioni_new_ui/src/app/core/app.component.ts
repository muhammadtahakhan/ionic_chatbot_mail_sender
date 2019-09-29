import { Component } from '@angular/core';
import {ExportService} from '../services/export-service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuService } from '../services/menu-service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [MenuService, ExportService]
})
export class AppComponent {
  public appPages = [];
  headerMenuItem = {}
  isEnabledRTL: boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuService: MenuService,
    private exportService: ExportService,
    private navController: NavController
  ) {
    this.isEnabledRTL = localStorage.getItem('isEnabledRTL') == "true";
    // console.log(JSON.stringify(exportService.export()));
    this.initializeApp();
    this.appPages = this.menuService.getAllThemes()
    this.headerMenuItem = this.menuService.getDataForTheme(null)
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#0091D2');
      document.body.removeAttribute('class');
      document.body.classList.add('blue-gradient-3');
      //this.splashScreen.hide();
      this.setRTL();
    });
  }
  setRTL() {
    document.getElementsByTagName('html')[0]
            .setAttribute('dir', this.isEnabledRTL  ? 'rtl': 'ltr');
  }

  openPage(page) {
    this.navController.navigateRoot([page.url], {});
  }
}
