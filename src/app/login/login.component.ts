import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy, OnChanges } from '@angular/core';
import { NavbarService } from '../navbar/navbar.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent} from '../navbar/navbar.component';
import {AppComponent} from '../app.component';
import {NgForm} from '@angular/forms';
import { AppService } from '../app.service';
import { UtilisateurService } from '../model/utilisateur.service';
import { Utilisateur } from '../model/utilisateur';
import { DepartementJS } from '../model/departementjson';
import { Departement } from '../model/departement';
import { error } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,AfterViewInit{
  username:number = null;
  pw:string = null;
  user:Utilisateur;
  dep:Departement;
  error:boolean = false;
  constructor(public userServ : UtilisateurService,route : ActivatedRoute,
    private activatedRoute: ActivatedRoute,private router: Router,
    private nav: NavbarService,public appserv:AppService,public appc:AppComponent) {
    this.router.events.subscribe(path => {
      if((path.id>1) && (path.url=="/")){
        window.location.reload();
      } 
    });
  }
  ngOnInit() {
    if(localStorage.getItem('Array')!=undefined &&     localStorage.getItem('user')!=undefined  ){
      this.router.navigate(['home']);
    }else {
    this.dep = new Departement();
    this.user = new Utilisateur();
    localStorage.clear();
    localStorage.removeItem('Array'); 
    localStorage.removeItem('org');
    this.appserv.hideNavbar();
    this.appserv.hideFooter();
    }
  }
  public isEmpty(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }
  ngAfterViewInit(): void {}
onSubmit() {
  if(this.username && this.pw){
  this.appc.start();
  this.userServ.getLoginCredentials(this.username,this.pw).subscribe(user=>
    {this.user=user;
      if(!(this.isEmpty(this.user))){
        localStorage.setItem('user',JSON.stringify(this.user));
        if(this.user.codeProfile == "C"){
          this.userServ.getDepOfUser(this.user.codeUtilisateur).subscribe(data=>{
            localStorage.setItem('org',JSON.stringify(data));
            localStorage.removeItem('Array');
            localStorage.setItem('Array', JSON.stringify("C"));
            this.router.navigate(['home']);
            this.appserv.showNavbar();
    });     
        }
        else if(this.user.codeProfile == "O"){
          this.userServ.getDepOfUser(this.user.codeUtilisateur).subscribe(data=>{
                                localStorage.setItem('org',JSON.stringify(data));
                                localStorage.removeItem('Array');
                                localStorage.setItem('Array', JSON.stringify("O"));
                                this.router.navigate(['home']);
                                this.appserv.showNavbar();
                        });         
        }
        else if(this.user.codeProfile == "P"){
          this.userServ.getDepOfUser(this.user.codeUtilisateur).subscribe(data=>{
            localStorage.setItem('org',JSON.stringify(data));
            localStorage.removeItem('Array');
            localStorage.setItem('Array', JSON.stringify("P"));
            this.router.navigate(['home']);
            this.appserv.showNavbar();
    });  
          
        } 
        else if(this.user.codeProfile == "OM"){
          this.userServ.getDepOfUser(this.user.codeUtilisateur).subscribe(data=>{
            localStorage.setItem('org',JSON.stringify(data));
            localStorage.removeItem('Array');
            localStorage.setItem('Array', JSON.stringify("OM"));
            this.router.navigate(['home']);
            this.appserv.showNavbar();
    });  
          
        }
        else if (this.user.codeProfile == "ADMIN"){
          localStorage.removeItem('Array');
          localStorage.setItem('user',JSON.stringify(this.user));
          localStorage.setItem('Array', JSON.stringify("A"));
          this.router.navigate(['home']);
          this.appserv.showNavbar();
        }
        else {
          alert("مستعمل غير مسجل");
        }   
      }
      else this.error = true;
    }
  ,error=>{
    this.error = true;
  });
      setTimeout(()=>{
          this.appc.stop(); }, 1200);
  }else this.error = true;
} 
}
