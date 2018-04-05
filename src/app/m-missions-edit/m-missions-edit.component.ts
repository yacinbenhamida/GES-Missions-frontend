import { Component, OnInit } from '@angular/core';
import { Mission } from '../model/mission';
import { OrdreMission } from '../model/ordremission';
import { Missionaire } from '../model/missionaire';
import { MissionService } from '../model/mission.service';
import { MissionaireServices } from '../model/missionaire.service';
import { OrdreMissionService } from '../model/ordremission.service';
import { Departement } from '../model/departement';
import { MotCle } from '../model/motcle';
import { ThemeService } from '../model/theme.service';
import { MotCleService } from '../model/motcle.service';
import { MFraisdestComponent } from "../m-fraisdest/m-fraisdest.component";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-m-missions-edit',
  templateUrl: './m-missions-edit.component.html',
  styleUrls: ['./m-missions-edit.component.css']
})
export class MMissionsEditComponent implements OnInit {
  frais:boolean = true;
  missions:boolean = true;
  edmission:boolean = true;
  missionaires:boolean = true;
  showmodif:boolean = false;
  modal:boolean = false;
  modaledit:boolean = false;
  part1:boolean = true;
  part2:boolean = false;

  missionairesAff:Missionaire[] = []
  tabmissions:Mission[] = [];
  tabOrdresMiss:OrdreMission[] = [];
  tabMissionaires:Missionaire[] = [];
  searchString:string;
  missionmodif:Mission = new Mission();
  motcles:MotCle[] = [];
  duree:number = 0;
  dep:Departement = JSON.parse(localStorage.getItem("org"));
  choosenMc:MotCle = new MotCle();
  n:string = '';
  duree2:number = 0;
  ordre:OrdreMission = new OrdreMission();
  missionconcernee:Mission = new Mission();
  ordremiss:OrdreMission = new OrdreMission();
  editedordre:OrdreMission = new OrdreMission();
  
  constructor(public missionsservice:MissionService, public missionaireService:MissionaireServices,
    public ordMService:OrdreMissionService,public thServ:ThemeService,public mocserv:MotCleService) {
      missionsservice.getAllMissionsOfDep(this.dep.codeDep).subscribe(d=>this.tabmissions=d);
      mocserv.getAllMC().subscribe(d=>this.motcles=d);
     }

  ngOnInit() {}
  toggleMiss(){
    this.missions = !this.missions;
  }
  toggleMissio(){
    this.missionaires = ! this.missionaires;
  }

  toggleEdMissio(){
    this.edmission = ! this.edmission;
  }
  toggleF(){
    this.frais = !this.frais;
  }
  toggleModal(){
    this.n = '';
    this.ordre = null;
    this.ordre = new OrdreMission();
    this.modal = !this.modal;
  }
  numordConv(n:number):string{
    if(n<10) return "0"+n;
  }
  disp(){
    let canadd:boolean = true;


    this.ordre.mission = this.missionmodif;
    this.ordre.dateDepP = this.missionmodif.dateDepartP;
    this.ordre.dateArrP = this.missionmodif.dateArriveP;
    this.missionaireService.getMissionaireByCin(Number(this.n.substr(this.n.indexOf(":")+2,8)))
    .subscribe(d=>{
      for (let index = 0; index < this.tabOrdresMiss.length; index++) {
        if(this.tabOrdresMiss[index].missionaire.idMissionaire == d.idMissionaire){
            canadd = false;
          }
        }
    if(canadd == false){
      this.n= '';
      alert("وقع تعيين المنتفع سابقا");
      return;
    }   
    else this.ordre.missionaire = d;
    });

  }
  editMiss(u:Mission){
    this.missionsservice.findMissionByNum(u.numMission).subscribe(m=>{
      this.missionmodif = m;
      for (let index = 0; index < this.motcles.length; index++) {
        if(this.motcles[index].theme.idtheme==m.theme.idtheme){
          this.choosenMc = this.motcles[index];
          this.missionmodif.objectifMissionAr = this.choosenMc.libMcAr;
          this.missionmodif.objectifMissionFr = this.choosenMc.libMcFr;
        }
        this.calculDuree();
        this.missionaireService.getAllMissionaireNHAM(u.dateDepartP,u.dateArriveP,this.dep.codeDep).subscribe(d=>{
          this.missionairesAff = d;
           
        });
    }
    });
    this.ordMService.getAllOrdMissionsOfMiss(u.numMission).subscribe(t=>this.tabOrdresMiss=t);   
    this.showmodif = true;
  }
  fetchTheme(){
    this.thServ.getTheme(this.choosenMc.theme.idtheme).subscribe(r=>this.missionmodif.theme = r);
    this.missionmodif.objectifMissionAr = this.choosenMc.libMcAr;
    this.missionmodif.objectifMissionFr = this.choosenMc.libMcFr;
  }
  calculDuree(){
    if(new Date(this.missionmodif.dateDepartP).getTime() > new Date(this.missionmodif.dateArriveP).getTime() )
    {
      alert("تاريخ الذهاب يجب ان يكون اقل من تاريخ الإياب");}
      else  if(this.missionmodif.dateArriveP!=undefined && this.missionmodif.dateDepartP !=undefined && this.duree >=0){
      let date1 = new Date(this.missionmodif.dateArriveP).getTime();
      let date2 = new Date(this.missionmodif.dateDepartP).getTime();
      var diff = Math.abs(date2 - date1);
      this.duree = Math.ceil(diff / (1000 * 3600 * 24));
      this.duree2 = this.duree
    }
    else { this.duree = 0;}
  }
  editord(u:OrdreMission){
    this.editedordre = u;
    this.ordMService.getOrdMission(u.numOrdre,this.missionmodif.numMission).subscribe(ord=>{this.ordre=ord;
      for (let index = 0; index < this.missionairesAff.length; index++) {

          if(this.missionairesAff[index].idMissionaire==ord.missionaire.idMissionaire){
            this.missionairesAff[index] = ord.missionaire;
            this.n =   this.missionairesAff[index].cin +" : "+ this.missionairesAff[index].nomAr +" "+ this.missionairesAff[index].prenomAr;
            this.ordre.missionaire = this.missionairesAff[index];
            this.ordre.dateDepP = this.missionmodif.dateDepartP;
            this.ordre.dateArrP = this.missionmodif.dateArriveP;
          }
        }
      });
    this.toggleModalEdit();
  }

  addMissionaire(){
        if(this.tabOrdresMiss.length==0){
          this.ordre.numOrdre = 1;
          this.ordre.mission.numMission = Number(this.missionmodif.numMission); 
          this.ordre.avance = (this.ordre.missionaire.groupe.taux.valTaux) * Number(this.calcduree(this.ordre.dateDepP,this.ordre.dateArrP));   
          this.ordMService.insertOrdMission(this.ordre).then(x=>{
            x.dateArrP = this.ordre.dateArrP;
            x.dateDepP = this.ordre.dateDepP;
            this.tabOrdresMiss.push(x);      
            const index:number = this.tabOrdresMiss.indexOf(this.ordre);
                if(index!==-1){
                  this.n='';
                  this.tabOrdresMiss.splice(index,1);
                  this.ordre = new OrdreMission();
                }
          });
          this.toggleModal();
        }
        else {
          this.ordMService.getLatestORDMISS(Number(this.missionmodif.numMission)).subscribe(
            x=>{
              this.ordre.numOrdre = Number(x)+1;
              this.ordre.mission.numMission = Number(this.missionmodif.numMission);
              this.ordre.avance = (this.ordre.missionaire.groupe.taux.valTaux) * Number(this.calcduree(this.ordre.dateDepP,this.ordre.dateArrP));   
              this.ordMService.insertOrdMission(this.ordre).then(x=>{
                x.dateArrP = this.ordre.dateArrP;
                x.dateDepP = this.ordre.dateDepP;
                this.tabOrdresMiss.push(x);  
                const index:number = this.tabOrdresMiss.indexOf(this.ordre);
                if(index!==-1){
                  this.n='';
                  this.tabOrdresMiss.splice(index,1);
                  this.ordre = new OrdreMission();
                }
              });
              this.toggleModal();
            }
          )
        }
  }

affdur(dateArr:Date,dateDep:Date){
  let date1 = new Date(dateArr).getTime();
  let date2 = new Date(dateDep).getTime();
  var diff = Math.abs(date1 - date2);
  return Math.ceil(diff / (1000 * 3600 * 24)) + " يوم ";
}
calcduree(d1:Date,d2:Date){
  let diff =  Math.abs(new Date(d2).getTime() - new Date(d1).getTime());
  return Math.ceil(diff / (1000 * 3600 * 24));
}
  deleteOrd(u:OrdreMission){
    if(confirm(" هل انت متأكد من إزالة  الامر عدد "+u.numOrdre+" ?")){
      this.ordMService.deleteOrdMission(u).then(()=>{
        this.tabOrdresMiss = this.tabOrdresMiss.filter(h=>h!==u);  });
      }
  }

  convDur(){
    if(this.ordre.dateDepP!=undefined && this.ordre.dateArrP!=undefined){
        if (this.ordre.dateDepP==this.ordre.dateArrP) this.duree2 =  0;
        else {
          let diff =  Math.abs(new Date(this.ordre.dateArrP).getTime() - new Date(this.ordre.dateDepP).getTime());
            this.duree2 =  Math.ceil(diff / (1000 * 3600 * 24));
          }
    }
    else this.duree2 = 0;
  }
  update(){
    this.missionmodif.departement = this.dep;
    this.missionsservice.updateMission(this.missionmodif).then(x=>null);
  }
  updateMissionaire(){
    let index:number = this.tabOrdresMiss.indexOf(this.editedordre);  
    this.ordre.avance = (this.ordre.missionaire.groupe.taux.valTaux) * Number(this.calcduree(this.ordre.dateDepP,this.ordre.dateArrP));   
    this.ordMService.updateOrdMission(this.ordre).subscribe(t=>{
      if(index!=-1){   
      //this.tabOrdresMiss = this.tabOrdresMiss.filter(h=>{h!==this.ordre;});
      t.dateArrP = this.ordre.dateArrP;
      t.dateDepP = this.ordre.dateDepP;
      this.tabOrdresMiss[index] = t;
     // this.tabOrdresMiss.push(t);
      }
    });  
    alert("تم تغيير العون !");
    this.toggleModalEdit();
  }
  toggleModalEdit(){
    this.modaledit = !this.modaledit;
  }
  getBack(){
    this.part2 = false;
    this.part1 = true;
  }
  gotodepenses(u:OrdreMission){
    this.part1 = false;
    this.part2 = true;
    this.ordremiss = u;
    this.missionconcernee = u.mission;
    
  }
}
