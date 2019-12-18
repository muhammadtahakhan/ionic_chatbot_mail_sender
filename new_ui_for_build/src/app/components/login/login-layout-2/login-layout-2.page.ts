import { Component, Output, EventEmitter, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { ToastService } from 'src/app/services/toast-service';

@Component({
  selector: 'cs-login-layout-2',
  templateUrl: 'login-layout-2.page.html',
  styleUrls: ['login-layout-2.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class LoginLayout2Page implements OnChanges {


  @Output() onLogin = new EventEmitter();
  @Output() onRegister = new EventEmitter();
  @Output() onSkip = new EventEmitter();

  private _username : string;
  private _password : string;
  @Input()
  set username(username: string) {
    this.item.username = username;
  }
  get username(): string { return this._username; }

  @Input()
  set password(password: string) {
    this.item.password = password;
  }
  get password(): string { return this._password; }

  public isUsernameValid = true;
  public isPasswordValid = true;

  item = {
    'username': '',
    'password': ''
  };

  constructor( private toastCtrl: ToastService) { }

  ngOnChanges(changes: { [propKey: string]: any }) {
    this.toastCtrl.presentToast('cahange');
  }

  onLoginFunc(): void {
    if (event) {
      event.stopPropagation();
    }
    if (this.validate()) {
      this.onLogin.emit(this.item);
    }
  }

  onRegisterFunc(): void {
    if (event) {
      event.stopPropagation();
    }
    if (this.validate()) {
      this.onRegister.emit(this.item);
    }
  }

  onSkipFunc(): void {
    if (event) {
      event.stopPropagation();
    }
    this.onSkip.emit(this.item);
  }

  validate(): boolean {
    this.isUsernameValid = true;
    this.isPasswordValid = true;
    if (!this.item.username || this.item.username.length === 0) {
      this.isUsernameValid = false;
    }

    if (!this.item.password || this.item.password.length === 0) {
      this.isPasswordValid = false;
    }

    return this.isPasswordValid && this.isUsernameValid;
  }
}
