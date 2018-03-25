import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfoundcomponent',
  templateUrl: './notfoundcomponent.component.html',
  styleUrls: ['./notfoundcomponent.component.css']
})
export class NotfoundcomponentComponent implements OnInit {

  constructor(public appserv:AppService,public router:Router) { }

  ngOnInit() {
    this.appserv.hideNavbar();
    this.appserv.hideFooter();
  }
  redirect(){
    this.appserv.showFooter();
    this.appserv.showFooter();
    this.router.navigate(['home']);
    
  }

}
