import { Component, OnInit, AfterViewInit,style, state, animate, transition, trigger } from '@angular/core';
import {NgForm} from '@angular/forms';
import {DepartementService} from '../model/departement.service';
import {Departement} from '../model/departement';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Utilisateur } from '../model/utilisateur';
import { UtilisateurService } from '../model/utilisateur.service';
import { UserStructs } from '../model/userstructs';
import {DataTableModule} from "angular2-datatable";
import {FormControl, FormGroup} from '@angular/forms';
import { AES } from 'crypto-ts';

@Component({
  selector: 'app-th-users',
  templateUrl: './th-users.component.html',
  styleUrls: ['./th-users.component.css'],
  providers : [DepartementService]
})
export class ThUsersComponent implements OnInit,AfterViewInit {
  departements:Departement[] = [];
  departement:Departement;
  departementc:Departement[] = [];
  user:Utilisateur;
  userstruct : UserStructs;
  allusers:Utilisateur[] = [];
  nb:number;
  adduserv:boolean;
  listusers:boolean;
  lstStruct:UserStructs[] = [];
  searchString:string;
  nomuser:string;
  controlleur:Utilisateur;
  depctrl:Departement;
  modal:boolean = false;
  user1:Utilisateur = new Utilisateur();
  userstructupdate:UserStructs = new UserStructs();
  // form controls 
  confirmPW:string = "";
  confirmPW2:string = "";
  departt:Departement;
  vcin:boolean = false;
  constructor(public usserv:UtilisateurService
    ,public depserv:DepartementService,public router:Router,public route:ActivatedRoute) {
  }
   getDeps(){
     this.depserv.getAllDeps().subscribe(
       dept => this.departements = dept
     );

   }

   ngAfterViewInit(){}
  ngOnInit() {
    this.controlleur = new Utilisateur();
    this.depserv.getAllDeps().subscribe(
      dept => this.departementc = dept
    );
    this.userstruct = new UserStructs();
    this.departement = new Departement();
    this.user = new Utilisateur();
    this.user.codeProfile="none";
    this.departement = null;
    this.getDeps();
    this.usserv.getUsers().subscribe(
    us=>this.allusers = us);
    this.adduserv = true;
    this.listusers = true;    
  }
  onSubmit(f:NgForm){
    if(this.user.motDePasse == this.confirmPW && f.valid){
      var CryptoTS = require("crypto-ts");
      this.user.motDePasse = AES.encrypt(this.user.motDePasse, 'dergmatok77892777').toString();
      this.userstruct.utilisateur = this.user;
      this.userstruct.departement = this.departement;
      this.usserv.insertUser(this.userstruct).then((b)=>{
        alert("تمة الإضافة");
        this.allusers.push(b.utilisateur);
      });
      f.reset();
    }else alert("الرجاء مراجعة المعطيات ");
      
  }

  decrypt(x:string) : any{
    var CryptoTS = require("crypto-ts");
    var bytes  = CryptoTS.AES.decrypt(x.toString(),'dergmatok77892777');
    var b = bytes.toString(CryptoTS.enc.Utf8);
    return  b;
  }
  deleteU(u:Utilisateur){
    if(confirm("هل انت متأكد من إزالة هذا المستعمل ?")){
      this.usserv.deleteUser(u).then(()=>{
        this.allusers = this.allusers.filter(h=>h!==u);  });
      }
  }
  showInfosU(u:Utilisateur){
    this.usserv.getUsOfUSER(u.codeUtilisateur).subscribe(o=>{
      this.userstructupdate = o;
      this.userstructupdate.utilisateur = u;
      this.userstructupdate.utilisateur.motDePasse = this.decrypt(this.userstructupdate.utilisateur.motDePasse);
      this.toggleModal();
    })
  }
  toggleAddUser(){
    this.adduserv = !(this.adduserv);
  }
  toggleList(){
    this.listusers = !(this.listusers);
  }
  toggleModal(){this.modal = !this.modal;}
  affectations(u:Utilisateur){
    
    this.usserv.getAllUserStructs(u).subscribe(data=>this.lstStruct = data);
    this.nomuser = u.nomAr + " "+ u.nomFr;
    this.controlleur = u;

  }
  deleteUs(u:UserStructs){
    if(confirm("هل انت متأكد من إزالة هذا التعيين ?")){
      this.usserv.deleteUserStruct(u.idUserStruct).then(()=>{
        this.lstStruct = this.lstStruct.filter(h=>h!==u);  });
      }
  }
  updateUser(){
    if(this.userstructupdate.utilisateur.motDePasse == this.confirmPW2){
    var CryptoTS = require("crypto-ts");
    const encryptedMessage = AES.encrypt(this.userstructupdate.utilisateur.motDePasse,'dergmatok77892777').toString();
      this.usserv.updateUser(this.userstructupdate).then(a=>{
        this.toggleModal();
        alert("تم");
      })
    }
    else alert("الرجاء التثبت من كلمة السر");
  } 
  
  exitEdit(){
    this.usserv.getUsers().subscribe(us=>{
      this.allusers = us;
      this.toggleModal();
    }
      );
  }
  convCodeUser(x:string){
    switch(x){
      case 'P' :  return 'محاسب';
      case 'O' : return 'آمر بالصرف';
      case 'OM' : return 'آمر بالصرف لدى الوزارة';
      case 'ADMIN' : return 'مشرف (ADMIN)' ;
    }
  }
  checkcin(event){
    if(this.user.login && event){
       event.length == 8 || this.user.login.toString().length == 8? this.vcin = true : this.vcin = false;
    }else this.vcin = false
}
}
