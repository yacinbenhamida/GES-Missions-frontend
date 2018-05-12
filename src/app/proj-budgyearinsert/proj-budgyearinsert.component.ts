import { Component, OnInit } from '@angular/core';
import { Departement } from '../model/departement';
import { AvoirBudgProg } from '../model/AvoirBudgProg';
import { BudgetService } from '../model/Budget.service';
import { ProjetService } from '../model/projet.service';
import { Projet } from '../model/projets';
import { NgForm } from '@angular/forms';
import { Utilisateur } from '../model/utilisateur';
import { MajBudgProg } from '../model/MajBudgProg';

@Component({
  selector: 'app-proj-budgyearinsert',
  templateUrl: './proj-budgyearinsert.component.html',
  styleUrls: ['./proj-budgyearinsert.component.css']
})
export class ProjBudgyearinsertComponent implements OnInit {
  budget:AvoirBudgProg;
  d:Date = new Date();
  departement:Departement;
   year:number;
   addbudgmiss:boolean;
   projets:Projet[];
   listvisible:boolean;
   controller:Departement;
   u:Utilisateur;
   initalbudget:MajBudgProg;
   initialmodif:MajBudgProg[]; 
   btnModif:boolean = false;
   btnAdd:boolean = true;
   canEdit:boolean = true;
   choosenProject:Projet;
   currentbudgprog:AvoirBudgProg;
   isFirstElem:boolean = false;
   isApproved:boolean = false;
   // budgets : obtenus , pris en charge par le projet choisit
   valubudginitiale:number = 0;
   valbudgpromis:number = 0;
  constructor(public budgserv:BudgetService,public projserv:ProjetService) { 
    this.choosenProject = new Projet();
    this.initalbudget = new MajBudgProg();
    this.initialmodif = [];
    this.currentbudgprog = new AvoirBudgProg();
  }

  ngOnInit() {
    this.listvisible = true;
    this.u = JSON.parse(localStorage.getItem('user'));
    this.departement = JSON.parse(localStorage.getItem('org'));
    this.budget = new AvoirBudgProg();
    this.year = this.d.getFullYear();
    this.addbudgmiss = true;
    this.departement = JSON.parse(localStorage.getItem('org'));
    this.projserv.getProjectsOfDepartment(this.departement.codeDep).subscribe(data=>this.projets = data);
  }

  toggleAddBudgMiss(){
    this.addbudgmiss = ! this.addbudgmiss;
  }
  onSubmit(){
    this.budget.projet = this.choosenProject;
    this.budget.dateBudg = this.d;
    this.budget.anneeAttr = this.year;
    this.budgserv.insertBudgProg(this.budget).subscribe(()=>null);
  }
  isEmpty(obj){
    return (obj && (Object.keys(obj).length === 0));
  }
  verifBudgProg(){
    this.initalbudget = new MajBudgProg();
    this.budget = new AvoirBudgProg();
    this.currentbudgprog = new AvoirBudgProg();
    this.isFirstElem = true;
    this.canEdit = true;
    this.isApproved = true;
    this.valbudgpromis = 0;
    this.budgserv.verifyIfThereisnoBudgets(this.departement.codeDep,this.choosenProject.idprojet)
    .subscribe(data=>{
      this.initialmodif = data;
      if(this.initialmodif.length>1 || this.initialmodif[0].etat=="R"){
        this.initalbudget = this.initialmodif[0];
        this.budget.montantBudg = this.initalbudget.valeurMajBudgProg;
        this.budget.refBudgProg = this.initalbudget.refBudget;
        this.valubudginitiale = this.initalbudget.valeurMajBudgProg;
        this.budget.idbudgProg = this.initalbudget.budgetprojet.idbudgProg;
        this.budgserv.getSommeBudgetPECprojet(this.departement.codeDep,this.d.getFullYear(),this.choosenProject.idprojet)
        .subscribe(v=>{this.valbudgpromis = v});
        this.currentbudgprog.totalBudget = this.initalbudget.valeurMajBudgProg;

      }
      else if(this.initialmodif.length == 1 && this.initialmodif[0].etat=="N"){
        
        this.canEdit = true;
        this.initalbudget = this.initialmodif[0];
        this.budget.montantBudg = this.initalbudget.valeurMajBudgProg;
        this.budget.refBudgProg = this.initalbudget.refBudget;
        this.budget.totalBudget = this.initalbudget.valeurMajBudgProg;
        this.budget.idbudgProg = this.initalbudget.budgetprojet.idbudgProg;
        this.currentbudgprog.totalBudget = this.initalbudget.valeurMajBudgProg;

        this.btnModif = true;
        this.btnAdd = false;
      } else if(this.initialmodif.length ==1 && this.initialmodif[0].etat=="O"){
        this.isFirstElem = true;
        this.canEdit = false;

        this.initalbudget = this.initialmodif[0];
        this.budget.montantBudg = this.initalbudget.valeurMajBudgProg;
        this.budget.refBudgProg = this.initalbudget.refBudget;
        this.budget.totalBudget = this.initalbudget.valeurMajBudgProg;
        this.budget.idbudgProg = this.initalbudget.budgetprojet.idbudgProg;
        this.currentbudgprog.totalBudget = this.initalbudget.valeurMajBudgProg;

      }
      else if(this.initialmodif.length == 1 && this.initialmodif[0].etat=="S"){
        this.isFirstElem = false;
        this.canEdit = false;
        this.isApproved = true;

        this.initalbudget = this.initialmodif[0];
        this.budget.montantBudg = this.initalbudget.valeurMajBudgProg;
        this.budget.refBudgProg = this.initalbudget.refBudget;
        this.budget.totalBudget = this.initalbudget.valeurMajBudgProg;
        this.budget.idbudgProg = this.initalbudget.budgetprojet.idbudgProg;
        this.currentbudgprog.totalBudget = this.initalbudget.valeurMajBudgProg;

      }
      else {
        this.canEdit = false;
      }
      this.budgserv.getBudgOfProg(this.choosenProject.idprojet).subscribe(d=>this.currentbudgprog = d);
    });

    

  }

  msg(){
    if(this.canEdit == false && this.isFirstElem == true){ alert("في انتضار مصادقة المراقب او سلطة الإشراف");}
    if(this.canEdit == false && this.isApproved == true){ alert("لا يمكن تغيير ميزانية وقعت المصادقة عليها");}
  }
  modifDdeBUDGET(){
    this.budget.dateBudg = this.d;
    this.budget.anneeAttr = this.year;
    this.budget.projet = this.choosenProject;
    this.budgserv.updateInitialDdeNBudgProg(this.budget).then((d)=>{this.budgserv.getBudgOfProg(this.choosenProject.idprojet).subscribe(d=>this.currentbudgprog = d);});
    alert("budg modified !");
  }
}
