import { Component,OnInit, ViewChild, ElementRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { NavbarService } from './navbar/navbar.service';
import { NavbarComponent } from './navbar/navbar.component';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit,AfterViewInit,AfterContentInit {
  constructor( public nav: NavbarService,public appserv:AppService ) {

  }
  ngOnInit() { 
    
    this.appserv.showNavbar();
  
    this.appserv.showFooter();
  }
  ngAfterViewInit(){

  }
 ngAfterContentInit(){}
 
  onEdit(){
    window.scrollTo(0,0);
  }
  
}
