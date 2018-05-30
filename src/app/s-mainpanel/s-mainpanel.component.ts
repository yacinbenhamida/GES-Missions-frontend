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
import { BudgetService } from '../model/Budget.service';
import { OrdreMissionService } from '../model/ordremission.service';
import { AvoirFrais } from '../model/avoirfrais';
import { Results } from '../model/Results';
import { google, Marker } from '@agm/core/services/google-maps-types';
import { Projet } from '../model/projets';
import { ProjetService } from '../model/projet.service';
import { AvoirBudgProg } from '../model/AvoirBudgProg';
import { isRegExp } from 'util';
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
  anneesAdministratives:number[] = [];
  choosenyear:number = 0;

  choosenproj:Projet = new Projet();
  lstProj:Projet[] = [];
  valbudgprojobt:number =0;
  valbudgprojpromis:number = 0;
  lineChartData:Array<any> = [{data : null , label : "الإعتمادات المستهلكة"},{data : null, label:"الإعتمادات المرصودة"}];
  loaded:boolean = false;
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public barChartLabels:string[] =  []; 
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartData:any[] = [{data : null , label : "اعتمادات المخصصة للمأمورية الاولية (د.ت )"},{data : null, label:"اعتمادات المخصصة للمأمورية المستهلكة (د.ت)"}];
  public barChartData2:any[] = [{data : null , label : "اعتمادات المخصصة للنقل الاولية (د.ت )"},{data : null, label:"اعتمادات المخصصة للنقل المستهلكة (د.ت)"}]
  // doghnut shcema impl 
  distributionPays:Results[] =[];
  d:Date = new Date();
  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';

  // google maps 

  title: string = 'توزيع المأموريات بالبلدان';
  markers:marker[] =  [ ];
  constructor(public paysserv:PaysService,public reportService:ReportService,public fraisServ:AvoirFraisService
    ,public cserv:ConcerneServices,public budgserv:BudgetService,public ordmserv:OrdreMissionService
    ,public concerneServ:ConcerneServices,public projserv:ProjetService) {
    paysserv.getAllPays().subscribe(p=>{if(!this.isEmpty(p))this.listPays=p});
    reportService.getCountPaysMissions(this.dep.codeDep,this.d.getFullYear()).subscribe(dist=>{
      if(!this.isEmpty(dist)){
      this.distributionPays = dist;
      dist.forEach(element => {
        this.doughnutChartLabels.push(element.nomPays + " ( عدد المأموريات ) ");
        this.doughnutChartData.push(element.valueP);
        reportService.getGeocoding(element.nomPays).then(v=>{
          this.markers.push({
            lat:v.results[0].geometry.location.lat,
            lng:v.results[0].geometry.location.lng,
            label:v.results[0].address_components.long_name,
            draggable:false
          })
        })
      });
    }
  })
    reportService.getYears(this.currentDep.codeDep).subscribe(a=>
      { if(!this.isEmpty(a)){
        //this.barChartLabels.push(a+"");
        this.anneesAdministratives =a
        let i = [];
        let j =[];
        let g = [];
        let ke = [];
        let yr = [];
        a.forEach(element => {
          budgserv.getSommeBudgMissionObtenus(this.dep.codeDep,element).subscribe(d=>{
            fraisServ.getFraisMissionPromis(this.dep.codeDep,element).subscribe(e=>{
               i.push(d);
               j.push(e);
               yr.push(element);
            })
              budgserv.getSommeBudgTransportObtenus(this.dep.codeDep,element).subscribe(c=>{
                fraisServ.getFraisTransportPromis(this.dep.codeDep,element).subscribe(k=>{
                  g.push(c);
                  ke.push(k);
                })
              });
          });
          this.barChartData[0].data = i;
          this.barChartData[1].data = j;
          this.barChartData2[0].data = g;
          this.barChartData2[1].data = ke;
          this.barChartLabels = yr;

        });
        
      }
    });
      projserv.getProjectsOfDepartment(this.dep.codeDep).subscribe(proj=>{
        this.lstProj = proj;
      })

   }

  ngOnInit() {
    
    this.budgserv.allBudgProgOfDEP(this.dep.codeDep,this.d.getFullYear()).subscribe(a=>{
      let d = [];
      let b = [];
      if(!this.isEmpty(a)){
      a.forEach(element => {
        this.fraisServ.getSommeBudgetPECprojet(this.dep.codeDep,this.d.getFullYear(),element.projet.idprojet).subscribe(x=>{
          if(!this.isEmpty(x)){
            this.lineChartLabels.push(element.projet.libProjAr);
            d.push(x);
            b.push(element.montantBudg);
         }
        })
        this.lineChartData[0].data = d;
        this.lineChartData[1].data = b;
      });
      this.loaded = true;
    }}
  )
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
      case "PA" : return "مصادق عليه من قبل المحاسب";
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
  fraisMObt:number = 0;
  fraisMConsom:number = 0;
  fraisTObt:number = 0;
  fraisTConsom:number = 0;
  lstOrdres:OrdreMission[] =[];
  totalMission:number = 0;
  totalAutres:number = 0;
  totalTransport:number = 0;
  bilanDepenses(){
    if(!this.isEmpty(this.lstOrdres)){
    this.fraisMObt = 0;
    this.fraisMConsom = 0;
    this.fraisTObt = 0;
    this.fraisTConsom = 0;
    this.budgserv.getSommeBudgMissionObtenus(this.dep.codeDep,this.choosenyear).subscribe(
      a=>{
        this.fraisMObt=a;
        this.budgserv.getSommeBudgTransportObtenus(this.dep.codeDep,this.choosenyear).subscribe(
          k=>{
            this.fraisTObt=k;
            this.fraisServ.getFraisMissionPromis(this.dep.codeDep,this.choosenyear).subscribe(
              fa=>{
                this.fraisMConsom=fa;
                this.fraisServ.getFraisTransportPromis(this.dep.codeDep,this.choosenyear).subscribe(
                  ab=>{
                    this.fraisTConsom=ab;
                    let printContents, popupWin;
                                      printContents = document.getElementById('bilan').innerHTML;
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
                );
              }
            );
          
          }
        );
        }
    ); 
  } else alert("لم تسجل مأموريات في هذه السنة الإدارية");
  }

  chYear(){
    this.totalAutres = 0;
    this.totalMission = 0;
    this.totalTransport = 0;
    if(this.choosenyear){
      this.lstOrdres = [];
      this.ordmserv.getOrdresValides(this.dep.codeDep).subscribe(
        data=>{
          this.lstOrdres = data;
          let x:number = 0;
          this.lstOrdres.forEach(element => {
            this.concerneServ.getAllConcerneOfORDRE(element.idOrdre,this.dep.codeDep).subscribe(
              e=>{
                element.concerne = e;         
                this.fraisServ.getAllFraisOfOrdre(element.idOrdre,this.dep.codeDep).subscribe(
                  pp=>{
                    element.avoirfrais = pp;
                       pp.forEach(element => {
                         if(element.typeFrai.codeTypefr=="0808") this.totalMission +=element.valeurPrevue;
                         else if(element.typeFrai.codeTypefr!="0808" && element.typeFrai.codeTypefr!="0606") this.totalAutres +=element.valeurPrevue;
                         else if(element.typeFrai.codeTypefr=="0606") this.totalTransport +=element.valeurPrevue;
                        });                 
                  }
                )                      
              }
            )
          });
        }
    )
    }
    
  }
  


  getFraisMission(val:AvoirFrais[]):number{
    let sum = 0;
    if(val!=undefined){
      val.forEach(element => {
        if(element.typeFrai.codeTypefr=="0808") sum+=element.valeurPrevue; 
      });   
    }
    return sum;
  }
  getFraisDivers(val:AvoirFrais[]):number{
    let sum = 0;
    if(val!=undefined){
      val.forEach(element => {
        if(element.typeFrai.codeTypefr!="0606" && element.typeFrai.codeTypefr!="0808") sum+=element.valeurPrevue; 
      });   
    }
    return sum;
  }
  getTotal(val:AvoirFrais[]):number{
    let sum = 0;
    if(val!=undefined){
      val.forEach(element => {
        if(element.typeFrai.codeTypefr!="0606") sum+=element.valeurPrevue; 
      });   
    }
    return sum;
  }
  getFraisTransp(val:AvoirFrais[]):number{
    let sum = 0;
    if(val!=undefined){
      val.forEach(element => {
        if(element.typeFrai.codeTypefr=="0606") sum+=element.valeurPrevue; 
      });   
    }
    return sum;
  }


  fetchProj(){
    this.budgserv.getBudgOfProg(this.choosenproj.idprojet).subscribe(v=>{
        this.fraisServ.getSommeBudgetPECprojet(this.dep.codeDep,this.d.getFullYear(),this.choosenproj.idprojet).subscribe(b=>{
          if(v && b && v!=undefined && b!=undefined){
            this.lineChartLabels.push(2018);  
            this.valbudgprojpromis = b;
              let budg:AvoirBudgProg = v;
  
              this.lineChartData = [
                {data : [budg.montantBudg],label : 'الإعتمادات المرصودة'},
                {data : [b] , label : 'الإعتمادات المستهلكة'}
              ]
          }
        },error=>{
          this.valbudgprojpromis = 0;
          this.lineChartLabels = [];
          this.lineChartData = [];}
        )
    },error=>{
      this.valbudgprojpromis = 0;
      this.lineChartLabels = [];
      this.lineChartData = [];
    })
  }
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}