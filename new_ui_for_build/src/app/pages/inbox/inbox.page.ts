import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ListViewSwipeToDismissService } from 'src/app/services/list-view-swipe-to-dismiss-service';
import { ToastService } from 'src/app/services/toast-service';
import { ActivatedRoute } from '@angular/router';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
data = [];

type: string;

constructor(
    private tts: TextToSpeech,
    public navCtrl: NavController,
    private service: ListViewSwipeToDismissService,
    private speechRecognition: SpeechRecognition,
    private ref: ChangeDetectorRef,
    private toastCtrl: ToastService,
    private route: ActivatedRoute) {
    this.type = this.route.snapshot.paramMap.get('type');
    // this.service.load(service.getAllThemes()[this.type]).subscribe(d => {
    //     this.data = d;
    // });

}

ngOnInit() {
  this.toastCtrl.presentToast('Please Wait to fetch emails');
  this.tts.speak('Please Wait to fetch emails')
  .then(() => {  })
  .catch((reason: any) => console.log(reason));

  this.service.inbox().subscribe(
    res => { console.log('res-->', res); this.data = res.data; this.read_count() },
    error => { },
    () => { }
  );
}

read_count(){
  // tslint:disable-next-line: max-line-length
  this.tts.speak('there are ' + this.data.length + ' unread email in your inbox, say one to read more description about first eamil, 2 for sencond and so on')
  .then(() => { this.read_mail();  })
  .catch((reason: any) =>{}  );
}

again() {

  this.tts.speak('Sorry come again, there are ' + this.data.length + ' unread email in your inbox, say one to read more description about first eamil, 2 for sencond and so on')
  .then(() => { this.read_mail();  })
  .catch((reason: any) => console.log(reason));

}


read_mail(){
  this.speechRecognition.startListening()
    .subscribe(

      (matches: Array<string>) => {
        console.log(matches);
        if(matches[0].includes('back') || matches[0].includes('home')){
          this.navCtrl.navigateForward(['/home']);
        }
        else if(matches[0].includes('reset') || matches[0].includes('again')){
          this.read_count();
        }

        else if( (matches[0].toLowerCase().includes('delete') ) && (matches[0].includes('one') || matches[0]=='1' || matches[0].includes("first")) ){ this.onDelete(this.data[1]['id'])  }
        else if( (matches[0].toLowerCase().includes('delete') ) && (matches[0].includes('two') || matches[0]=='2' ||  matches[0].includes("second")) ){ this.onDelete(this.data[2]['id'])  }
        else if( (matches[0].toLowerCase().includes('delete') ) && (matches[0].includes('three') || matches[0]=='3' ||  matches[0].includes("third")) ){ this.onDelete(this.data[3]['id'])  }
        else if( (matches[0].toLowerCase().includes('delete') ) && (matches[0].includes('four') || matches[0]=='4' ||  matches[0].includes("fourth")) ){ this.onDelete(this.data[4]['id'])  }
        else if( (matches[0].toLowerCase().includes('delete') ) && (matches[0].includes('five') || matches[0]=='5' ||  matches[0].includes("fifth")) ){ this.onDelete(this.data[5]['id'])  }
        else if( (matches[0].toLowerCase().includes('delete') ) && (matches[0].includes('six') || matches[0]=='6' || matches[0].includes("sixth")) ){this.onDelete(this.data[6]['id'])  }
        else if( (matches[0].toLowerCase().includes('delete') ) && (matches[0].includes('seven') || matches[0]=='7' || matches[0].includes("seventh")) ){ this.onDelete(this.data[7]['id'])  }
        else if( (matches[0].toLowerCase().includes('delete') ) && (matches[0].includes('eight') || matches[0]=='8' || matches[0].includes("eighth")) ){ this.onDelete(this.data[8]['id'])  }
        else if( (matches[0].toLowerCase().includes('delete') ) && (matches[0].includes('nine') || matches[0]=='9' || matches[0].includes("ninth")) ){ this.onDelete(this.data[9]['id'])  }
        else if( (matches[0].toLowerCase().includes('delete') ) && (matches[0].includes('ten') || matches[0]=='10' || matches[0].includes("tenth")) ){ this.onDelete(this.data[10]['id'])  }
        else if( (matches[0].toLowerCase().includes('delete') ) && (matches[0].includes('eleven') || matches[0]=='11' || matches[0].includes("eleventh")) ){ this.onDelete(this.data[11]['id'])  }
        else if( (matches[0].toLowerCase().includes('delete') ) && (matches[0].includes('twelve') || matches[0]=='12' || matches[0].includes("twelveth")) ){ this.onDelete(this.data[12]['id'])  }
        else if( (matches[0].toLowerCase().includes('delete') ) && (matches[0].includes('thirteen') || matches[0]=='13')) { this.onDelete(this.data[13]['id'])  }
        else if( (matches[0].toLowerCase().includes('delete') ) && (matches[0].includes('fourteeh') || matches[0]=='14')) { this.onDelete(this.data[14]['id'])  }
        else if( (matches[0].toLowerCase().includes('delete') ) && (matches[0].includes('fifteen') || matches[0]=='15')) { this.onDelete(this.data[15]['id']) }
        else if( (matches[0].toLowerCase().includes('delete') ) && (matches[0].includes('sixteen') || matches[0]=='16' )) { this.onDelete(this.data[16]['id']) }
        else if( (matches[0].toLowerCase().includes('delete') ) && (matches[0].includes('seventeen') || matches[0]=='17' )) { this.onDelete(this.data[17]['id']) }
        else if( (matches[0].toLowerCase().includes('delete') ) && (matches[0].includes('eighteen') || matches[0]=='18' )) { this.onDelete(this.data[18]['id']) }
        else if( (matches[0].toLowerCase().includes('delete') ) && (matches[0].includes('ninteen') || matches[0]=='19' )) { this.onDelete(this.data[19]['id']) }
        else if( (matches[0].toLowerCase().includes('delete') ) && (matches[0].includes('twenty') || matches[0]=='20' )) { this.onDelete(this.data[20]['id'])}

        else if(matches[0].includes('one') || matches[0]=='1' || matches[0].includes("first") ){ this.read(1);  }
        else if(matches[0].includes('two') || matches[0]=='2' ||  matches[0].includes("second")){ this.read(2);  }
        else if(matches[0].includes('three') || matches[0]=='3' ||  matches[0].includes("third")){ this.read(3);  }
        else if(matches[0].includes('four') || matches[0]=='4' ||  matches[0].includes("fourth")){ this.read(4);  }
        else if(matches[0].includes('five') || matches[0]=='5' ||  matches[0].includes("fifth")){ this.read(5);  }
        else if(matches[0].includes('six') || matches[0]=='6' || matches[0].includes("sixth")){ this.read(6);  }
        else if(matches[0].includes('seven') || matches[0]=='7' || matches[0].includes("seventh")){ this.read(7);  }
        else if(matches[0].includes('eight') || matches[0]=='8' || matches[0].includes("eighth")){ this.read(8);  }
        else if(matches[0].includes('nine') || matches[0]=='9' || matches[0].includes("ninth")){ this.read(9);  }
        else if(matches[0].includes('ten') || matches[0]=='10' || matches[0].includes("tenth")){ this.read(10);  }
        else if(matches[0].includes('eleven') || matches[0]=='11' || matches[0].includes("eleventh")){ this.read(11);  }
        else if(matches[0].includes('twelve') || matches[0]=='12' || matches[0].includes("twelveth")){ this.read(11);  }
        else if(matches[0].includes('thirteen') || matches[0]=='13') { this.read(13);  }
        else if(matches[0].includes('fourteeh') || matches[0]=='14') { this.read(14);  }
        else if(matches[0].includes('fifteen') || matches[0]=='15') { this.read(15); }
        else if(matches[0].includes('sixteen') || matches[0]=='16' ) { this.read(16); }
        else if(matches[0].includes('seventeen') || matches[0]=='17' ) { this.read(17); }
        else if(matches[0].includes('eighteen') || matches[0]=='18' ) { this.read(18); }
        else if(matches[0].includes('ninteen') || matches[0]=='19' ) { this.read(19); }
        else if(matches[0].includes('twenty') || matches[0]=='20' ) { this.read(20);}


       else{
        this.again();
       }
       
      },
      (onerror) => {  }
    );

}

read(no){
  no = no-1;
  this.onItemClick(this.data[no]);
  const data = this.data[no].body.split('--- mail_boundary ---');
  this.tts.speak('this mail sended by  '+ this.data[no].from[0] +" and suject of this email is "+ this.data[no].subject+ " and content is     "+data[0]+" if you want read more say email number")
  .then(() => {  this.navCtrl.navigateForward(['/inbox']); this.read_count(); })
  .catch((reason: any) => console.log(reason));
}

goBack() {

  this.navCtrl.navigateForward(['/inbox']);

}

isType(item) {
    return item === parseInt(this.type, 10);
}

// events
onItemClick(params): void {
    console.log(params);
    this.toastCtrl.presentToast('email open');
    this.navCtrl.navigateForward(['email-detail'], {
      queryParams: params,
      });
}

onLike(params): void {
    this.toastCtrl.presentToast('onLike');
}
onFavorite(params): void {
    this.toastCtrl.presentToast('onFavorite');
}
onShare(params): void {
    this.toastCtrl.presentToast('onShare');
}
onUndo(params): void {
    this.toastCtrl.presentToast('onUndo');
}
onDelete(params): void {
    this.toastCtrl.presentToast('Delete in Process');
    this.service.delete(params).subscribe(
      res => { this.tts.speak('this mail deleted successfully')
      .then(() => { 
        this.data = this.data.filter(item => item.id != params ); 
        console.log(this.data);
        this.ref.detectChanges();   })
      .catch((reason: any) => {
        this.data = this.data.filter(item => item.id != params ); 
        console.log(this.data);
        this.ref.detectChanges()
      }); },
      error => { },
      () => { }
    );
}


}
