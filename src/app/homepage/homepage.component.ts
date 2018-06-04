import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../app.component';
import { AppService } from '../app.service';
import { Utilisateur } from '../model/Utilisateur';
import { Route, Router } from '@angular/router';
import { AES } from 'crypto-ts';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  u:Utilisateur;
  constructor(public appserv:AppService,router:Router) {
    this.u = JSON.parse(localStorage.getItem('Array'));
    if(this.u==undefined){
        router.navigate(['error']);
    }
   }

  ngOnInit() {
    this.appserv.showNavbar();
    this.appserv.showFooter();
  }

}
