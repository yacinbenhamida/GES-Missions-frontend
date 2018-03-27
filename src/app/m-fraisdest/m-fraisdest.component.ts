import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
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
import { ProjetService } from '../model/projet.service';
import { PaysFrais } from '../model/paysfrais';
import { PaysFraisServices } from '../model/paysfrais.service';
import { AvoirFrais } from '../model/avoirfrais';
import { TypeFraisServices } from '../model/typefrais.service';
import { TypeFrais } from '../model/typefrais';

@Component({
  selector: 'app-m-fraisdest',
  templateUrl: './m-fraisdest.component.html',
  styleUrls: ['./m-fraisdest.component.css']
})
export class MFraisdestComponent implements OnInit,AfterViewInit {
  @Input() id: number;
  @Input() missionaire: Missionaire = new Missionaire();
  @Input() ordremission: OrdreMission = new OrdreMission();
  @Input() missionconcernee:Mission = new Mission();
  add:boolean = true;
  depenses : boolean = false;
  depensesd : boolean = false;
  adding:boolean = true;
  updating:boolean = false;
  modalexceptions:boolean = false;
  modalfraisdiv:boolean = false;
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
  couverture:string ="normal" ;
  couvertureorgexterne:string ="normal";
  valeurcouv:number;
  valeurcouvexterne:number;
  d:string;
  indexflag:number;
  valeuraff:number;
  // frais divers table 
  lstTypeFraisdivers:TypeFrais [] = []
  fraisDiversAdded:AvoirFrais[] = [];
  addedfraidiver:AvoirFrais = new AvoirFrais();
  /// support values
  projetsupvalue:number;
  orgetvalue:number;
  departementvalue:number;
  constructor(public route:ActivatedRoute,public ordserv:OrdreMissionService,
    public mserv:MissionaireServices,public ordm:OrdreMissionService,public missionService:MissionService,
  public payService:PaysService,public concerneserv:ConcerneServices,public projserv:ProjetService,
    public paysfrais:PaysFraisServices,public typefrais:TypeFraisServices) {
      this.duree = this.convDur(this.ordremission.dateDepP,this.ordremission.dateArrP);
      payService.getAllPays().subscribe(pay=>this.pays = pay);
      
      projserv.getProjectsOfDepartment(this.departement.codeDep).subscribe(pr=>this.projets = pr);
      typefrais.getAllTypeFrais().subscribe(x=>this.lstTypeFraisdivers = x);
      }  
  

  ngOnInit() {
    this.concerneserv.getAllConcerneOfORDRE(this.ordremission.idOrdre).subscribe(d=>{
      if(d!=null || d!=undefined) this.tabconcerne=d;
      else this.tabconcerne = [];
      });
  }
  ngAfterViewInit(){

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
    let durtot:number = 0;
    if(this.tabconcerne.length > 0){
    for (let index = 0; index < this.tabconcerne.length; index++) {
              durtot = this.tabconcerne[index].nbJoursP;
      }
    }
    if((durtot<this.convDur(this.ordremission.dateDepP,this.ordremission.dateArrP)) && (this.durconcerne <= this.convDur(this.ordremission.dateDepP,this.ordremission.dateArrP)) ){
      let concerne:Concerne = new Concerne();
      concerne.nbJoursP = this.durconcerne;
      concerne.pays = this.choosenPays;
      concerne.moyTransport = this.moytransport;
      concerne.ville = this.city;
      this.tabconcerne.push(concerne);
    }
    else alert('لقد استنفذتم عدد ايام الامر');
    this.toggleModalPays();
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
  this.toggleModalPays();
  }
  convDur(d1:Date,d2:Date){
    let diff =  Math.abs(new Date(d2).getTime() - new Date(d1).getTime());
    return Math.ceil(diff / (1000 * 3600 * 24));
  }
  addconcerne(newValue,i:number){ 
 
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
    let durtot:number = 0;
    if(this.tabconcerne.length > 0){
    for (let index = 0; index < this.tabconcerne.length; index++) {
              durtot = this.tabconcerne[index].nbJoursP;
      }
    }
    if(durtot<this.convDur(this.ordremission.dateDepP,this.ordremission.dateArrP)){
    this.choosenPays = new Pays();
    this.adding = true;
    this.updating = false;
    this.moytransport ='';
    this.city = '';
    this.durconcerne = 0;
    this.toggleModalPays();
    }
    else alert('لقد استنفذتم عدد ايام الامر');
  }
  gotodepenses(x:Concerne){
    if(x.nbJoursP > 0){
      this.depenses = true;
      this.depensesd = true;
      this.selectedconcerne = x;
    }
    else alert('يجب ادخال مدة المأمورية');
   }

   toggleModalExcept(){
     this.modalexceptions = !this.modalexceptions;
   }
   saveException(d,c){
      this.valeuraff = c;
      this.valeurcouvexterne = c;
   }
   gotoExceptions(){
     this.valeuraff = this.valeurcouvexterne;
     this.toggleModalExcept();
   }
// ajout frais divers
toggleModalFraisDiv(){
  this.modalfraisdiv = ! this.modalfraisdiv;
}
addnewFraisDivers(){

}
cancelFraisDivers(x:AvoirFrais,i:number){
  this.fraisDiversAdded = this.fraisDiversAdded.filter(h=>h!==this.fraisDiversAdded[i]);
}
saveFraisDiv(){
  let x = new AvoirFrais();
  x = this.addedfraidiver;
  this.fraisDiversAdded.push(x);
  this.addedfraidiver = new AvoirFrais();
}

   // button submit
   saveChanges(){
     let pf:PaysFrais = new PaysFrais();
     let af = new AvoirFrais();
    
     if(this.departementsup){
        af.valeurPrevue += this.valeurcouv;
        af.support = "departement";
        af.valeurPrevue += this.departementvalue;
     }
     if(this.orgetrangersup){
       af.valeurPrevue +=this.valeurcouvexterne;
       af.support = "organismehote";
       af.valeurPrevue += this.orgetvalue;

     }
    pf.pays = this.selectedconcerne.pays;
     if(this.projetsup){
       af.codeProg = this.choosenProjet.idprojet;
       af.support = "projet";
       af.valeurPrevue += this.projetsupvalue;

     }
     af.support = this.couverture;     
     this.typefrais.getTypeFrais("0808").subscribe(w=>af.typeFrai =w);   
     pf.avoirfrais = af;  
     this.paysfrais.insertPaysFrais(pf).then(x=>null);
     console.log(pf);
     for (let index = 0; index < this.fraisDiversAdded.length; index++) {
       let newp:PaysFrais = new PaysFrais();
       this.typefrais.getTypeFrais(this.fraisDiversAdded[index].typeFrai.codeTypefr).subscribe(h=>this.fraisDiversAdded[index].typeFrai=h);
       newp.avoirfrais = this.fraisDiversAdded[index];
       newp.pays = this.selectedconcerne.pays;
       console.log(newp);
       this.paysfrais.insertPaysFrais(newp).then(x=>null);
       
      }
      this.selectedconcerne.ordre = this.ordremission;
    this.concerneserv.insertConcerne(this.selectedconcerne).then(x=>null);
     
   }
   // formattage affichage support 
   convSupport(x:string){
     if(x=="departement") return "ميزانية الهيكل";
     else if(x=="organismehote") return "هيكل اجنبي";
     else if(x=="personnel") return "الحساب الخاص";
     else if(x=="projet") return "مشروع";
   }

   verifDepVal(x){   
     if(this.departementsup == true && x!='' ) {
      this.departementvalue = Number(x);
     }
     else return null;
   }
   veriforgval(x){
    if(this.orgetrangersup == true && x!=''){
      this.orgetvalue = Number(x);
      alert(this.orgetvalue);
     }
     else return null;
   }
   verifprojValue(x){  
    if(this.projetsup == true  && x!=''){
      this.projetsupvalue = Number(x);
     }
     else return null;
   }
}
