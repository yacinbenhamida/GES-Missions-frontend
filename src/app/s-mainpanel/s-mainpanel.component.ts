import { Component, OnInit } from '@angular/core';
import { Pays } from '../model/pays';
import { PaysService } from '../model/pays.service';
import { ReportService } from '../model/reporting.service';
import { Mission } from '../model/mission';
import { Departement } from '../model/departement';
import { DatePipe, NgFor } from '@angular/common';
import { OrdreMission } from '../model/ordremission';
@Component({
  selector: 'app-s-mainpanel',
  templateUrl: './s-mainpanel.component.html',
  styleUrls: ['./s-mainpanel.component.css']
})
export class SMainpanelComponent implements OnInit {
  missdep:boolean = false;
  distrpays:boolean = false;
  bilan:boolean = false;
  deb:Date;
  fin:Date;
  currentDep:Departement = JSON.parse(localStorage.getItem('org'));
  // distribution missions par pays
  listPays:Pays[] = [];
  selectedPays:Pays = new Pays();
  missionsres:OrdreMission[] = [];
  constructor(public paysserv:PaysService,public reportService:ReportService) {
    paysserv.getAllPays().subscribe(p=>this.listPays=p);
   }

  ngOnInit() {
  }
  convDur(d1:Date,d2:Date){
    let diff =  Math.abs(new Date(d2).getTime() - new Date(d1).getTime());
    return Math.ceil(diff / (1000 * 3600 * 24));
  }
  toggleMissDep(){
     this.missdep = !this.missdep;  
  }
  affichageEtat(x:string){
    switch(x){
      case "E": return "لم تتم المصادقة بعد";
      case "V" : return "مصادق عليه من قبل الآمر بالصرف";
      case "S" : return "مصادق عليه من قبل مراقب المصاريف أو سلطة الإشراف";
      default : return "في الإنتضار";
    }
  }
  showCountries(){
    if(this.deb!=null && this.fin !=null && this.selectedPays !=null
       && this.deb!=undefined && this.fin !=undefined && this.selectedPays !=undefined  ){
      this.reportService.getMissionsBTDAC(this.selectedPays,this.deb,this.fin,this.currentDep.codeDep).subscribe(
        data=>{        
          if(this.isEmpty(data)) alert("لا توجد مأموريات في هذا التاريخ أو هذا البلد");
          else{
             this.missionsres=data; 
            }
          ;}
        ,error=>alert("لا توجد مأموريات في هذا التاريخ أو هذا البلد")
      );
      if(!this.isEmpty(this.missionsres)){
        let printContents, popupWin;
      printContents = document.getElementById('print-section').innerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
       popupWin.document.open()
      popupWin.document.write(`
      <html dir="rtl" lang="ar" >
        <head>
          <meta charset="utf-8">
          <link rel="stylesheet" href="../../styles.css">
          <style>
          table,td,th,tr {
            margin-right:50px;
            border: 1px solid black;
            border-collapse: collapse;
            text-align:center;
        }
          </style>
        </head>
    <body onload="window.print();window.close()">
    `+printContents+`   
    </body>
      </html>
        `
    );
    popupWin.document.close();
      }
    }else alert('الرجاء التثبت من المعطيات');
  }
  isEmpty(obj){
    return (obj && (Object.keys(obj).length === 0));
  }
}
