import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ListViewSwipeToDismissService } from 'src/app/services/list-view-swipe-to-dismiss-service';
import { ToastService } from 'src/app/services/toast-service';
import { ActivatedRoute } from '@angular/router';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.page.html',
  styleUrls: ['./outbox.page.scss'],
})
export class OutboxPage implements OnInit {

  data = [];

type: string;

constructor(
    private tts: TextToSpeech,
    public navCtrl: NavController,
    private service: ListViewSwipeToDismissService,
    private speechRecognition: SpeechRecognition,
    private toastCtrl: ToastService,
    private route: ActivatedRoute) {
    this.type = this.route.snapshot.paramMap.get('type');
    // this.service.load(service.getAllThemes()[this.type]).subscribe(d => {
    //     this.data = d;
    // });

}

ngOnInit() {
  this.tts.speak('Please Wait to fetch emails')
  .then(() => {  })
  .catch((reason: any) => console.log(reason));

  this.service.outbox().subscribe(
    res => { console.log('res-->', res); this.data = res.data; this.read_count() },
    error => { },
    () => { }
  );
}

read_count(){
  this.tts.speak('there are '+ this.data.length +" unread email in your inbox, say one to read more description about first eamil, 2 fro sencodn and so on")
  .then(() => {   })
  .catch((reason: any) => console.log(reason));
}

read_mail(){
  this.speechRecognition.startListening()
    .subscribe(

      (matches: Array<string>) => {
        console.log(matches);
        if(matches[0]=='back'){
        this.goBack();
        }
        else if(matches[0]=='reset'){
          this.read_count();
        }
        else if(matches[0]=='one' || matches[0]=='1' ){ this.read(1);  }
        else if(matches[0]=='two' || matches[0]=='2'){ this.read(2);  }
        else if(matches[0]=='three' || matches[0]=='3'){ this.read(3);  }
        else if(matches[0]=='four' || matches[0]=='4'){ this.read(4);  }
        else if(matches[0]=='five' || matches[0]=='5'){ this.read(5);  }
        else if(matches[0]=='six' || matches[0]=='6'){ this.read(6);  }
        else if(matches[0]=='seven' || matches[0]=='7'){ this.read(7);  }
        else if(matches[0]=='eight' || matches[0]=='8'){ this.read(8);  }
        else if(matches[0]=='nine' || matches[0]=='9'){ this.read(9);  }
        else if(matches[0]=='ten' || matches[0]=='10'){ this.read(10);  }
        else if(matches[0]=='eleven' || matches[0]=='11'){ this.read(11);  }
       else{
        
       }
       
      },
      (onerror) => {console.log('error:', onerror);  }
    )

}

read(no){
 
  this.tts.speak('this mail sended by  '+ this.data[no].from[0] +" and suject of this email is"+ this.data[no].subject+ " if you want read more say email number")
  .then(() => {  this.read_mail();  })
  .catch((reason: any) => console.log(reason));
}

goBack() {

  this.navCtrl.navigateForward(['/home']);

}

isType(item) {
    return item === parseInt(this.type, 10);
}

// events
onItemClick(params): void {
    console.log(params);
    this.toastCtrl.presentToast('onItemClick');
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
    this.toastCtrl.presentToast('onDelete');
}



}
