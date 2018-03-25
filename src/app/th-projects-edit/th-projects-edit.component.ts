import { Component, OnInit } from '@angular/core';
import { Projet } from '../model/projets';
import { ProjetService } from '../model/projet.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-th-projects-edit',
  templateUrl: './th-projects-edit.component.html',
  styleUrls: ['./th-projects-edit.component.css']
})
export class ThProjectsEditComponent implements OnInit {
  proj:Projet;
  constructor(public projS:ProjetService,public router:Router,public route:ActivatedRoute) {
    this.route.params.switchMap((params:Params)=>this.projS.getProjet(+params['id'])).
    subscribe(th=>this.proj = th);
   }

  ngOnInit() {
    this.proj = new Projet();
  }
  onSubmit(f:NgForm){
    
  }
  confirmer(){
    this.router.navigate(['th-projects']);
  }

}
