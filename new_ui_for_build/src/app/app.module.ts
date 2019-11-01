import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { SharedModule } from './components/shared.module';
import { SplashScreenLayout1Page } from './components/splash-screen/splash-screen-layout-1/splash-screen-layout-1.page';
import { SplashScreenLayout2Page } from './components/splash-screen/splash-screen-layout-2/splash-screen-layout-2.page';
import { SplashScreenLayout3Page } from './components/splash-screen/splash-screen-layout-3/splash-screen-layout-3.page';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [AppComponent,
     SplashScreenLayout1Page,
     SplashScreenLayout2Page,
     SplashScreenLayout3Page],

  imports: [BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    HttpClientModule,

    AppRoutingModule],
    entryComponents: [ SplashScreenLayout1Page,
      SplashScreenLayout2Page,
      SplashScreenLayout3Page],
  providers: [
    SpeechRecognition,
    TextToSpeech,
    FingerprintAIO,
    NativeStorage,
    StatusBar,
    SplashScreen,
    {provide: HTTP_INTERCEPTORS,  useClass: TokenInterceptor,
      multi: true
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule {}
