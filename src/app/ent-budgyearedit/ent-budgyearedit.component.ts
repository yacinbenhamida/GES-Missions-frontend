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
    canEnterBudg:boolean = false;
    message : string = "في انتضار موافقة سلطة الاشراف";
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
      if(!this.isEmpty(budg)){
        this.budgets = budg;
      this.budgets.forEach(element => {

        if(this.budgets.length >= 1 && element.etat == "S"){
          this.canEnterBudg = true;
        }
        else if(this.budgets.length == 1 && element.etat == "N"){
          this.canEnterBudg = false;
          this.message = "لا تستطيع تحيين مصاريف الهيكل إلا بعد المصادقة ";
        }
      });
      }
      else {
        this.budgets = [];
        this.canEnterBudg = false;
        this.message = "يجب إدخال الإعتمادات الأولية قبل تحيينها";
      }
      /*if(this.budgets.length > 1 || this.budgets[0].etat == "S"){
        this.canEnterBudg = true;
      }
      else this.canEnterBudg = false;*/
    },error=>{
      this.budgets = [];
      this.canEnterBudg = false;
      this.message = "يجب إدخال الإعتمادات الأولية قبل تحيينها";
    });
    
  }
  msg(){
    if(this.canEnterBudg == false){
      alert(this.message);
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
    this.budgserv.saveBudgDepMaj(u.idMajBdugDep).subscribe(
      (val)=>{
        //this.budgets = this.budgets.filter(h=>h!==u);
        u = val;
      });
  }}
  delEdition(u:MajBudgDep){
    if(confirm("هل انت متأكد من إزالة هذا التغيير ?")){
    this.budgserv.cancelBudgDepMaj(u.idMajBdugDep).subscribe(x=>{
      this.budgets = this.budgets.filter(h=>h!==u);
    });
    }
  }

  convertEtat(e:string){
    switch(e){
      case "O": return "في انتضار موافقة  سلطة الإشراف";
      case "N" :  return "غير مثبت";
      case "S" : return "مصادق عليه";
    }
  }
  verifEtatN(u:MajBudgDep){
    if(u.etat == "N"){ return false;}
    else if(u.etat=="O" || u.etat == "S"){return true;}
  }
}
