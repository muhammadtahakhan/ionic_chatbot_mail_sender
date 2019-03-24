import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('box') box: ElementRef;

  constructor() { }

  ngOnInit() {
   
  }
  ngAfterViewInit(){
    setTimeout(() => {
      this.doMagic();
    }, 4000);
   
  }

  doMagic() {
    this.box.nativeElement.classList.add('animated');
    this.box.nativeElement.classList.add('infinite');
    this.box.nativeElement.classList.add('pulse');
    this.box.nativeElement.classList.add('delay-5s');
   
}

}
