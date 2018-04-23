import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Mission } from '../model/mission';
import { OrdreMission } from '../model/ordremission';
import { MissionService } from '../model/mission.service';
import { Departement } from '../model/departement';
import { OrdreMissionService } from '../model/ordremission.service';
import { ConcerneServices } from '../model/concerne.service';
import { Concerne } from '../model/concerne';
import { Pays } from '../model/pays';
import { AvoirFrais } from '../model/avoirfrais';
import { AvoirFraisService } from '../model/avoirfrais.service';
import { error } from 'util';
import { Utilisateur } from '../model/utilisateur';
import { BudgetService } from '../model/Budget.service';
@Component({
  selector: 'app-m-confirm-missions',
  templateUrl: './m-confirm-missions.component.html',
  styleUrls: ['./m-confirm-missions.component.css']
})
export class MConfirmMissionsComponent implements OnInit,AfterViewInit {
  missions:boolean = true;
  ordres:boolean = false;
  details:boolean = false;
  ordremisschb:boolean = false;
  searchString:string;
  tabmissions:Mission[] = [];
  tabOrdresMiss:OrdreMission[] = [];
  edmission:boolean = false;
  ordre:boolean = false;
  dep:Departement = JSON.parse(localStorage.getItem('org'));
  // after choosing order 
  choosenord:OrdreMission = new OrdreMission();
  // concerne loaded 
  choosenconcerne:Concerne[] = [];
  fraisaff:AvoirFrais[] = []; 
  avance:number = 0;
  user:string;
  // support frais
  supfraisM:string='';
  supfraisP:string='';
  supfraisT:string='';
  frais:boolean = false;
  valfraisM:number=0;
  valfraisP:number=0;
  valfraisT:number=0;
  valffraisTimbre:number=0;
  valfraisDivers:number = 0;
  d:number = (new Date()).getFullYear();
  // frais departement
  valfraistranspobt:number = 0;
  valfraismissobt:number = 0;
  valfraistransppromis:number = 0;
  valfraismisspromis:number = 0;
  destinations:string = ' ';
  constructor(public missionsService:MissionService,public ordserv:OrdreMissionService,
    public concerneService:ConcerneServices,public concserv:ConcerneServices,public avserv:AvoirFraisService,
  public budgserv:BudgetService) {
    this.user = JSON.parse(localStorage.getItem('Array'));
    missionsService.getAllMissionsOfDep(this.dep.codeDep).subscribe(d=>this.tabmissions=d);
    if(this.user == "O"){
    ordserv.getAllOrdMissionsOfDep(this.dep.codeDep).subscribe(t=>this.tabOrdresMiss=t);
    }else if(this.user=="OM"){
      ordserv.getOrdresValides(this.dep.codeDep).subscribe(t=>this.tabOrdresMiss=t);
      }
     
    }

  ngOnInit() {
    this.choosenord = null;
  }
  ngAfterViewInit(){
    
  }
  affdur(dateArr:Date,dateDep:Date){
    let date1 = new Date(dateArr).getTime();
    let date2 = new Date(dateDep).getTime();
    var diff = Math.abs(date1 - date2);
    return Math.ceil(diff / (1000 * 3600 * 24)) + " يوم ";
  }
  // togglers
  toggleMiss(){
    this.missions = ! this.missions;
  }
  toggleEdMission(){
    this.edmission = !this.edmission;
  }
  // end togglers

  toggleOrdMb(){
    this.ordremisschb = ! this.ordremisschb;
  }
  // end show details
  convDur(d1:Date,d2:Date){
    let diff =  Math.abs(new Date(d2).getTime() - new Date(d1).getTime());
    return Math.ceil(diff / (1000 * 3600 * 24));
  }
  convSupport(x:string){
      if(x=="I") return "ميزانية الهيكل";
      else if(x=="E") return "هيكل اجنبي";
      else if(x=="P") return "الحساب الخاص";
      else if(x=="A") return "مشروع";
      else if (x=="J") return "تحمل مشترك بين الهيكل المعني والهيكل المضيف";
      else if(x=="M") return "تحمل مشترك بين الهيكل المضيف والمشروع";
  }
  loadDetails(){
    this.destinations=' ';
    this.concerneService.getAllConcerneOfORDRE(this.choosenord.idOrdre).subscribe(t=>
      {
        this.choosenconcerne = t;
        this.choosenconcerne.forEach(element => {
          if(this.choosenconcerne.length>1){
            this.destinations += element.pays.libPaysAr+" - ";
          } else  this.destinations = element.pays.libPaysAr;
        });
      });
      this.budgserv.getSommeBudgMissionObtenus(this.choosenord.mission.departement.codeDep,this.d)
     .subscribe(val=>this.valfraismissobt=val,error=>this.valfraismissobt =0);
     this.budgserv.getSommeBudgTransportObtenus(this.choosenord.mission.departement.codeDep,this.d)
     .subscribe(val=>this.valfraistranspobt=val,error=>this.valfraistranspobt =0);
     this.avserv.getFraisMissionPromis(this.choosenord.mission.departement.codeDep,this.d)
     .subscribe(res=>this.valfraismisspromis = res,error=>this.valfraismisspromis =0);
     this.avserv.getFraisTransportPromis(this.choosenord.mission.departement.codeDep,this.d)
     .subscribe(res=>this.valfraistransppromis = res,error=>this.valfraistransppromis =0);
      this.avserv.getAllFraisOfOrdre(this.choosenord.idOrdre).subscribe(t=>{
        this.fraisaff = t;
        if(this.user=="OM"){
          for (let index = 0; index < this.fraisaff.length; index++) {
            if(this.fraisaff[index].typeFrai.codeTypefr=="0808"){ //frais mission
                this.valfraisM =this.fraisaff[index].valeurPrevue; 
                this.supfraisM = this.convSupport(this.fraisaff[index].support.codeSupport);
            }else if (this.fraisaff[index].typeFrai.codeTypefr=="0303"){ // frais participation
              this.valfraisP =this.fraisaff[index].valeurPrevue; 
              this.supfraisP = this.convSupport(this.fraisaff[index].support.codeSupport);
            }else if (this.fraisaff[index].typeFrai.codeTypefr=="0606"){ // frais transport
              this.valfraisT =this.fraisaff[index].valeurPrevue; 
              this.supfraisT = this.convSupport(this.fraisaff[index].support.codeSupport);
            }
            else if (this.fraisaff[index].typeFrai.codeTypefr=="0101"){ // frais timbre
              this.valffraisTimbre =this.fraisaff[index].valeurPrevue; 
            }else {
                this.valfraisDivers = this.fraisaff[index].valeurPrevue;
            }
          }
        }
      });
      this.avance = this.choosenord.avance;
    this.details = true;
    if(this.ordremisschb == false){
    this.toggleOrdMb();}
  }
  confirmMission(){
    if(confirm("هل انت متأكد من المصادقة على هذا الأمر؟")){
    this.details = false;
    if(this.user=="O"){
      this.choosenord.etat = "V";
    } else this.choosenord.etat = "S";
    this.ordserv.updateOrdMission(this.choosenord).subscribe(w=>{
      alert("تمة المصادقة");
      this.tabOrdresMiss = this.tabOrdresMiss.filter(h=>h!==this.choosenord);
      this.tabOrdresMiss.splice(this.tabOrdresMiss.indexOf(this.choosenord),1);
    },error=>alert("فشلة المصادقة"));
    this.choosenord = new OrdreMission();
    }
  }
}
