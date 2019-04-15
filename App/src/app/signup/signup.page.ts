import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
 
  constructor( private router: Router) { }

  ngOnInit() {
   
  }

  goToSignup(){
    this.router.navigateByUrl('/signup');
  }

  goTOLogin(){
    this.router.navigateByUrl('/login');
  }

}
