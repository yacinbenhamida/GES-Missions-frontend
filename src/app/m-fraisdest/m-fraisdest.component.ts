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
  // nb jours prise en charge
  nbjourspecdep:number;
  nbjourspecorget:number;
  nbjourspecproj:number;
  etr:boolean = false; // si le frais divers est pris en charge par un organisme externe (hote)
  proj:boolean = false; // is pec par un projet
  nomOrgAr:string = ""; // nom de l'org etranger 
  nomOrgFr:string = "" ;
  constructor(public route:ActivatedRoute,public ordserv:OrdreMissionService,
    public mserv:MissionaireServices,public ordm:OrdreMissionService,public missionService:MissionService,
  public payService:PaysService,public concerneserv:ConcerneServices,public projserv:ProjetService,
    public avoirFraisServ:AvoirFraisService,public typefrais:TypeFraisServices) {
      this.duree = this.convDur(this.ordremission.dateDepP,this.ordremission.dateArrP);
      projserv.getProjectsOfDepartment(this.departement.codeDep).subscribe(pr=>this.projets = pr);
      typefrais.getAllTypeFrais().subscribe(x=>{
        this.lstTypeFraisdivers = x;
        this.lstTypeFraisdivers = this.lstTypeFraisdivers.filter(h=>h.codeTypefr!=='0808');
      });
      }  
  

  ngOnInit() {
    this.concerneserv.getAllConcerneOfORDRE(this.ordremission.idOrdre,this.ordremission.mission.departement.codeDep).subscribe(d=>{
      if(d!=null || d!=undefined) this.tabconcerne=d;
      else this.tabconcerne = [];
      },error=>this.tabconcerne = []);
      this.avoirFraisServ.getAllFraisDiversOfOrdre(this.ordremission.idOrdre).subscribe(t=>{
        this.fraisDiversAdded=t;
      },error=>this.fraisDiversAdded = []);
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
      if((this.tabconcerne.indexOf(concerne)==0 || this.tabconcerne.indexOf(concerne)<0) && this.tabconcerne.length == 0){
        concerne.ordre_dest = 1;
      }
      else concerne.ordre_dest = this.tabconcerne.indexOf(concerne) + 1;
      this.concerneserv.insertConcerne(concerne).then(x=>{
        this.concerneserv.getAllConcerneOfORDRE(this.ordremission.idOrdre,this.ordremission.mission.departement.codeDep).subscribe(a=>
          {
            this.tabconcerne = a;   
          });
      });
     
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
     /* if(this.tabconcerne.length > 0 ){
        for (let index = 0; index < this.pays.length; index++) {
          if(this.tabconcerne[index].pays.codepays == this.pays[index].codepays){
            this.pays = this.pays.filter(h=>h!==this.pays[index]);
          }
        }
      }*/
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
    this.fraismission = new AvoirFrais();
    this.selectedconcerne = x;
    if(x.nbJoursP > 0){
      this.depensesd =  true;
      this.depenses = true;
      this.avoirFraisServ.getFraisMissionOfConcerne(x.idconcerne,this.departement.codeDep,x.ordre.idOrdre).subscribe(a=>{
        if(a==undefined || a == null || this.isEmpty(a)){
           this.depensesd =  true;
            this.depenses = true;
            return;
        }
        else{
          this.depensesd =  true;
            this.depenses = true;
          switch(a.support.codeSupport){
            case 'P' : break;
            case 'I' : this.departementsup = true;this.departementvalue = a.valeurPrevue; break;
            case 'A' : this.projetsup = true;this.nbjourspecproj = x.nbJoursPecProj;this.selectedprog.idprojet = a.projet.idprojet;break;
            case 'E' : this.orgetrangersup = true;this.nbjourspecorget = x.nbJoursPecOrget;break;
            case 'J' : { // organisme + org hote
              this.departementsup = true;
              this.orgetrangersup=true;
              this.nbjourspecdep = x.nbJoursPecDep;
              this.nbjourspecorget = x.nbJoursPecOrget;
              this.nomOrgAr = x.nomOrgAr;
              this.nomOrgFr = x.nomOrgFr;
              break;
            }
            case 'M' : { // org hote + projet
                    this.projetsup = true;
                    this.orgetrangersup = true;
                    this.selectedprog = a.projet;
                    this.selectedprog.idprojet = a.projet.idprojet;
                    this.nbjourspecorget = x.nbJoursPecOrget;
                    this.nbjourspecproj = x.nbJoursPecProj;
                    this.nomOrgAr = x.nomOrgAr;
                    this.nomOrgFr = x.nomOrgFr;
                    
                    break;
          }
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
     if(this.couverture == "reduction" && this.selectedconcerne.nbJoursP < 21){
      alert("مدة الأمر لا تتجاوز 20 يوم، لا يمكن إختيار هذا الأستثناء");
      return;
     }else {
      this.valeuraff = c;
      this.valeurcouvexterne = c;
      this.toggleModalExcept();
    }
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
  if(x.support.codeSupport == "I") {
    x.codeSupport = this.departement.codeDep;
  }
  this.ordremission.avance = this.ordremission.avance + x.valeurPrevue;
  this.ordserv.updateOrdMission(this.ordremission).subscribe(x=>null);
  this.avoirFraisServ.insertFrais(x).then(ax=>this.fraisDiversAdded.push(ax),error=>alert("err"));
  this.toggleModalFraisDiv();
  this.addedfraidiver = new AvoirFrais();
  alert("تمة الإضافة");
}

   // button submit
   saveChanges(){
     this.typefrais.getTypeFrais("0808").subscribe(a=>{this.fraismission.typeFrai = a;
      this.fraismission.ordreMission = this.ordremission;
      let taux:number = this.selectedconcerne.ordre.missionaire.groupe.taux.valTaux;
      if(this.departementsup && this.orgetrangersup){ // departement & org hote
        if(this.nbjourspecdep < this.selectedconcerne.nbJoursP && this.nbjourspecorget < this.selectedconcerne.nbJoursP && this.nbjourspecdep + this.nbjourspecorget <= this.selectedconcerne.nbJoursP){
            this.fraismission.valeurPrevue = this.orgetvalue + this.departementvalue;
            this.fraismission.support.codeSupport = "J";
            this.selectedconcerne.nbJoursPecDep = this.nbjourspecdep; // nb jours prise  en charge
            this.selectedconcerne.nbJoursPecOrget = this.nbjourspecorget;
            this.fraismission.codeSupport = this.departement.codeDep;
            if(this.selectedconcerne.nbJoursP > 20){
                if (this.couverture == "reduction"){ // pas de reduction aprés 20 jours
                  this.fraismission.valeurPrevue = (this.selectedconcerne.nbJoursP * taux / 2);
                }
                else if(this.couverture == "pecprive"){
                  this.fraismission.valeurPrevue = 0;
                }
                else if (this.couverture == "residencepr"){
                  this.fraismission.valeurPrevue = this.selectedconcerne.nbJoursP * taux / 3 +this.valeuraff;
                }
                else  this.fraismission.valeurPrevue = (20 * taux) + (this.selectedconcerne.nbJoursP-20 * taux)/6;
            }
            else  {
                if (this.couverture == "reduction"){ // pas de reduction aprés 20 jours
                  this.fraismission.valeurPrevue = (this.selectedconcerne.nbJoursP * taux / 2);
                }
                else if(this.couverture == "pecprive"){
                  this.fraismission.valeurPrevue = 0;
                }
                else if (this.couverture == "residencepr"){ // prise en charge des frais logement
                  this.fraismission.valeurPrevue = this.selectedconcerne.nbJoursP * taux / 3 + this.valeuraff;
                }
                else this.fraismission.valeurPrevue = this.selectedconcerne.nbJoursP * taux / 2;
              }
        }else alert("لا يمكن اجتياز مدة الامر");
       }
       else if (this.projetsup && this.orgetrangersup){// projet et organisme hote (étranger)
        if(this.nbjourspecorget < this.selectedconcerne.nbJoursP && this.nbjourspecproj < this.selectedconcerne.nbJoursP && this.nbjourspecproj + this.nbjourspecorget <= this.selectedconcerne.nbJoursP){
            if(this.selectedconcerne.nbJoursP > 20){
              this.fraismission.valeurPrevue = (this.selectedconcerne.nbJoursP * taux / 6);
            } else {this.fraismission.valeurPrevue = (this.selectedconcerne.nbJoursP * taux / 2); }
              this.fraismission.support.codeSupport = "M";
              this.fraismission.projet =this.selectedprog;
              this.selectedconcerne.nbJoursPecOrget = this.nbjourspecorget;
              this.selectedconcerne.nbJoursPecProj = this.nbjourspecproj;
              this.selectedconcerne.nomOrgAr = this.nomOrgAr;
              this.selectedconcerne.nomOrgFr = this.nomOrgFr;
      }else alert("لا يمكن اجتياز مدة الامر");
      }//prise en charge departement seulement
      else if (this.departementsup && !this.orgetrangersup && !this.projetsup){
       this.fraismission.support.codeSupport = "I";
       this.fraismission.codeSupport = this.departement.codeDep;
       this.selectedconcerne.nbJoursPecDep = this.selectedconcerne.nbJoursP;
       if(this.selectedconcerne.nbJoursP > 20 ){
          if (this.couverture == "reduction"){
            this.fraismission.valeurPrevue = (this.selectedconcerne.nbJoursP * taux);
          }
          else if(this.couverture == "pecprive"){
            this.fraismission.valeurPrevue = 0;
          }
          else if (this.couverture == "residencepr"){
            this.fraismission.valeurPrevue = this.selectedconcerne.nbJoursP * taux / 3 +this.valeuraff;
          }
          else  this.fraismission.valeurPrevue = (20 * taux) + (this.selectedconcerne.nbJoursP-20 * taux)/3;
        }
        else {
          if (this.couverture == "reduction"){
            this.fraismission.valeurPrevue = (this.selectedconcerne.nbJoursP * taux);
          }
          else if(this.couverture == "pecprive"){
            this.fraismission.valeurPrevue = 0;
          }
          else if (this.couverture == "residencepr"){
            this.fraismission.valeurPrevue = this.selectedconcerne.nbJoursP * taux / 3 +this.valeuraff;
          }
          else this.fraismission.valeurPrevue = this.selectedconcerne.nbJoursP * taux;       
        }
      }
      else if (this.orgetrangersup && !this.projetsup && !this.departementsup){ // pec org etranger
       this.fraismission.support.codeSupport = "E";
       this.fraismission.codeSupport = this.departement.codeDep;
       this.selectedconcerne.nbJoursPecOrget = this.selectedconcerne.nbJoursP;
       this.selectedconcerne.nomOrgAr = this.nomOrgAr;
       this.selectedconcerne.nomOrgFr = this.nomOrgFr;
       if(this.selectedconcerne.nbJoursP > 20 ){
          if (this.couverture == "reduction"){
            this.fraismission.valeurPrevue = (this.selectedconcerne.nbJoursP * taux);
          }
          else if(this.couverture == "pecprive"){
            this.fraismission.valeurPrevue = 0;
          }
          else if (this.couverture == "residencepr"){
            this.fraismission.valeurPrevue = this.selectedconcerne.nbJoursP * taux / 3 +this.valeuraff;
          }
          else this.fraismission.valeurPrevue = this.selectedconcerne.nbJoursP * taux / 9;
        }
        else { 
            if (this.couverture == "reduction"){
              this.fraismission.valeurPrevue = (this.selectedconcerne.nbJoursP * taux);
            }
            else if(this.couverture == "pecprive"){
              this.fraismission.valeurPrevue = 0;
            }
            else if (this.couverture == "residencepr"){
              this.fraismission.valeurPrevue = this.selectedconcerne.nbJoursP * taux / 3 +this.valeuraff;
            }
            else this.fraismission.valeurPrevue = this.selectedconcerne.nbJoursP * taux  / 3;
          }
      }
      else if (this.projetsup && !this.departementsup && !this.orgetrangersup){ //pec projet complete
       this.fraismission.support.codeSupport = "A";
       this.fraismission.projet = this.selectedprog;
       this.selectedconcerne.nbJoursPecProj = this.selectedconcerne.nbJoursP;
          if(this.selectedconcerne.nbJoursP > 20 ){
            if (this.couverture == "reduction"){
              this.fraismission.valeurPrevue = (this.selectedconcerne.nbJoursP * taux);
            }
            else if(this.couverture == "pecprive"){
              this.fraismission.valeurPrevue = 0;
            }
            else if (this.couverture == "residencepr"){
              this.fraismission.valeurPrevue = this.selectedconcerne.nbJoursP * taux / 3 +this.valeuraff;
            }
            else this.fraismission.valeurPrevue = (20 * taux) + (this.selectedconcerne.nbJoursP-20 * taux)/3;
          }
          else  {
            if (this.couverture == "reduction"){
              this.fraismission.valeurPrevue = (this.selectedconcerne.nbJoursP * taux);
            }
            else if(this.couverture == "pecprive"){
              this.fraismission.valeurPrevue = 0;
            }
            else if (this.couverture == "residencepr"){
              this.fraismission.valeurPrevue = this.selectedconcerne.nbJoursP * taux / 3 +this.valeuraff;
            }
            else   this.fraismission.valeurPrevue = this.selectedconcerne.nbJoursP * taux;}
      }        
      this.selectedconcerne.fraisMission =  this.fraismission.valeurPrevue;
      this.ordremission.avance += this.selectedconcerne.fraisMission;
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
     else if(x=="A") return "تحمل مشترك"; 
   }
   verifPerso(){
     if(this.addedfraidiver.support.codeSupport == "P"){
      this.addedfraidiver.valeurPrevue = 0;
      this.isPersonal = true;
      this.proj = false;
      this.etr = false;
     }
     else if(this.addedfraidiver.support.codeSupport == "E"){
      this.proj = false;
      this.etr = true;
      this.isPersonal = false;
      this.addedfraidiver.valeurPrevue = null;
     }
     else if (this.addedfraidiver.support.codeSupport == "A"){
      this.etr = false;
      this.proj = true;
      this.isPersonal = false;
      this.addedfraidiver.valeurPrevue = null;
     }
     else{
      this.proj = false;
      this.etr = false;
      this.isPersonal = false;
      this.addedfraidiver.valeurPrevue = null;
     }
   }
 
}
