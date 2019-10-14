import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login-service';
import { ToastService } from 'src/app/services/toast-service';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from 'src/app/services/register-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  data = {button: "Register",
  city: "City",
  cityPlaceholder: "Your City",
  country: "Country",
  countryPlaceholder: "Your Country",
  email: "Email",
  emailPlaceholder: "Your Email",
  logo: "assets/imgs/logo/login.png",
  password: "Password",
  passwordPlaceholder: "Your Password",
  register: "Register",
  skip: "Skip",
  toolbarTitle: "Register + logo 1",
  username: "Username",
  usernamePlaceholder: "Your Username"};
    type: string;

    constructor(
        public navCtrl: NavController,
        private service: RegisterService,
        private toastCtrl: ToastService,
        private route: ActivatedRoute) {
        this.type = this.route.snapshot.paramMap.get('type');
       
    }
    ngOnInit() {
    }


    isType(item) {
        return item === parseInt(this.type, 10);
    }

    // events
    onRegister(params): void {
        this.toastCtrl.presentToast('onRegister:' + JSON.stringify(params));
    }


    onSkip(event): void {
        this.toastCtrl.presentToast('Navigated to login');
        this.navCtrl.navigateForward('login');
    }


}
