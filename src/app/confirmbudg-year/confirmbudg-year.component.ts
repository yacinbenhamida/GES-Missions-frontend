import { Component, OnInit } from '@angular/core';
import { DepartementService } from '../model/departement.service';
import { Departement } from '../model/departement';
import { MajBudgDep } from '../model/MajBudgDepts';
import { BudgetService } from '../model/Budget.service';
import { MajBudgProg } from '../model/MajBudgProg';

@Component({
  selector: 'app-confirmbudg-year',
  templateUrl: './confirmbudg-year.component.html',
  styleUrls: ['./confirmbudg-year.component.css']
})
export class ConfirmbudgYearComponent implements OnInit {
  departements:Departement[];
  listvisible:boolean;
  majbudgdep:MajBudgDep[] = [];
  d:Date;
  year:number;
  userdep:Departement;
  selecteddepartement:Departement;
  typeuser:string;
  majbudgprog:MajBudgProg[] = [];
  listproj:boolean = true;
  constructor(public depserv:DepartementService,public budgserv:BudgetService) { 
    
    this.typeuser = JSON.parse(localStorage.getItem("Array"));
    this.listvisible = true;
    this.d = new Date();
    this.selecteddepartement = new Departement();
    this.year = this.d.getFullYear();
    this.userdep = JSON.parse(localStorage.getItem('org'));
    depserv.getAllOrgsFromOfcurrentm(this.userdep.codeDep).subscribe(data=>this.departements = data);  
  }
  isEmpty(obj){
    return (obj && (Object.keys(obj).length === 0));
  }
  ngOnInit() {
  }
  toggleList(){
    this.listvisible = !this.listvisible;
  }

  toggleListproj(){
    this.listproj = !this.listproj;
  }
  confirmUpdate(maj:MajBudgDep){
    if (confirm("? المصادقة على ميزانية هذه المؤسسة ")){
      this.budgserv.acceptBudgProgDep(maj.idMajBdugDep).subscribe(
        ()=>
        {this.majbudgdep = this.majbudgdep.filter(h=>h!==maj);} 
      );
  }
}
  abortUpdate(maj:MajBudgDep){
    if(confirm("رفض ميزانية  هذه المؤسسة ?")){
    this.budgserv.declineBudgDepMaj(maj.idMajBdugDep).subscribe(()=>
    {this.majbudgdep = this.majbudgdep.filter(h=>h!==maj);});
  }
}
  fetchDepBudgs(){
    this.budgserv.getAllBudgDepMajOfDep(this.selecteddepartement.codeDep).subscribe(data=>this.majbudgdep =data);
    this.budgserv.getAllBudgetProgUpdatesOfdep(this.selecteddepartement.codeDep).subscribe(bud=>this.majbudgprog = bud);
  }

  convertEtat(e:string){
    switch(e){
      case "O": return "في انتضار موافقة مراقب المصاريف او سلطة الإشراف";
      case "N" :  return "غير مثبت";
      case "S" : return "مصادق عليه";
    }
  }

    abortUpdateproj(maj:MajBudgProg){
      if(confirm("رفض ميزانية  هذا المشروع ?")){
        this.budgserv.declineBudgProgMaj(maj.idmajBudgPrg).subscribe(()=>
        {this.majbudgprog = this.majbudgprog.filter(h=>h!==maj);} );      
      }
    }
    confirmUpdateproj(maj:MajBudgProg){
      if (confirm("? المصادقة على ميزانية هذا  المشروع ")){
        this.budgserv.acceptBudgProgMaj(maj.idmajBudgPrg).subscribe(
          ()=>
        {this.majbudgprog = this.majbudgprog.filter(h=>h!==maj);} 
        );
    }
    }
}
