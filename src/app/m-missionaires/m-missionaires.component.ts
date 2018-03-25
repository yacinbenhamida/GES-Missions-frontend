import { Component, OnInit } from '@angular/core';
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
  constructor(public mserv:MissionaireServices,public depServ:DepartementService,
    public fonctserv:FonctionService,gradeServ:GradeService,classServ:ClasseService,public catserv:CategorieService,public router:Router) {
      gradeServ.getAllGrades().subscribe(gr=>this.grades = gr);
      this.departement = JSON.parse(localStorage.getItem('org'));
      classServ.getAllClasses().subscribe(cl=>this.classes = cl);
      fonctserv.getAlloncts().subscribe(f=>this.fonctions=f);
      catserv.getAllCats().subscribe(c=>this.cats=c);
      mserv.getAllMissOfDep(this.departement.codeDep).subscribe(m=>this.missionaires = m);
    }

  ngOnInit() {
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
    this.router.navigate(['m-missionaires/editMissionaire',m.missionaire.idMissionaire]);
  }
  onSubmit(f:NgForm){
    this.missionaire.departement = this.departement;
    this.mserv.insertMissionaire(this.missionaire).subscribe(data=>this.missionaires.push(this.missionaire));
  }
}
