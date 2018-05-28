import { Component, OnInit, group } from '@angular/core';
import { Missionaire } from '../model/missionaire';
import { NgForm } from '@angular/forms';
import { MissionaireServices } from '../model/missionaire.service';
import { DepartementService } from '../model/departement.service';
import { FonctionService } from '../model/fonction.service';
import { GradeService } from '../model/grade.service';
import { ClasseService } from '../model/classe.service';
import { CategorieService } from '../model/categorie.service';
import { Departement } from '../model/departement';
import { Fonction } from '../model/fonction';
import { Grade } from '../model/grade';
import { Classe } from '../model/classe';
import { Categorie } from '../model/categorie';
import { AffectMissDep } from '../model/affectmission';
import { Router } from '@angular/router';
import { Groupe } from '../model/groupe';
import { TauxGroupeServices } from '../model/tauxgroupe.service';

@Component({
  selector: 'app-m-missionaires',
  templateUrl: './m-missionaires.component.html',
  styleUrls: ['./m-missionaires.component.css']
})
export class MMissionairesComponent implements OnInit {
  missionaire:AffectMissDep = new AffectMissDep();
  missionaires:AffectMissDep[] = [];
  add:boolean = true;
  list:boolean = true;
  searchString:string;
  departement:Departement = new Departement();
  fonctions:Fonction[] = [];
  grades:Grade[] = [];
  classes:Classe[] = [];
  cats:Categorie[] = [];
  groupes:Groupe[] = [];
  modal:boolean = false;
  missionaire1:AffectMissDep = new AffectMissDep();
  vcin : boolean = false;
  vmatr:boolean = false;
  vnom:boolean = false;
  vnomfr : boolean = false;
  vprenomar : boolean = false;
   regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  constructor(public mserv:MissionaireServices,public depServ:DepartementService,
    public fonctserv:FonctionService,gradeServ:GradeService,classServ:ClasseService,
    public catserv:CategorieService,public router:Router,grserv:TauxGroupeServices) {
      gradeServ.getAllGrades().subscribe(gr=>this.grades = gr);
      this.departement = JSON.parse(localStorage.getItem('org'));
      classServ.getAllClasses().subscribe(cl=>this.classes = cl);
      fonctserv.getAlloncts().subscribe(f=>this.fonctions=f);
      catserv.getAllCats().subscribe(c=>this.cats=c);
      mserv.getAllMissOfDep(this.departement.codeDep).subscribe(m=>this.missionaires = m);
      grserv.getAllGroupes().subscribe(g=>this.groupes = g);
    }

  ngOnInit() {
    this.missionaire.missionaire.fonction = null;
    this.missionaire.missionaire.categorie = null;
    this.missionaire.missionaire.classe= null;
    this.missionaire.missionaire.grade = null;
    this.missionaire.missionaire.groupe = null;
  }
  toggleAdd(){
    this.add = ! this.add;
  }
  toggleList(){
    this.list = ! this.list;
  }
  deleteMissionaire(m:AffectMissDep){
    if(confirm("هل انت متأكد من إزالة "+m.missionaire.nomAr+" "+m.missionaire.prenomAr+" ?")){
      this.mserv.deleteMissionaire(m.missionaire.idMissionaire,m.idAffectation).subscribe(()=>{
        this.missionaires = this.missionaires.filter(h=>h!==m);  });
      }
  }
  showInfosMissionaire(m:AffectMissDep){
    this.missionaire1 = m;
    this.missionaire1.missionaire.grade.codeGrade = m.missionaire.grade.codeGrade;
    this.toggleModal();
  }
  onSubmit(f:NgForm){
    this.missionaire.departement = this.departement;
    this.mserv.insertMissionaire(this.missionaire).subscribe(data=>this.missionaires.push(data));
  }
  toggleModal(){this.modal = !this.modal;}
  updateUser(){
    this.mserv.updateAffectMissionaire(this.missionaire1).subscribe(res=>{
      this.toggleModal();
      this.missionaire1 = new AffectMissDep();
      alert("تم");
    })
  }
  exitModal(){
    
    this.mserv.getAllMissOfDep(this.departement.codeDep).subscribe(a=>{
      this.toggleModal();
      this.missionaire1 = new AffectMissDep();
      this.missionaires = [];
      this.missionaires = a;
    })
  }

  checkcin(event){
    if(this.missionaire.missionaire.cin && event){
       event.length == 8 || this.missionaire.missionaire.cin.toString().length == 8? this.vcin = true : this.vcin = false;
    }else this.vcin = false
}

checkmatr(event){
  if(this.missionaire.missionaire.matricule && event){
     event.length >= 4 || this.missionaire.missionaire.matricule.toString().length >= 4? this.vmatr = true : this.vmatr = false;
  }else this.vmatr = false
}
checknom(event){ // nom ar 
  if(this.missionaire.missionaire.prenomAr && event){
    let str = this.missionaire.missionaire.prenomAr;
    for (let index = 0; index <str.length; index++) { Number(str[index]) || this.regex.test(str[index]) ? this.vnom = false : this.vnom = true;}
  }else this.vnom = false
}

checknomfr(event){ // nom fr
  if(this.missionaire.missionaire.prenomFr && event){
    let str = this.missionaire.missionaire.prenomFr;
    for (let index = 0; index <str.length; index++) { Number(str[index]) || this.regex.test(str[index]) ? this.vnomfr = false : this.vnomfr = true;}
  }else this.vnomfr = false
}

checkprenomar(event){ // prenom ar
  if(this.missionaire.missionaire.nomAr && event){
    let str = this.missionaire.missionaire.nomAr;
    for (let index = 0; index <str.length; index++) { Number(str[index]) || this.regex.test(str[index]) ? this.vprenomar = false : this.vprenomar = true;}
  }else this.vprenomar = false
}
}
