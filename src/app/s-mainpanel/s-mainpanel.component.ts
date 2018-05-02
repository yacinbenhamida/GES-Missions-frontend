import { Component, OnInit } from '@angular/core';
import { Pays } from '../model/pays';
import { PaysService } from '../model/pays.service';
import { ReportService } from '../model/reporting.service';
import { Mission } from '../model/mission';
import { Departement } from '../model/departement';
import { DatePipe, NgFor } from '@angular/common';
import { OrdreMission } from '../model/ordremission';
import { AvoirFraisService } from '../model/avoirfrais.service';
import { ConcerneServices } from '../model/concerne.service';
import { BehaviorSubject } from 'rxjs';
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
  deball:Date;
  finall:Date;
  currentDep:Departement = JSON.parse(localStorage.getItem('org'));
  // distribution missions par pays
  listPays:Pays[] = [];
  selectedPays:Pays = new Pays();
  missionsres:OrdreMission[] = []
  mismissionres2:OrdreMission[] = [];
  totaljours:number = 0;
  totalmiss:number = 0;
  totaltransport:number = 0;
  totaldivers : number = 0;
  destinations:string = ' ';

  constructor(public paysserv:PaysService,public reportService:ReportService,public fraisServ:AvoirFraisService
    ,public cserv:ConcerneServices) {
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
      case "S" : return "مصادق عليه من قبل سلطة الإشراف";
      default : return "في الإنتضار";
    }
  }
  showCountries(){
    
    if(this.deb!=null && this.fin !=null && this.selectedPays !=null
       && this.deb!=undefined && this.fin !=undefined && this.selectedPays !=undefined){   
      if(!this.isEmpty(this.missionsres) && !this.isEmpty(this.missionsres[0].avoirfrais)){
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
    this.totaljours = 0;
    this.totalmiss  = 0;
    this.totaltransport = 0;
    this.totaldivers = 0;
    this.missionsres.forEach(element => {
      element.concerne = [];
      element.concerne.length = 0;
      element.avoirfrais = [];
      element.avoirfrais.length = 0;
    });
    this.missionsres = [];
    this.missionsres.length =0;
    this.destinations = '';
    popupWin.document.close();  
      }
    
    }else alert('الرجاء التثبت من المعطيات');
  }
  isEmpty(obj){
    return (obj && (Object.keys(obj).length === 0));
  }
  chCountry(){
    if(this.deb!=null && this.fin !=null && this.selectedPays !=null
      && this.deb!=undefined && this.fin !=undefined && this.selectedPays !=undefined){ 
    this.reportService.getMissionsBTDAC(this.selectedPays,this.deb,this.fin,this.currentDep.codeDep)
      .subscribe(
        data=>{        
          if(this.isEmpty(data)) alert("لا توجد مأموريات في هذا التاريخ أو هذا البلد");
          else{
            
             this.missionsres=data;
             for (let index = 0; index < this.missionsres.length; index++) {
               this.totaljours = this.totaljours + this.convDur(this.missionsres[index].dateDepP,this.missionsres[index].dateArrP);
               this.fraisServ.getAllFraisOfOrdre(this.missionsres[index].idOrdre,this.dep.codeDep)
               .subscribe(x=>{
                 this.missionsres[index].avoirfrais = x;
                 for (let j = 0; j < x.length; j++) {
                  if(x[j].typeFrai.codeTypefr=="0808"){
                    this.totalmiss+=x[j].valeurPrevue;
                  }
                  else if (x[j].typeFrai.codeTypefr=="0606"){
                    this.totaltransport+=x[j].valeurPrevue;
                  }
                  else{
                    this.totaldivers += x[j].valeurPrevue;
                  }
               }              
              });             
             } 
            }
          ;}
        ,error=>alert("لا توجد مأموريات في هذا التاريخ أو هذا البلد")
      );
    }else return;
  }
  print1(){
    if(this.deball!=null && this.finall !=null && this.deball!=undefined && this.finall !=undefined){
      if(!this.isEmpty(this.mismissionres2) && this.mismissionres2[0].avoirfrais.length>0 &&  this.mismissionres2[0].concerne.length>0){

        let printContents, popupWin;
      printContents = document.getElementById('dates-only').innerHTML;
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
    this.totaljours = 0;
    this.totalmiss  = 0;
    this.totaltransport = 0;
    this.totaldivers = 0;
    this.mismissionres2.forEach(element => {
      element.concerne = [];
      element.concerne.length = 0;
      element.avoirfrais = [];
      element.avoirfrais.length = 0;
    });
    this.mismissionres2 = [];
    this.mismissionres2.length =0;
    this.destinations = '';
    popupWin.document.close();  
      }
    }else alert('الرجاء التثبت من المعطيات');
  }
  dep:Departement = JSON.parse(localStorage.getItem('org'));
  chDate(){
    if(this.deball && this.finall){
      this.reportService.getMissionsBTDA(this.deball,this.finall,this.currentDep.codeDep).subscribe(
        data=>{        
          if(this.isEmpty(data)) alert("لا توجد مأموريات في هذا التاريخ ");
          else{
             this.mismissionres2=data;
             for (let index = 0; index < data.length; index++) {
               this.totaljours = this.totaljours + this.convDur(data[index].dateDepP,data[index].dateArrP);
               this.fraisServ.getAllFraisOfOrdre(data[index].idOrdre,this.dep.codeDep)
               .subscribe(x=>{ 

                data[index].avoirfrais = x;
                 for (let j = 0; j < x.length; j++) {
                  if(x[j].typeFrai.codeTypefr=="0808"){
                    this.totalmiss+=x[j].valeurPrevue;
                  }
                  else if (x[j].typeFrai.codeTypefr=="0606"){
                    this.totaltransport+=x[j].valeurPrevue;
                  }else if(x[j].typeFrai.codeTypefr!="0606" && x[j].typeFrai.codeTypefr!="0808"){
                    this.totaldivers += x[j].valeurPrevue;
                  }
               }

               
              });
              this.cserv.getAllConcerneOfORDRE(data[index].idOrdre,data[index].mission.departement.codeDep).subscribe(
                a=>{
                  this.mismissionres2[index].concerne = a;
                  a.forEach(dest => {
                    if(a.length<=1){
                      this.destinations = dest.pays.libPaysAr;
                    }else  this.destinations += dest.pays.libPaysAr + "  -  ";
                  });
                }
              )
             } 
            }
          ;}
        ,error=>alert("لا توجد مأموريات في هذا التاريخ ")
      );
    }
  }
}
