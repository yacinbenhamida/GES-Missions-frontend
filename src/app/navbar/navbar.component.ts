import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, Directive, Input } from '@angular/core';
import { NavbarService } from './navbar.service';
import { AppService } from '../app.service';
import {RouterModule, Router} from '@angular/router';
import { AppComponent } from '../app.component';
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit,AfterViewInit{
  user:string;
  username:string;
  constructor(public nav: NavbarService, public route:Router) {
    this.ngOnInit();
  }
  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem('Array'));
    switch(this.user){
      case "O":this.username = "ordonnateur";break;
      case "P" : this.username = "payeur";break;
      case "OM": this.username = "ordonnateur ministeriel";break;
      case "A": this.username = "admin";break;
    }
    this.nav.knowUser(this.user);
   }
  ngAfterViewInit(): void {}
  disconnect(){
    localStorage.removeItem('Array'); 
    localStorage.clear();
    this.route.navigate([""]);
  }
}