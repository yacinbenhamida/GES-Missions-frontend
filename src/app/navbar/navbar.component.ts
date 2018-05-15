import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, Directive, Input } from '@angular/core';
import { NavbarService } from './navbar.service';
import { AppService } from '../app.service';
import {RouterModule, Router} from '@angular/router';
import { AppComponent } from '../app.component';
import { Departement } from '../model/departement';
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit,AfterViewInit{
  user:string;
  username:string;
  dep:Departement = new Departement();
  constructor(public nav: NavbarService, public route:Router) {  }
  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem('Array'));
    this.dep = JSON.parse(localStorage.getItem('org'));
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
  activeSection(location:any){
    let arr= ['/th-projects','/th-fonct','/th-users','/th-countries','/th-zone','/th-grade','/th-departements','/th-classes'
    ,'/th-categories','/th-typefrais','/th-keywords','/th-org','/th-groupes'];
    return arr.indexOf(location.toString()) != -1;
  }
  activeSection2(location:any){
    let arr= ["/insbud-org","/insbudg-proj","/updbudg-org","/updbudg-proj","confirmbudg-year"];
    return arr.indexOf(location.toString()) != -1;
  }
  activeSection3(location:any){
    let arr= ["/m-missionaires","/m-missions","/m-editmissions","/m-confirmmiss","/confirmmissions","/m-confirmavance"];
    return arr.indexOf(location.toString()) != -1;
  }
}