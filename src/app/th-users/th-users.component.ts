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
  constructor(public usserv:UtilisateurService
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
    if(this.user.motDePasse == this.confirmPW && f.valid){
      this.userstruct.utilisateur = this.user;
      this.userstruct.departement = this.departement;
      this.usserv.insertUser(this.userstruct).then((b)=>{
        alert("تمة الإضافة");
        this.allusers.push(b.utilisateur);

      });
      f.reset();
    }else alert("الرجاء مراجعة المعطيات ");
      
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
      this.user1 = u;
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
      this.userstructupdate.utilisateur = this.user1;
      this.usserv.updateUser(this.userstructupdate).then(a=>{
        this.toggleModal();
        alert("تم");
      })
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
      case 'ADMIN' : return 'تقني' ;
    }
  }
}
