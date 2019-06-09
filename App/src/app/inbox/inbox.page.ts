import { Component, OnInit, ElementRef } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  delete(ele: any){
    ele.el.classList.add('animated');
    ele.el.classList.add('rotateOutUpRight');
    ele.el.classList.add('delay-0.5s');
  }

  archive(ele: any){
    ele.el.classList.add('animated');
    ele.el.classList.add('slideOutLeft');
    ele.el.classList.add('delay-0.5s');
  }

}
