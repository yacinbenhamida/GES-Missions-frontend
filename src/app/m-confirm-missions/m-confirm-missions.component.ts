import { Component, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-m-confirm-missions',
  templateUrl: './m-confirm-missions.component.html',
  styleUrls: ['./m-confirm-missions.component.css']
})
export class MConfirmMissionsComponent implements OnInit {
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
  constructor(public missionsService:MissionService,public ordserv:OrdreMissionService,
    public concerneService:ConcerneServices,public concserv:ConcerneServices,public avserv:AvoirFraisService) {
    missionsService.getAllMissionsOfDep(this.dep.codeDep).subscribe(d=>this.tabmissions=d);
    ordserv.getAllOrdMissionsOfDep(this.dep.codeDep).subscribe(t=>this.tabOrdresMiss=t);
   }

  ngOnInit() {
    this.choosenord = null;
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

  loadDetails(){
    this.concerneService.getAllConcerneOfORDRE(this.choosenord.idOrdre).subscribe(t=>
      {
        this.choosenconcerne = t;
      });
      this.avserv.getAllFraisOfOrdre(this.choosenord.idOrdre).subscribe(t=>this.fraisaff = t);
      this.avance = this.choosenord.avance;
    this.details = true;
    if(this.ordremisschb == false){
    this.toggleOrdMb();}
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
}
