import { Component, OnInit } from '@angular/core';
import { OrdreMission } from '../model/ordremission';
import { ActivatedRoute, Params } from '@angular/router';
import { OrdreMissionService } from '../model/ordremission.service';
import { MissionaireServices } from '../model/missionaire.service';
import { Missionaire } from '../model/missionaire';
import { Departement } from '../model/departement';
import { FormGroup, FormControl } from '@angular/forms';
import { Mission } from '../model/mission';
import { MissionService } from '../model/mission.service';
@Component({
  selector: 'app-m-mission-affect',
  templateUrl: './m-mission-affect.component.html',
  styleUrls: ['./m-mission-affect.component.css']
})
export class MMissionAffectComponent implements OnInit {
  codeOrdreMission:string;
  add:boolean = true;
  missionaires:OrdreMission[] = [];
  searchString:string;
  ordmiss:OrdreMission = new OrdreMission();
  modal:boolean = false;
  options:Missionaire[];
  missionairesAff:Missionaire[] = [];
  departement:Departement = JSON.parse(localStorage.getItem('org'));
  fc:FormControl;
  n:string = '';
  ordre:OrdreMission = new OrdreMission();
  nummiss:number = 0;
  mission:Mission = new Mission();
  constructor(public route:ActivatedRoute,public ordserv:OrdreMissionService,
    public mserv:MissionaireServices,public ordm:OrdreMissionService,public missionService:MissionService) {
    this.route.params.subscribe((params:Params)=>{
      this.nummiss = params['id'];
      missionService.findMissionByNum(params['id']).subscribe(m=>this.mission=m);
    });
    ordserv.getAllOrdMissionsOfMiss(this.nummiss).subscribe(d=>this.missionaires=d);
   }
  

  ngOnInit() {
    this.mserv.getAllMissionaire(this.departement.codeDep).subscribe(d=>{
      this.missionairesAff = d;     
    });
  }
  toggleAdd(){
    this.add = !this.add;
  }
  toggleModal(){
    this.modal = !this.modal;
  }
  disp(){
    this.ordre.mission = this.mission;
    this.mserv.getMissionaireByCin(Number(this.n.substr(this.n.indexOf("CIN")+5,8)))
    .subscribe(d=>this.ordre.missionaire = d);
  }
  addMissionaire(){
    
    this.ordre.dateDepP = this.ordre.mission.dateDepartP;
    this.ordre.dateArrP = this.ordre.mission.dateArriveP;
    this.ordre.mission.numMission = this.nummiss;
    this.ordm.insertOrdMission(this.ordre).then(()=>null);
    this.missionaires.push(this.ordre);
  }

   pad2(number) {
    return (number < 10 ? '0' : '') + number
  }
  convDur(d1:Date,d2:Date){
    let diff =  Math.abs(new Date(d2).getTime() - new Date(d1).getTime());
    return Math.ceil(diff / (1000 * 3600 * 24));
  }

}
