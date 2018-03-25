import { Component, OnInit, Input } from '@angular/core';
import { OrdreMission } from '../model/ordremission';
import { Missionaire } from '../model/missionaire';
import { Departement } from '../model/departement';
import { FormControl } from '@angular/forms';
import { Mission } from '../model/mission';
import { ActivatedRoute, Params } from '@angular/router';
import { OrdreMissionService } from '../model/ordremission.service';
import { MissionaireServices } from '../model/missionaire.service';
import { MissionService } from '../model/mission.service';
import { Pays } from '../model/pays';
import { PaysService } from '../model/pays.service';
import { Concerne } from '../model/concerne';
import { ConcerneServices } from '../model/concerne.service';
import { Projet } from '../model/projets';

@Component({
  selector: 'app-m-fraisdest',
  templateUrl: './m-fraisdest.component.html',
  styleUrls: ['./m-fraisdest.component.css']
})
export class MFraisdestComponent implements OnInit {
  @Input() id: number;
  @Input() missionaire: Missionaire = new Missionaire();
  @Input() ordremission: OrdreMission = new OrdreMission();
  @Input() missionconcernee:Mission = new Mission();
  add:boolean = true;
  depenses : boolean = false;
  depensesd : boolean = false;
  adding:boolean = true;
  updating:boolean = false;
  searchString:string;
  ordmiss:OrdreMission = new OrdreMission();
  modalpays:boolean = false;
  departement:Departement = JSON.parse(localStorage.getItem('org'));
  mission:Mission = new Mission();
  moytransport:string;
  pays:Pays[] = [];
  choosenPays:Pays = new Pays();
  tabconcerne:Concerne[] = [];
  concernetobedited:Concerne = new Concerne();
  city:string;
  choosenProjet:Projet = new Projet();
  projets:Projet[] = [];
  duree:number ;
  selectedconcerne:Concerne = new Concerne();
  // support frais
  departementsup:boolean = false;
  orgetrangersup:boolean = false;
  projetsup:boolean = false;
  durconcerne:number;
  constructor(public route:ActivatedRoute,public ordserv:OrdreMissionService,
    public mserv:MissionaireServices,public ordm:OrdreMissionService,public missionService:MissionService,
  public payService:PaysService,public concerneserv:ConcerneServices) {
    this.duree = this.convDur(this.ordremission.dateDepP,this.ordremission.dateArrP);
      payService.getAllPays().subscribe(pay=>this.pays = pay);
      concerneserv.getAllConcerne().subscribe(d=>this.tabconcerne=d );
      }  
  

  ngOnInit() {
   // alert(this.missionaire.idMissionaire);

  }
  toggleDepenses(){
    this.depenses = ! this.depenses;
  }
  toggleAdd(){
    this.add = !this.add;
  }
  toggleModalPays(){
    this.modalpays = !this.modalpays;
  }
  disp(){
  }
  addMissionaire(){
  
  }
  addPays(){
    let concerne:Concerne = new Concerne();
    concerne.nbJoursP = this.durconcerne;
    concerne.pays = this.choosenPays;
    concerne.moyTransport = this.moytransport;
    concerne.ville = this.city;
    this.tabconcerne.push(concerne);
  }
  updatePays(){
   
    if(this.concernetobedited.nbJoursP > 0 || this.concernetobedited.nbJoursP !=undefined){
      this.concernetobedited.nbJoursP = this.durconcerne;
      this.concernetobedited.pays = this.choosenPays;
      this.concernetobedited.moyTransport = this.moytransport;
      this.concerneserv.updateConcerne(this.concernetobedited).then(x=>null);
    }
  this.concernetobedited.pays = this.choosenPays;
  this.concernetobedited.moyTransport = this.moytransport;
  }
  convDur(d1:Date,d2:Date){
    let diff =  Math.abs(new Date(d2).getTime() - new Date(d1).getTime());
    return Math.ceil(diff / (1000 * 3600 * 24));
  }
  addconcerne(newValue,i:number){ 
     // alert("enter");
     // this.tabconcerne[i].nbJoursP = newValue 
    //alert(dur);
    //this.tabconcerne[i].nbJoursP =dur;
    this.tabconcerne[i].ordre = this.ordremission;
    this.concerneserv.insertConcerne(this.tabconcerne[i]).then(x=>null);
  }
  cancelCountry(x:Concerne,i:number){
    if(confirm("هل انت من التخلي عن هذا البلد ؟")){
      if(x.nbJoursP > 0 || x.nbJoursP !=undefined){
        this.concerneserv.deleteConcerne(x).then(x=>null);
      }
    this.tabconcerne.splice(i,1);
    }
  }
  editCountry(x:Concerne){
    this.adding = false;
    this.updating = true;
    //this.choosenPays = x.pays;
    for (let index = 0; index < this.pays.length; index++) {
        if(this.pays[index].idpays == x.pays.idpays){
          this.pays[index] = x.pays;
          this.choosenPays = this.pays[index] ;
        }      
    }
    this.moytransport = x.moyTransport;
    this.city = x.ville;
    this.durconcerne = x.nbJoursP;
    this.concernetobedited = x;
    this.toggleModalPays();
  }
  
  addnewcountry(){
    this.choosenPays = new Pays();
    this.modalpays = true;
    this.adding = true;
    this.updating = false;
    this.moytransport ='';
    this.city = '';
    this.durconcerne = 0;
  }
  gotodepenses(x:Concerne){
    if(x.nbJoursP > 0){
      this.depenses = true;
      this.depensesd = true;
      this.selectedconcerne = x;
    }
    else alert('يجب ادخال مدة المأمورية');
   }
}
