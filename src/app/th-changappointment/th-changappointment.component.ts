import { Component, OnInit } from '@angular/core';
import { DepartementService } from '../model/departement.service';
import { Departement } from '../model/departement';
import { Missionaire } from '../model/missionaire';
import { MissionaireServices } from '../model/missionaire.service';
import { AffectMissDep } from '../model/affectmission';

@Component({
  selector: 'app-th-changappointment',
  templateUrl: './th-changappointment.component.html',
  styleUrls: ['./th-changappointment.component.css']
})
export class ThChangappointmentComponent implements OnInit {
  Missionaires:Missionaire[] = [];
  Organismes:Departement [] =[];
  selectedOrg:Departement = new Departement();
  details:boolean = false;
  list:boolean = true;
  searchString:string = "";
  modal:boolean = false;
  choosenMissionaire:Missionaire = new Missionaire();
  depupdate:Departement = new Departement();
  missionaireDeptcurent:AffectMissDep = new AffectMissDep();
  constructor(public depserv:DepartementService,public mserv:MissionaireServices) {
    depserv.getAllDeps().subscribe(res=>{
      this.Organismes = res;
    })
  }

  ngOnInit() {
  }
  loadApps(u:Missionaire){
    this.mserv.getAllAffectationsMissionaire(u.idMissionaire).subscribe(res=>{
      this.mserv.getDepofMissionaire(u.idMissionaire).subscribe(dep=>{
          this.missionaireDeptcurent = dep;
          this.choosenMissionaire= u;
          this.choosenMissionaire.affectMissDeps = res;
          this.modal = true;
      })
    })
  }
  loadMissionaires(){
    this.mserv.getAllMissionaire(this.selectedOrg.codeDep).subscribe(x=>{
      this.details = true;
      this.list = true;
      this.Missionaires = x;
    })
}
updateOrganisme(){
    this.missionaireDeptcurent.departement = this.depupdate;
    this.mserv.updateAffectMissionaire(this.missionaireDeptcurent).subscribe(res=>{
      alert("تم تغيير التعيين");
      window.location.reload();
    })
}
}
