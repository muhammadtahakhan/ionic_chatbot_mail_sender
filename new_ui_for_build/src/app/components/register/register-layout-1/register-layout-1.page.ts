import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'cs-register-layout-1',
  templateUrl: 'register-layout-1.page.html',
  styleUrls: ['register-layout-1.page.scss'],
})
export class RegisterLayout1Page implements OnChanges {

  
  @Output() onRegister = new EventEmitter();
  @Output() onSkip = new EventEmitter();

  public isEmailValid = true;
  public isUsernameValid = true;
  public isPasswordValid = true;
  public isCPasswordValid = true;
  public isNameValid = true;


  public regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  item = {
    'email': '',
    'username': '',
    'password': '',
    'c_password': '',
    'name': '',
    
   
  };

  constructor() {
    
   }

  ngOnChanges(changes: { [propKey: string]: any }) {
    // this.data = changes['data'].currentValue;
    // console.log(this.data, changes);
  }

  onRegisterFunc(): void {
    console.log( this.isEmailValid ,
      this.isPasswordValid ,
      this.isUsernameValid ,
      this.isCPasswordValid ,
      this.isNameValid);
      console.log('-->', this.item.email ,
        this.item.password ,
        this.item.c_password ,
        this.item.username ,
        this.item.name);
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
    this.isEmailValid = true;
    this.isUsernameValid = true;
    this.isPasswordValid = true;
    this.isCPasswordValid = true;
   

    if (!this.item.username || this.item.username.length === 0) {
      this.isUsernameValid = false;
    }

    if (!this.item.password || this.item.password.length === 0) {
      this.isPasswordValid = false;
    }
    if (!this.item.c_password || this.item.password.length === 0) {
      this.isCPasswordValid = false;
    }

    if (!this.item.name || this.item.name.length === 0) {
      this.isNameValid = false;
    }


    this.isEmailValid = this.regex.test(this.item.email);

    return this.isEmailValid &&
      this.isPasswordValid &&
      this.isUsernameValid &&
      this.isCPasswordValid &&
      this.isNameValid;
  }
}
