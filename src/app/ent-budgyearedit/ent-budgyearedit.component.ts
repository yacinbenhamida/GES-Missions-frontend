import { Component, OnInit } from '@angular/core';
import { AvoirBudgProg } from '../model/AvoirBudgProg';
import { BudgetService } from '../model/Budget.service';
import { ProjetService } from '../model/projet.service';
import { Projet } from '../model/projets';
import { Departement } from '../model/departement';
import { NgForm } from '@angular/forms';
import { MajBudgDep } from '../model/MajBudgDepts';
import { AvoirBudgDep } from '../model/AvoirBudgDep';
import { Utilisateur } from '../model/utilisateur';

@Component({
  selector: 'app-ent-budgyearedit',
  templateUrl: './ent-budgyearedit.component.html',
  styleUrls: ['./ent-budgyearedit.component.css']
})
export class EntBudgyeareditComponent implements OnInit {
  signetransp:string;
  signemiss:string;
  budget:AvoirBudgDep;
  d:Date = new Date();
  departement:Departement;
   year:number;
   addbudgmiss:boolean;
   projets:Projet[];
   listvisible:boolean;
   budgets:MajBudgDep[];
    u:Utilisateur;
    canEnterBudg:boolean = true;
  constructor(public budgserv:BudgetService,public projserv:ProjetService) {
    this.budgets = [];
    this.projets = [];

   }

  ngOnInit() {
    this.u = JSON.parse(localStorage.getItem('user'));
    this.listvisible = true;
    this.budget = new AvoirBudgDep();
    this.year = this.d.getFullYear();
    this.addbudgmiss = true;
    this.departement = JSON.parse(localStorage.getItem('org'));
    this.projserv.getProjectsOfDepartment(this.departement.codeDep).subscribe(data=>this.projets = data);
    this.budgserv.getAllBudgDepMajOfUser(this.u.codeUtilisateur,this.departement.codeDep).subscribe(budg=>{
      this.budgets = budg;
      if(this.budgets.length > 1 || this.budgets[0].etat == "S"){
        this.canEnterBudg = true;
      }
      else this.canEnterBudg = false;
    });
    
  }
  msg(){
    if(this.canEnterBudg == false){
      alert("في انتضار موافقة سلطة الاشراف");
    }
  }
  isEmpty(obj){
    return (obj && (Object.keys(obj).length === 0));
  }
  toggleAddBudgMiss(){
    this.addbudgmiss = ! this.addbudgmiss;
  }
  onSubmit(f:NgForm){
    if(this.signemiss == "-"){
      this.budget.montantBudgMission = -this.budget.montantBudgMission;
    }
    if (this.signetransp == "-"){
      this.budget.montantBudgTransport = -this.budget.montantBudgTransport;
    }
    this.budget.departement = this.departement;
    this.budget.dateBudg = this.d;
    this.budget.anneeAttr = this.year;
    this.budgserv.updateBudgDep(this.budget).then((data)=>this.budgets.push(data));
  }
  toggleList(){
    this.listvisible = ! this.listvisible;
  }
  saveEdition(u:MajBudgDep){
    if(confirm("هل انت متأكد من تثبيت هذا التغيير  ?")){
    this.budgserv.saveBudgDepMaj(u.idMajBdugDep).subscribe(()=>null);
    this.budgets = this.budgets.filter(h=>h!==u);}
  }
  delEdition(u:MajBudgDep){
    if(confirm("هل انت متأكد من إزالة هذا التغيير ?")){
    this.budgserv.cancelBudgDepMaj(u.idMajBdugDep).subscribe(()=>null);
    this.budgets = this.budgets.filter(h=>h!==u);}
  }

  convertEtat(e:string){
    switch(e){
      case "O": return "في انتضار موافقة مراقب المصاريف او سلطة الإشراف";
      case "N" :  return "غير مثبت";
      case "S" : return "مصادق عليه";
    }
  }
  verifEtatN(u:MajBudgDep){
    if(u.etat == "N"){ return false;}
    else if(u.etat=="O" || u.etat == "S"){return true;}
  }
}
