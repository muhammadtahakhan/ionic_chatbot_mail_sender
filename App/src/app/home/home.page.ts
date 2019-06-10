import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('box') box: ElementRef;

  constructor(private router: Router, public authenticationService:AuthenticationService,) { }

  ngOnInit() {
   console.log('is', this.authenticationService.isAuthenticated());
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
