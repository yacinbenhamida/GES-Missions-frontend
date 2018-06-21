import { Component, OnInit } from '@angular/core';
import { AvoirBudgProg } from '../model/AvoirBudgProg';
import { Departement } from '../model/departement';
import { Projet } from '../model/projets';
import { BudgetService } from '../model/Budget.service';
import { ProjetService } from '../model/projet.service';
import { NgForm } from '@angular/forms';
import { MajBudgProg } from '../model/MajBudgProg';
import { Utilisateur } from '../model/utilisateur';

@Component({
  selector: 'app-proj-budgyearedit',
  templateUrl: './proj-budgyearedit.component.html',
  styleUrls: ['./proj-budgyearedit.component.css']
})
export class ProjBudgyeareditComponent implements OnInit {

  budget:AvoirBudgProg;
  d:Date = new Date();
  departement:Departement = JSON.parse(localStorage.getItem('org'));
   year:number;
   addbudgmiss:boolean;
   projets:Projet[] = [];
   budgets:MajBudgProg[];
   listvisible:boolean;
   signe:string;
    u:Utilisateur = JSON.parse(localStorage.getItem('user'));;
    canEdit:boolean = true;
    message = "يجب إدخال على الأقل مشروع كي تتمكن من تحيين اعتماداته"
    user = JSON.parse(localStorage.getItem('Array'));
  constructor(public budgserv:BudgetService,public projserv:ProjetService) {   }

  ngOnInit() {
    this.listvisible = true;
    this.budget = new AvoirBudgProg();
    this.year = this.d.getFullYear();
    this.addbudgmiss = true;
    this.budgserv.getAllBudgProgMajOfUser(this.u.codeUtilisateur,this.departement.codeDep).subscribe(data=>this.budgets = data);
    this.projserv.getProjectsOfDepartment(this.departement.codeDep)
    .subscribe(data=>{
      if(data.length == 0){
        this.canEdit = false;
        alert("يجب إدخال على الأقل مشروع كي تتمكن من تحيين اعتماداته");
      }
      else {
        this.projets = data; 
        this.canEdit = true;
        }
    });
  }

  verifBudgProg(){
    this.budgserv.getBudgOfProg(this.budget.projet.idprojet).subscribe(v=>{
      if(this.isEmpty(v)){
        this.canEdit = false;
        alert("يجب إدخال الإعتمدات الإولية لهذا المشروع كي تتمكن من التحيين");
        this.message = "يجب إدخال الإعتمدات الإولية لهذا المشروع كي تتمكن من التحيين";
      }else{
        this.canEdit = true;
      }
    })
  }

  isEmpty(obj){
    return (obj && (Object.keys(obj).length === 0));
  }
  toggleAddBudgMiss(){
    this.addbudgmiss = ! this.addbudgmiss;
  }
  onSubmit(f:NgForm){
    if(this.signe=="-"){this.budget.montantBudg = -this.budget.montantBudg;}
    this.budget.dateBudg = this.d;
    this.budget.anneeAttr = this.year;
    this.budgserv.updateBudgProg(this.budget).then((data)=>{
      f.reset();
      alert("تمة إضافة مطلب التحيين");
      this.budgets.push(data)
    });
  }
  toggleList(){
    this.listvisible = !this.listvisible;
  }
  saveEdition(u:MajBudgProg){
    if(confirm("هل انت متأكد من تثبيت هذا التغيير  ?")){  
      if(this.user == "O"){
    this.budgserv.saveBudgProgMaj(u.idmajBudgPrg).subscribe(()=>null);
    alert("تم تسجيل المطلب");
      u.etat = "O";}

    else if(this.user =="OM"){
      this.budgserv.acceptBudgProgMaj(u.idmajBudgPrg).subscribe(()=>null);
      alert("تم تسجيل المطلب");
      u.etat = "S";
    }
  }
  }
  delEdition(u:MajBudgProg){
    if(confirm("هل انت متأكد من إلغاء هذا التغيير  ?")){  
      this.budgserv.cancelBudgProgMaj(u.idmajBudgPrg).subscribe(()=>null);
        this.budgets = this.budgets.filter(h=>h!==u);}
  }

  verifEtatN(u:MajBudgProg){
    if(u.etat == "N"){ return false;}
    else if(u.etat=="O"){return true;}
  }
  convertText(u:string):string{
    switch(u){
      case "O": return "في انتضار موافقة سلطة الإشراف";
      case "N" :  return "غير مثبت";
      case "S" : return "مصادق عليه";
      case "R" : return "وقع رفضه";
    }
  }
}
