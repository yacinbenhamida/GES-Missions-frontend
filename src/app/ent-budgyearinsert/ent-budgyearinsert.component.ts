import { Component, OnInit } from '@angular/core';
import { AvoirBudgDep } from '../model/AvoirBudgDep';
import { BudgetService } from '../model/Budget.service';
import { Departement } from '../model/departement';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { MajBudgDep } from '../model/MajBudgDepts';
import { Router } from '@angular/router';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';
import { AvoirFraisService } from '../model/avoirfrais.service';
@Component({
  selector: 'app-ent-budgyearinsert',
  templateUrl: './ent-budgyearinsert.component.html',
  styleUrls: ['./ent-budgyearinsert.component.css']
})
export class EntBudgyearinsertComponent implements OnInit {
  budget:AvoirBudgDep;
  budgets:AvoirBudgDep;
  budgtrans:boolean;
  addbudgmiss:boolean;
   d:Date = new Date();
   year:number;
  listvisible:boolean;
  listvisible2:boolean;
  dp:Departement;
  modif : boolean = false;
  canEdit:boolean = true;
  verifMaj:MajBudgDep[];
  budgdisplayed:AvoirBudgDep;
  initialRessources : AvoirBudgDep;
  isFirstelem:boolean = false;
  isApproved:boolean = false;
  valbudgobtmissions:number = 0;
  valbudgobtTransport : number =0;
  valbudgpromisTransport:number = 0;
  valbudgpromisMission:number = 0;
  constructor(public budgserv:BudgetService,public fraisServ:AvoirFraisService) {
    this.budgets = new AvoirBudgDep();  
    this.listvisible2 = true;
    this.verifMaj = [];
    this.budgdisplayed = new AvoirBudgDep();
    this.initialRessources = new AvoirBudgDep();
   }

  ngOnInit() {
    this.dp = JSON.parse(localStorage.getItem('org'));
    this.budgserv.getBudgDep(this.dp.codeDep,this.d.getFullYear()).subscribe(data=>this.budgets=data);
    this.budget = new AvoirBudgDep();
    this.budgtrans = true;
    this.addbudgmiss = true;
    this.listvisible = true;
    this.year = this.d.getFullYear();
   
    this.budgserv.verifyIfThereisnoBudgetsDep(this.dp.codeDep).subscribe(data=>{
      this.verifMaj = data;
      if(this.verifMaj.length>1 && this.verifMaj[0].etat=="R"){
         this.canEdit = true;
        this.budget.montantBudgMission = this.verifMaj[0].valeurBudgMission;
        this.budget.montantBudgTransport = this.verifMaj[0].valeurBudgTransport;
        this.budget.refBudgMission = this.verifMaj[0].refBudgMission;
        this.budget.refBudgTransport = this.verifMaj[0].refBudgTransport;
      }
      else if(this.verifMaj.length == 1 && this.verifMaj[0].etat=="N"){
        this.canEdit = true;
        this.budget.montantBudgMission = this.verifMaj[0].valeurBudgMission;
        this.budget.montantBudgTransport = this.verifMaj[0].valeurBudgTransport;
        this.budget.refBudgMission = this.verifMaj[0].refBudgMission;
        this.budget.refBudgTransport = this.verifMaj[0].refBudgTransport;
        this.budget.idBudgDep = this.verifMaj[0].budget.idBudgDep;
        this.budget.dateBudg = this.verifMaj[0].budget.dateBudg;
        this.budget.anneeAttr = this.year;
      }
      else if(this.verifMaj.length == 1 && this.verifMaj[0].etat=="S"){
        this.isApproved = true;
        this.canEdit =false;
        this.budget.montantBudgMission = this.verifMaj[0].valeurBudgMission;
        this.budget.montantBudgTransport = this.verifMaj[0].valeurBudgTransport;
        this.budget.refBudgMission = this.verifMaj[0].refBudgMission;
        this.budget.refBudgTransport = this.verifMaj[0].refBudgTransport;
        this.budget.idBudgDep = this.verifMaj[0].budget.idBudgDep;
        this.budget.dateBudg = this.verifMaj[0].budget.dateBudg;
        this.budget.anneeAttr = this.year;
        this.isApproved =true;
        this.budgserv.getBudgDep(this.dp.codeDep,this.year).subscribe(d=>this.initialRessources=d);
      }
      else if (this.verifMaj.length == 1 && this.verifMaj[0].etat=="O"){
          this.isFirstelem = true;
          this.canEdit = false;
          this.budget.montantBudgMission = this.verifMaj[0].valeurBudgMission;
        this.budget.montantBudgTransport = this.verifMaj[0].valeurBudgTransport;
        this.budget.refBudgMission = this.verifMaj[0].refBudgMission;
        this.budget.refBudgTransport = this.verifMaj[0].refBudgTransport;
        this.budget.idBudgDep = this.verifMaj[0].budget.idBudgDep;
        this.budget.dateBudg = this.verifMaj[0].budget.dateBudg;
        this.budget.anneeAttr = this.year;
      }
      else if(this.verifMaj.length > 1 && (this.verifMaj[0].etat=="S" || this.verifMaj[1].etat=="S")){
        this.isApproved = true;
        this.canEdit = false;
        this.budget.montantBudgMission = this.verifMaj[0].valeurBudgMission;
        this.budget.montantBudgTransport = this.verifMaj[0].valeurBudgTransport;
        this.budget.refBudgMission = this.verifMaj[0].refBudgMission;
        this.budget.refBudgTransport = this.verifMaj[0].refBudgTransport;
        this.budget.idBudgDep = this.verifMaj[0].budget.idBudgDep;
        this.budget.dateBudg = this.verifMaj[0].budget.dateBudg;
        this.budget.anneeAttr = this.year;
        this.isApproved =true;
        this.budgserv.getBudgDep(this.dp.codeDep,this.year).subscribe(d=>this.initialRessources=d);
      }
      else if (this.verifMaj.length == 0){
        this.canEdit = true;
        this.isApproved = false;
        this.isFirstelem = false;
      }
    });
    this.budgserv.getSommeBudgMissionObtenus(this.dp.codeDep,this.year)
    .subscribe(val=>this.valbudgobtmissions=val,error=>this.valbudgobtmissions=0);

    this.budgserv.getSommeBudgTransportObtenus(this.dp.codeDep,this.year)
    .subscribe(x=>{this.valbudgobtTransport=x});

    this.fraisServ.getFraisMissionPromis(this.dp.codeDep,this.year)
    .subscribe(val=>this.valbudgpromisMission=val,error=>this.valbudgpromisMission=0);

    this.fraisServ.getFraisTransportPromis(this.dp.codeDep,this.year).subscribe(
      a=>{this.valbudgpromisMission = a}
    )  
  
  }
  isEmpty(obj){
    return (obj && (Object.keys(obj).length === 0));
  }
  toggleAddBudgMiss(){
    this.addbudgmiss = ! this.addbudgmiss;
  }
  toggleTrans(){
    this.budgtrans = ! this.budgtrans;
  }
  toggleList(){
    this.listvisible = ! this.listvisible;
  }
  toggleList2(){
    this.listvisible2 = !this.listvisible2;
  }
  msg(){
    if(this.canEdit == false && this.isFirstelem == true){ alert("في انتضار مصادقة المراقب او سلطة الإشراف");}
    if(this.canEdit == false && this.isApproved == true){ alert("لا يمكن تغيير ميزانية وقعت المصادقة عليها");}
  
    
  }
  onSubmit(){
    this.budget.anneeAttr = this.year;
    this.budget.dateBudg = this.d;
    this.budget.departement = this.dp;
    this.budgserv.insertBudgDep(this.budget).subscribe(()=>null);
    alert("done");
  }

  modify(){
    this.budget.departement = this.dp;
    this.budgserv.updateInitialDdeNBudgDep(this.budget).then((a)=>
    {this.budgserv.getBudgDep(this.dp.codeDep,this.year).subscribe(d=>this.initialRessources=d);});    
  }
 
}
