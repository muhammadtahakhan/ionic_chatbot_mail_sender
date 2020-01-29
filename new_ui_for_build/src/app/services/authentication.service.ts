import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseService } from './baseService';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { from } from 'rxjs';
// import { HTTP } from '@ionic-native/http/ngx';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform, private http: HttpClient) { 
    super();
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
   this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }

  login(user) {

    return  this.http.post(this.url + 'auth/login', user).pipe(
      tap((res: any) => {
        if(res.success){
          localStorage.setItem(TOKEN_KEY, 'Bearer '+ res.data.token);
          this.storage.set(TOKEN_KEY, 'Bearer ' + res.data.token).then(() => {
            this.authenticationState.next(true);
          });
        }

      }),
    )

  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  signup(user) {
    return  this.http.post(this.url+'auth/signup', user).pipe(
      tap((res:any) => { 
        if(res.success){
        }

      }),
    )
    // return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
    //   this.authenticationState.next(true);
    // });
  }

  get_user_data() {
    return this.http.get(this.url + 'setting');
  }

  save_user_data(data) {
    return this.http.post(this.url + 'setting', data);
  }

  reset_password(data){
    return this.http.post(this.url + 'auth/reset_password', data);
  }

}