import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { ProfileService } from './../../services/profile-service';
import { ToastService } from 'src/app/services/toast-service';

@Component({
    templateUrl: 'item-details-profile.page.html',
    styleUrls: ['item-details-profile.page.scss'],
    providers: [ProfileService]

})
export class ItemDetailsProfilePage {

    data = {category: 'populary',
            followers: 'Followers',
            following: 'Following',
            headerImage: 'assets/imgs/background/22.jpg',
            iconFacebook: 'logo-facebook',
            iconInstagram: 'logo-instagram',
            iconTwitter: 'logo-twitter',
            image: 'assets/imgs/avatar/22.jpg',
            items: [{
                content: 'Content',
            globe: 'csform.com',
            iconGlobe: 'globe',
            iconMail: 'mail-open',
            iconPhone: 'ios-phone-portrait',
            id: 1,
            mail: 'dev@csform.com',
            phone: 'i598-968-5698987',
            subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            title: 'About',
                }],
            posts: 'Posts',
            subtitle: 'Extreme coffee lover. Twitter maven. Internet practitioner. Beeraholic.',
            title: 'Carolyn Guerrero',
            toolbarTitle: 'Profile with Big Image',
            valueFollowers: '439',
            valueFollowing: '297',
            valuePosts: '43'};
   
    type: string;

    constructor(
        public navCtrl: NavController,
        private service: ProfileService,
        private toastCtrl: ToastService,
        private route: ActivatedRoute) {
        this.type = this.route.snapshot.paramMap.get('type');
        // this.service.load(service.getAllThemes()[this.type]).subscribe(d => {
        //     this.data = d;
        // });
    }

    isType(item) {
        return item === parseInt(this.type, 10);
    }


    onFacebook(params) {
        this.toastCtrl.presentToast('onFacebookFunc:' + JSON.stringify(params));
    }

    onTwitter(params) {
        this.toastCtrl.presentToast('onTwitterFunc:' + JSON.stringify(params));
    }

    onInstagram(params) {
        this.toastCtrl.presentToast('onInstagramFunc:' + JSON.stringify(params));
    }

    onLike(item): void {

      if (item && item.like) {
          if (item.like.isActive) {
              item.like.isActive = false;
              item.like.number--;
          } else {
              item.like.isActive = true;
              item.like.number++;
          }
      }
        this.toastCtrl.presentToast('onLike:' + JSON.stringify(item));
    }

    onComment(item): void {
        if (item && item.comment) {
            if (item.comment.isActive) {
                item.comment.isActive = false;
                item.comment.number--;
            } else {
                item.comment.isActive = true;
                item.comment.number++;
            }
        }
        this.toastCtrl.presentToast('onComment:' + JSON.stringify(item));
    }

    onItemClick(params) {
        this.toastCtrl.presentToast('onItemClick:' + JSON.stringify(params));
    }
}
