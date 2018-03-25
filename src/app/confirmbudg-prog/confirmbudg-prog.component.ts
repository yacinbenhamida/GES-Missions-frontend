import { Component, OnInit } from '@angular/core';
import { MajBudgProg } from '../model/MajBudgProg';
import { BudgetService } from '../model/Budget.service';
import { Departement } from '../model/departement';

@Component({
  selector: 'app-confirmbudg-prog',
  templateUrl: './confirmbudg-prog.component.html',
  styleUrls: ['./confirmbudg-prog.component.css']
})
export class ConfirmbudgProgComponent implements OnInit {
  majbudgprog:MajBudgProg[];
  d:Date = new Date();
  year:number;
  listvisible:boolean;
  currentMinistere:Departement;
  codeUser:string;
  constructor(public budgserv:BudgetService) {
    this.listvisible = true;
    this.year = this.d.getFullYear();
    this.currentMinistere = JSON.parse(localStorage.getItem('org'));
   }

   isEmpty(obj){
    return (obj && (Object.keys(obj).length === 0));
  }
  ngOnInit() {
    this.codeUser = JSON.parse(localStorage.getItem('Array'));
    if (this.codeUser == "OM"){   
    this.budgserv.getAllBudgetProgUpdatesOfdep(this.currentMinistere.codeDep).subscribe(bud=>this.majbudgprog = bud);
    }
    else {

    }
  }
  toggleList(){
    this.listvisible = !this.listvisible;
  }
  confirmUpdate(maj:MajBudgProg){
      if (confirm("? المصادقة على ميزانية هذا  المشروع ")){
        this.budgserv.acceptBudgProgMaj(maj.idmajBudgPrg).subscribe(()=>null);
    }
  }
  abortUpdate(maj:MajBudgProg){
      if(confirm("رفض ميزانية  هذا المشروع ?")){
      this.budgserv.declineBudgProgMaj(maj.idmajBudgPrg).subscribe(()=>null);
    }
  }

  convertEtat(e:string){
    switch(e){
      case "O": return "في انتضار موافقة مراقب المصاريف او سلطة الإشراف";
      case "N" :  return "غير مثبت";
      case "S" : return "مصادق عليه";
    }
  }
}
