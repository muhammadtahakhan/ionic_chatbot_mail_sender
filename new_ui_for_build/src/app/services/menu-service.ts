import { IService } from './IService';
// import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { AppSettings } from './app-settings';
import { LoadingService } from './loading-service';

@Injectable({ providedIn: 'root' })
export class MenuService implements IService {

  constructor( ) { }

  getId = (): string => 'menu';

  getTitle = (): string => 'UIAppTemplate';

  //* Data Set for main menu
  getAllThemes = (): Array<any> => {
    return [
    
      {
        'url': 'swipe-to-dismiss/0',
        'title': 'Inbox',
        'theme': 'parallax',
        'icon': 'icon-format-line-spacing',
        'listView': false,
        'component': '',
        'singlePage': false
      },
     
      {
        'url': 'swipe-to-dismiss/0',
        'title': 'Outox',
        'theme': 'parallax',
        'icon': 'icon-format-line-spacing',
        'listView': false,
        'component': '',
        'singlePage': false
      },
     
      {
        'url': 'splash-screens/2',
        'title': 'Splash Screen',
        'theme': 'splashScreens',
        'icon': 'icon-logout',
        'listView': false,
        'component': '',
        'singlePage': false
      },
    
      {
        'url': 'profile/4',
        'title': 'Profile',
        'theme': 'profile',
        'icon': 'icon-account-outline',
        'listView': false,
        'component': '',
        'singlePage': false
      },
         ];
  }

  getDataForTheme = (menuItem: any) => {
    return {
      'background': 'assets/imgs/background/16.jpg',
      'image': 'assets/imgs/logo/login-3.png',
      'title': 'Eye Electronic Mail'
    };
  }

  getEventsForTheme = (menuItem: any): any => {
    return {};
  }

  prepareParams = (item: any): any => {
    return {
      title: item.title,
      data: {},
      events: this.getEventsForTheme(item)
    };
  }


}
