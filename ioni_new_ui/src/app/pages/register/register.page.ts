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

  data = {};
    type: string;

    constructor(
        public navCtrl: NavController,
        private service: RegisterService,
        private toastCtrl: ToastService,
        private route: ActivatedRoute) {
        this.type = this.route.snapshot.paramMap.get('type');
        this.service.load(service.getAllThemes()[0]).subscribe(d => {
            this.data = d;
        });
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
