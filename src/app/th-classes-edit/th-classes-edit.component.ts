import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../model/classe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Classe } from '../model/classe';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-th-classes-edit',
  templateUrl: './th-classes-edit.component.html',
  styleUrls: ['./th-classes-edit.component.css']
})
export class ThClassesEditComponent implements OnInit {
  classe:Classe;
  constructor(public clserv:ClasseService,public router:Router,public route:ActivatedRoute) 
  {
    this.route.params.switchMap((params:Params)=>this.clserv.getClasse(+params['id'])).
    subscribe(th=>this.classe = th);
   }

  ngOnInit() {
    this.classe = new Classe();
  }
  confirmer(){
    this.router.navigate(['th-classes']);
  }
  onSubmit(f:NgForm){
    this.clserv.updateClasse(this.classe).then(()=>null);
    this.router.navigate(['th-classes']);
  }

}
