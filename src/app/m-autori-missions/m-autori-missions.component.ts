import { Component, OnInit } from '@angular/core';
import { OrdreMission } from '../model/ordremission';
import { Concerne } from '../model/concerne';
import { AvoirFrais } from '../model/avoirfrais';
import { MissionService } from '../model/mission.service';
import { OrdreMissionService } from '../model/ordremission.service';
import { ConcerneServices } from '../model/concerne.service';
import { AvoirFraisService } from '../model/avoirfrais.service';
import { BudgetService } from '../model/Budget.service';
import { Departement } from '../model/departement';

@Component({
  selector: 'app-m-autori-missions',
  templateUrl: './m-autori-missions.component.html',
  styleUrls: ['./m-autori-missions.component.css']
})
export class MAutoriMissionsComponent implements OnInit {
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
    this.ordserv.getAllOrdMissionsOfDep(this.dep.codeDep).subscribe(t=>this.tabOrdresMiss=t);
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
    this.choosenord.etat = "V";
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


}
