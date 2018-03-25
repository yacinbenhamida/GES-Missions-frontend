import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../model/utilisateur';
import { Route, Router, ActivatedRoute, Params } from '@angular/router';
import { UtilisateurService } from '../model/utilisateur.service';
import { NgForm } from '@angular/forms';
import { UserStructs } from '../model/userstructs';
import { Departement } from '../model/departement';
import { DepartementService } from '../model/departement.service';

@Component({
  selector: 'app-th-user-edit',
  templateUrl: './th-user-edit.component.html',
  styleUrls: ['./th-user-edit.component.css']
})
export class ThUserEditComponent implements OnInit {
  user:Utilisateur;
  ustruct:UserStructs;
  departement:Departement;
  departements:Departement[];
  codeProfile:string;
  constructor(public depServ:DepartementService,public route:ActivatedRoute,public router:Router,public usServ:UtilisateurService) { 
    this.route.params.switchMap((params:Params)=>this.usServ.getUser(+params['id'])).
    subscribe(th=>this.user = th);
    depServ.getAllDeps().subscribe(data => this.departements = data);
   
  }

  ngOnInit() {
    this.ustruct = new UserStructs();
    this.user = new Utilisateur();
    this.user.codeProfile = '';
    this.departement = new Departement();
  }
  confirmer(){
    this.router.navigate(['th-users']);
    }
    OnSubmit(f:NgForm){
      console.log(this.user);
      console.log(this.codeProfile);
      if(this.user.codeProfile == "ordonnateur"){
        this.user.codeProfile = "O";
      }
       else if(this.user.codeProfile == "controlleur"){
        this.user.codeProfile = "C";
      }
      else if(this.user.codeProfile == "ordonateurministere"){
        this.user.codeProfile = "OM";
      }
      else if(this.user.codeProfile == "payeur"){
        this.user.codeProfile = "P";
      }
      else if(this.user.codeProfile == "admin"){
        this.user.codeProfile = "ADMIN";
      }
      console.log(this.user);
      console.log(this.codeProfile);
      this.ustruct.departement = this.departement;
      this.ustruct.utilisateur = this.user;
      this.usServ.updateUser(this.ustruct).then(()=>null);
      alert("màj");
      this.router.navigate(['th-users']);
    }

}
