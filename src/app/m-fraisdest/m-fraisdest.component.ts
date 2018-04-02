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
import { AvoirFrais } from '../model/avoirfrais';
import { TypeFraisServices } from '../model/typefrais.service';
import { TypeFrai } from '../model/typefrais';
import { AvoirFraisService } from '../model/avoirfrais.service';

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
  lstTypeFraisdivers:TypeFrai [] = []
  fraisDiversAdded:AvoirFrais[] = [];
  addedfraidiver:AvoirFrais = new AvoirFrais();
  /// support values nombre jours prevus
  projetsupvalue:number = 0;
  orgetvalue:number = 0;
  departementvalue:number = 0;
  // somme couvertures flous
  projetsupSomme:number;
  orgsupSomme:number;
  depSupSomme:number;
  dureeconcerneselected:number;
  selectedprog:Projet = new Projet();
  // si le support frais est personnel
  isPersonal:boolean = false;
  // frais mission مصاريف الإقامة to be calculated
  fraismission:AvoirFrais = new AvoirFrais();
  

  constructor(public route:ActivatedRoute,public ordserv:OrdreMissionService,
    public mserv:MissionaireServices,public ordm:OrdreMissionService,public missionService:MissionService,
  public payService:PaysService,public concerneserv:ConcerneServices,public projserv:ProjetService,
    public avoirFraisServ:AvoirFraisService,public typefrais:TypeFraisServices) {
      this.duree = this.convDur(this.ordremission.dateDepP,this.ordremission.dateArrP);
      projserv.getProjectsOfDepartment(this.departement.codeDep).subscribe(pr=>this.projets = pr);
      typefrais.getAllTypeFrais().subscribe(x=>this.lstTypeFraisdivers = x);
      }  
  

  ngOnInit() {
    this.concerneserv.getAllConcerneOfORDRE(this.ordremission.idOrdre).subscribe(d=>{
      if(d!=null || d!=undefined) this.tabconcerne=d;
      else this.tabconcerne = [];
      });
      this.avoirFraisServ.getAllFraisDiversOfOrdre(this.ordremission.idOrdre).subscribe(t=>this.fraisDiversAdded=t);
      
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
    if((durtot<this.convDur(this.ordremission.dateDepP,this.ordremission.dateArrP)) && (this.durconcerne <= this.convDur(this.ordremission.dateDepP,this.ordremission.dateArrP) && this.ordremission.dateDepP!=this.ordremission.dateArrP && this.durconcerne>0) ){
      let concerne:Concerne = new Concerne();
      concerne.nbJoursP = this.durconcerne;
      concerne.pays = this.choosenPays;
      concerne.moyTransport = this.moytransport;
      concerne.ville = this.city;
      concerne.ordre = this.ordremission;
      this.pays = this.pays.filter(h=>h!==concerne.pays);
      this.tabconcerne.push(concerne);
      if(this.tabconcerne.indexOf(concerne)==0 || this.tabconcerne.indexOf(concerne)<0){
        concerne.ordre_dest = 1;
      }
      else concerne.ordre_dest = this.tabconcerne.indexOf(concerne);
      this.concerneserv.insertConcerne(concerne).then(x=>null);
      this.toggleModalPays();
    }
    else alert('لقد استنفذتم عدد ايام الامر');
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
    this.pays.push(x.pays);

    this.payService.getAllPays().subscribe(pay=>{
      this.pays = pay;

        for (let index = 0; index < this.pays.length; index++) {
          if(this.tabconcerne[index].pays.codepays == this.pays[index].codepays && this.tabconcerne[index].pays.codepays != x.pays.codepays){
            this.pays = this.pays.filter(h=>h!==this.pays[index]);}
          if(this.pays[index].idpays == x.pays.idpays){
              this.pays[index] = x.pays;
              this.choosenPays = this.pays[index] ;
            }    
    }
   });
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
    this.payService.getAllPays().subscribe(pay=>{
      this.pays = pay;
      if(this.tabconcerne.length > 0 ){
        for (let index = 0; index < this.pays.length; index++) {
          if(this.tabconcerne[index].pays.codepays == this.pays[index].codepays){
            this.pays = this.pays.filter(h=>h!==this.pays[index]);
          }
    }
  }
    });
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
    this.selectedconcerne = x;
    if(x.nbJoursP > 0){
      this.depensesd =  true;
      this.depenses = true;
      this.avoirFraisServ.getFraisMissionOfConcerne(x.idconcerne).subscribe(a=>{
        if(a==undefined || a == null || this.isEmpty(a)){
           this.depensesd =  true;
            this.depenses = true;
            return;
        }
        else{
          this.depensesd =  true;
            this.depenses = true;
          switch(a.support){
            case 'I' : this.departementsup = true;this.departementvalue = a.valeurPrevue; break;
            case 'A' : this.projetsup = true;this.projetsupSomme = a.valeurPrevue;break;
            case 'E' : this.orgetrangersup = true;this.orgetvalue = a.valeurPrevue;break;
            case 'IE' : this.departementsup = true;this.orgetrangersup=true;this.departementvalue = a.valeurPrevue;this.orgetvalue = a.valeurPrevue;break;
            case 'IA' : this.projetsup = true;this.departementsup = true;this.projetsupSomme = a.valeurPrevue;this.departementvalue = a.valeurPrevue;break;
          }
        this.fraismission=a;
        }
      });
    }
    else alert('يجب ادخال مدة المأمورية');
   }

   toggleModalExcept(){
     this.modalexceptions = !this.modalexceptions;
   }
   saveException(d,c){
      this.valeuraff = c;
      this.valeurcouvexterne = c;
      this.toggleModalExcept();
   }
   gotoExceptions(){
     this.valeuraff = this.valeurcouvexterne;
     this.toggleModalExcept();
   }
// ajout frais divers
toggleModalFraisDiv(){
  this.modalfraisdiv = ! this.modalfraisdiv;
}
isEmpty(obj){
  return (obj && (Object.keys(obj).length === 0));
}
cancelFraisDivers(x:AvoirFrais,i:number){
  this.fraisDiversAdded = this.fraisDiversAdded.filter(h=>h!==this.fraisDiversAdded[i]);
  this.avoirFraisServ.deleteFrais(x).then(x=>alert("تم"));
}
saveFraisDiv(){
  let x = new AvoirFrais();
  x = this.addedfraidiver;
  x.ordreMission = this.ordremission;
  if(x.support == "departement") {
    x.support = "I";
    x.codeSupport = this.departement.codeDep;
  }
  else if (x.support == "organismehote") {
    x.support = "E";
  }
  else if (x.support == "personnel") {
    x.support = "P";
  }
  else if (x.support == "projet") {
    x.support = "A";
  }
  this.ordremission.avance = this.ordremission.avance + x.valeurPrevue;
  this.ordserv.updateOrdMission(this.ordremission).subscribe(x=>null);
  this.avoirFraisServ.insertFrais(x).then(ax=>null);
  this.fraisDiversAdded.push(x);
  this.addedfraidiver = new AvoirFrais();
}

   // button submit
   saveChanges(){
     this.typefrais.getTypeFrais("0808").subscribe(a=>{this.fraismission.typeFrai = a;
      this.fraismission.ordreMission = this.ordremission;
      if (this.departementsup){
       this.fraismission.support = "I";
       this.fraismission.codeSupport = this.departement.codeDep;
       this.fraismission.valeurPrevue = this.departementvalue;
       this.ordremission.avance = this.ordremission.avance +  this.departementvalue;
       this.selectedconcerne.fraisMission =  this.fraismission.valeurPrevue;
      }
      else if (this.orgetrangersup){
       this.fraismission.support = "E";
       this.fraismission.codeSupport = this.departement.codeDep;
       this.fraismission.valeurPrevue = Number(this.orgetvalue);
       this.ordremission.avance = this.ordremission.avance +  this.orgetvalue;
       this.selectedconcerne.fraisMission =  this.fraismission.valeurPrevue;
      }
      else if (this.projetsup){ 
       this.fraismission.support = "A";
       this.fraismission.codeProg = Number(this.selectedprog.codeProjet);
       this.fraismission.valeurPrevue = this.projetsupSomme;
       this.ordremission.avance = this.ordremission.avance +  this.projetsupSomme;
       this.selectedconcerne.fraisMission =  this.fraismission.valeurPrevue;
      }
      else if(this.departementsup && this.orgetrangersup){
       this.fraismission.valeurPrevue = this.orgetvalue + this.departementvalue;
       this.fraismission.support = "IE";
       this.selectedconcerne.fraisMission =  this.fraismission.valeurPrevue;
       this.ordremission.avance = this.ordremission.avance +  this.orgetvalue + this.departementvalue;
       this.fraismission.codeSupport = this.departement.codeDep;
       this.fraismission.valeurPrevue = this.departementvalue + this.orgetvalue;
      }
      else if(this.departementsup && this.projetsup){
       this.fraismission.valeurPrevue = this.projetsupvalue + this.departementvalue;
       this.selectedconcerne.fraisMission =  this.fraismission.valeurPrevue;
       this.fraismission.support = "IA";
       this.fraismission.codeProg = Number(this.selectedprog.codeProjet);
       this.ordremission.avance = this.ordremission.avance +  this.projetsupvalue + this.departementvalue;
      }
      this.ordserv.updateOrdMission(this.ordremission).subscribe(x=>null);
      this.concerneserv.updateConcerne(this.selectedconcerne).then(x=>null);
      this.avoirFraisServ.insertFrais(this.fraismission).then(x=>null);
    });
     
     alert("تم");
   }
   // formattage affichage support 
   convSupport(x:string){
     if(x=="I") return "ميزانية الهيكل";
     else if(x=="E") return "هيكل اجنبي";
     else if(x=="P") return "الحساب الخاص";
     else if(x=="A") return "مشروع";
   }

  
 

   verifPerso(){
     if(this.addedfraidiver.support == "personnel"){
      this.addedfraidiver.valeurPrevue = 0;
      this.isPersonal = true;
     }
     else{
      this.isPersonal = false;
      this.addedfraidiver.valeurPrevue = null;

     }
   }
   // depart param

  
}
