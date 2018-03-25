import { Component, OnInit } from '@angular/core';
import { MissionaireServices } from '../model/missionaire.service';
import { FonctionService } from '../model/fonction.service';
import { GradeService } from '../model/grade.service';
import { ClasseService } from '../model/classe.service';
import { CategorieService } from '../model/categorie.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Missionaire } from '../model/missionaire';
import { Categorie } from '../model/categorie';
import { Classe } from '../model/classe';
import { Grade } from '../model/grade';
import { Fonction } from '../model/fonction';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-m-missionaires-edit',
  templateUrl: './m-missionaires-edit.component.html',
  styleUrls: ['./m-missionaires-edit.component.css']
})
export class MMissionairesEditComponent implements OnInit {
  missionaire:Missionaire = new Missionaire();
  cats:Categorie[] = [];
  classes:Classe[] = [];
  grades:Grade[] = [];
  fonctions:Fonction[] = [];
  constructor(public mserv:MissionaireServices , public fonctserv:FonctionService,
    public gradeServ:GradeService,classServ:ClasseService,
    public catserv:CategorieService,public router:Router,public route:ActivatedRoute) 
  { gradeServ.getAllGrades().subscribe(gr=>this.grades = gr);
    this.route.params.switchMap((params:Params)=>this.mserv.getMissionaire(+params['id'])).
    subscribe(th=>this.missionaire = th);
    classServ.getAllClasses().subscribe(cl=>{this.classes = cl;
    });
      fonctserv.getAlloncts().subscribe(f=>this.fonctions=f);
      catserv.getAllCats().subscribe(c=>this.cats=c);
  }

  ngOnInit() {
  }
  confirmer(){
    this.router.navigate(['m-missionaires']);
  }
  onSubmit(f:NgForm){
    this.mserv.updateMissionaire(this.missionaire).subscribe(()=>null);
    alert("تم !");
    this.confirmer();
  }
}
