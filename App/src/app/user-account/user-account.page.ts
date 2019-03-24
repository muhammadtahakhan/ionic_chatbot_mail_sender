import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.page.html',
  styleUrls: ['./user-account.page.scss'],
})
export class UserAccountPage implements OnInit {

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
