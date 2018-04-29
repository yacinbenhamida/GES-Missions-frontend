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
import { Popup } from "ng2-opd-popup";
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
  constructor(private popup:Popup,public usserv:UtilisateurService
    ,public depserv:DepartementService,public router:Router,public route:ActivatedRoute) {
  }
   getDeps(){
     this.depserv.getAllDeps().subscribe(
       dept => this.departements = dept
     );

   }

   ngAfterViewInit(){}
departt:Departement;
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
    this.listusers = true;}
  onSubmit(f:NgForm){
      if(this.user.codeProfile=="ordonnateur"){
        this.user.codeProfile = "O";
      }
      else if(this.user.codeProfile=="ordonateurministere"){
        this.user.codeProfile = "OM";
      }
      else if(this.user.codeProfile=="payeur"){
        this.user.codeProfile = "P";
      }
      else if(this.user.codeProfile=="admin"){
        this.user.codeProfile = "ADMIN";
      }
      this.userstruct.utilisateur = this.user;
      this.userstruct.departement = this.departement;
      this.usserv.insertUser(this.userstruct).then(()=>null);
      this.allusers.push(this.user);
  }
  deleteU(u:Utilisateur){
    if(confirm("هل انت متأكد من إزالة هذا المستعمل ?")){
      this.usserv.deleteUser(u).then(()=>{
        this.allusers = this.allusers.filter(h=>h!==u);  });
      }
  }
  showInfosU(u:Utilisateur){
    this.toggleModal();
    this.user1 = u;
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
    this.popup.options = {
      header : "قائمة التعينات",
      widthProsentage: 78,
      color:"#4765a0",
      cancleBtnContent: "خروج"
    }
    this.popup.show();
  }
  affecter(){
    let us:UserStructs = new UserStructs();
    us.utilisateur = this.controlleur;
    us.departement = this.depctrl;
    this.usserv.affectController(us).subscribe(data=>this.lstStruct.push(data));
  }
  deleteUs(u:UserStructs){
    if(confirm("هل انت متأكد من إزالة هذا التعيين ?")){
      this.usserv.deleteUserStruct(u.idUserStruct).then(()=>{
        this.lstStruct = this.lstStruct.filter(h=>h!==u);  });
      }
  }
  updateUser(){
    this.usserv.updateUsers(this.user1).then(x=>null);
    this.toggleModal();
    alert("تم");
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
      case 'P' :  return 'دافع المؤسسة';
      case 'O' : return 'آمر بالصرف';
      case 'OM' : return 'آمر بالصرف لدى الوزارة';
      case 'ADMIN' : return 'تقني' ;
    }
  }
}
