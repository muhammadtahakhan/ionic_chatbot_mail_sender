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
        'url': 'compose-email',
        'title': 'Compose Email',
        'theme': 'parallax',
        'icon': 'icon-format-line-spacing',
        'listView': false,
        'component': '',
        'singlePage': false
      },
    
      {
        'url': 'inbox',
        'title': 'Inbox',
        'theme': 'parallax',
        'icon': 'icon-format-line-spacing',
        'listView': false,
        'component': '',
        'singlePage': false
      },
      {
        'url': 'outbox',
        'title': 'Sent Items',
        'theme': 'parallax',
        'icon': 'icon-format-line-spacing',
        'listView': false,
        'component': '',
        'singlePage': false
      },
      {
        'url': 'trash',
        'title': 'trash Items',
        'theme': 'parallax',
        'icon': 'icon-format-line-spacing',
        'listView': false,
        'component': '',
        'singlePage': false
      },

      // {
      //   'url': 'swipe-to-dismiss/0',
      //   'title': 'swipe-to-dismiss',
      //   'theme': 'parallax',
      //   'icon': 'icon-format-line-spacing',
      //   'listView': false,
      //   'component': '',
      //   'singlePage': false
      // },

      // {
      //   'url': 'splash-screens/2',
      //   'title': 'Splash Screen',
      //   'theme': 'splashScreens',
      //   'icon': 'icon-logout',
      //   'listView': false,
      //   'component': '',
      //   'singlePage': false
      // },

      // {
      //   'url': 'profile/4',
      //   'title': 'Profile',
      //   'theme': 'profile',
      //   'icon': 'icon-account-outline',
      //   'listView': false,
      //   'component': '',
      //   'singlePage': false
      // },
      {
        'url': 'setting',
        'title': 'Setting',
        'theme': 'Setting',
        'icon': 'icon-account-outline',
        'listView': false,
        'component': '',
        'singlePage': false
      },
      //   {
      //   'url': 'login',
      //   'title': 'Login Pages',
      //   'theme': 'login',
      //   'icon': 'icon-lock-open-outline',
      //   'listView': false,
      //   'component': '',
      //   'singlePage': false
      // },
      //  {
      //   'url': 'register',
      //   'title': 'Register',
      //   'theme': 'parallax',
      //   'icon': 'icon-format-line-spacing',
      //   'listView': false,
      //   'component': '',
      //   'singlePage': false
      // },
         ];
  }

  getDataForTheme = (menuItem: any) => {
    return {
      'background': 'assets/imgs/background/16.jpg',
      'image': 'assets/imgs/logo/login-3.png',
      'title': 'Voice base email system for blinds'
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
