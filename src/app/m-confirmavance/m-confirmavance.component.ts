import { Component, OnInit } from '@angular/core';
import { OrdreMission } from '../model/ordremission';
import { Concerne } from '../model/concerne';
import { AvoirFrais } from '../model/avoirfrais';
import { Departement } from '../model/departement';
import { AvoirFraisService } from '../model/avoirfrais.service';
import { ConcerneServices } from '../model/concerne.service';
import { MissionService } from '../model/mission.service';
import { OrdreMissionService } from '../model/ordremission.service';
import { BudgetService } from '../model/Budget.service';

@Component({
  selector: 'app-m-confirmavance',
  templateUrl: './m-confirmavance.component.html',
  styleUrls: ['./m-confirmavance.component.css']
})
export class MConfirmavanceComponent implements OnInit {
  
  missions:boolean = true;
  choosenord:OrdreMission = new OrdreMission();
  details:boolean = false;
  ordremisschb:boolean = false;
  tabOrdresMiss:OrdreMission[] = [];
  choosenconcerne:Concerne[]=[];
  fraisaff:AvoirFrais[]= [];
  avance:number = 0;
  dep:Departement = JSON.parse(localStorage.getItem('org'));
  constructor(public missionsService:MissionService,public ordserv:OrdreMissionService,
    public concerneService:ConcerneServices,public concserv:ConcerneServices
    ,public avserv:AvoirFraisService,public budgserv:BudgetService) { }

  ngOnInit() {
    this.ordserv.getAllOrdMissionsOfDepElligiblesPourPayeur(this.dep.codeDep).subscribe(t=>this.tabOrdresMiss=t);
    this.choosenord = null;
  }
  loadDetails(){
    this.concerneService.getAllConcerneOfORDRE(this.choosenord.idOrdre,this.choosenord.mission.departement.codeDep).subscribe(t=>
      {
        this.choosenconcerne = t;
      this.avserv.getAllFraisOfOrdre(this.choosenord.idOrdre,this.dep.codeDep).subscribe(t=>{
        this.fraisaff = t;
      });
      this.avance = this.choosenord.avance;
    this.details = true;
    if(this.ordremisschb == false){
    this.toggleOrdMb();
  }});
  }
  confirmMission(){
    if(confirm("هل انت متأكد من المصادقة على هذا الأمر؟")){
    this.details = false;
    this.choosenord.etat = "PA";
    this.ordserv.updateOrdMission(this.choosenord).subscribe(w=>{
      alert("تمة المصادقة");
      this.tabOrdresMiss = this.tabOrdresMiss.filter(h=>h!==this.choosenord);
      this.tabOrdresMiss.splice(this.tabOrdresMiss.indexOf(this.choosenord),1);
    },error=>alert("فشلة المصادقة"));
    this.choosenord = new OrdreMission();
    }
  }

toggleOrdMb(){
  this.ordremisschb = ! this.ordremisschb;
}

refuseMission(){
  if(confirm("هل انت متأكد من رفض على هذا الأمر كليا ؟")){
    this.details = false;
    this.choosenord.etat = "PR";
    this.ordserv.updateOrdMission(this.choosenord).subscribe(w=>{
      alert("تمة الرفض");
      this.tabOrdresMiss = this.tabOrdresMiss.filter(h=>h!==this.choosenord);
      this.tabOrdresMiss.splice(this.tabOrdresMiss.indexOf(this.choosenord),1);
    },error=>alert("فشلة المصادقة"));
    this.choosenord = new OrdreMission();
    }
}

}
