import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { computeStackId } from '@ionic/angular/dist/directives/navigation/stack-utils';
import { NavParams } from '@ionic/angular';
import { stringify } from 'querystring';
// tslint:disable-next-line: class-name
interface data_type {subject: string, from: [], body:any }

@Component({
  selector: 'app-email-detail',
  templateUrl: './email-detail.page.html',
  styleUrls: ['./email-detail.page.scss'],
})
export class EmailDetailPage implements OnInit {
  data = {subject:'', from:[], body:''};
  constructor(private route: ActivatedRoute) {

   }

  ngOnInit() {

    this.route.queryParams.subscribe(
      // tslint:disable-next-line: no-unused-expression

      (res: data_type) => {
        this.data.from = res.from;
        this.data.subject = res.subject;
        const data = res.body.split('--- mail_boundary ---');
        this.data.body = data[1];
        console.log('-->', data);
       },
      error => {},
      () => {}
    )
  }

}
