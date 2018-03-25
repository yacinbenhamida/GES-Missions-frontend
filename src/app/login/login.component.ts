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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,AfterViewInit {
  username:number = null;
  pw:string = null;
  user:Utilisateur;
  dep:Departement;
  constructor(public userServ : UtilisateurService,route : ActivatedRoute,private activatedRoute: ActivatedRoute,private router: Router,private nav: NavbarService,public appserv:AppService,public appc:AppComponent) {
    this.router.events.subscribe(path => {
      if((path.id>1) && (path.url=="/")){
        window.location.reload();
      } 
    });
    localStorage.removeItem('Array'); 
    localStorage.removeItem('org');
    localStorage.clear();   
  }
  ngOnInit() {
    this.dep = new Departement();
    this.user = new Utilisateur();
    localStorage.clear();
    localStorage.removeItem('Array'); 
    this.appserv.hideNavbar();
    this.appserv.hideFooter();
  }
  public isEmpty(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }
  ngAfterViewInit(): void {localStorage.clear();}
onSubmit() {
  this.userServ.getLoginCredentials(this.username,this.pw).subscribe(user=>this.user=user);
  console.log(this.user);
  
  if(!(this.isEmpty(this.user))){
    localStorage.setItem('user',JSON.stringify(this.user));
    if(this.user.codeProfile == "C"){
      this.userServ.getDepOfUser(this.user.codeUtilisateur).subscribe(data=>{
        console.log(data);
        localStorage.setItem('org',JSON.stringify(data));
        localStorage.removeItem('Array');
        localStorage.setItem('Array', JSON.stringify("C"));
        console.log("code "+this.dep.codeDep);
        console.log("paramcode "+localStorage.getItem('org'));
        this.router.navigate(['home']);
        this.appserv.showNavbar();
});  
      
    }
    else if(this.user.codeProfile == "O"){
      this.userServ.getDepOfUser(this.user.codeUtilisateur).subscribe(data=>{
                            console.log(data);
                            localStorage.setItem('org',JSON.stringify(data));
                            localStorage.removeItem('Array');
                            localStorage.setItem('Array', JSON.stringify("O"));
                            this.router.navigate(['home']);
                            this.appserv.showNavbar();
                    });         
    }
    else if(this.user.codeProfile == "P"){
      this.userServ.getDepOfUser(this.user.codeUtilisateur).subscribe(data=>{
        console.log(data);
        localStorage.setItem('org',JSON.stringify(data));
        localStorage.removeItem('Array');
        localStorage.setItem('Array', JSON.stringify("P"));
        this.router.navigate(['home']);
        this.appserv.showNavbar();
});  
      
    } 
    else if(this.user.codeProfile == "OM"){
      this.userServ.getDepOfUser(this.user.codeUtilisateur).subscribe(data=>{
        console.log(data);
        localStorage.setItem('org',JSON.stringify(data));
        localStorage.removeItem('Array');
        localStorage.setItem('Array', JSON.stringify("OM"));
        this.router.navigate(['home']);
        this.appserv.showNavbar();
});  
      
    }
    else if (this.user.codeProfile == "ADMIN"){
      localStorage.clear();
      localStorage.removeItem('Array');
      localStorage.setItem('Array', JSON.stringify("A"));
      this.router.navigate(['home']);
      this.appserv.showNavbar();
    }
    else {
      alert("مستعمل غير مسجل");
    }   
  }
  else alert("الرجاء التثبة من كلمة السر او رقم البطاقة");
}

}
