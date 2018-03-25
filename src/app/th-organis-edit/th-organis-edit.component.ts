import { Component, OnInit } from '@angular/core';
import { TypeDep } from '../model/typeDep';
import { Departement } from '../model/departement';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DepartementService } from '../model/departement.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-th-organis-edit',
  templateUrl: './th-organis-edit.component.html',
  styleUrls: ['./th-organis-edit.component.css']
})
export class ThOrganisEditComponent implements OnInit {
  typedeps:TypeDep[];
  dep:Departement;
  constructor(public router:Router,public depserv:DepartementService,public route:ActivatedRoute) {
    this.route.params.switchMap((params:Params)=>this.depserv.getDepartement(+params['id']+"")).
    subscribe(th=>this.dep = th);
    depserv.getAllTypeDeps().subscribe(t=>this.typedeps = t);
   }

  ngOnInit() {
    this.dep = new Departement();
  }
  confirm(){
    this.router.navigate(['/th-org'])
  }
  onSubmit(f:NgForm){
    this.depserv.updateDep(this.dep).then(()=>null);
   // this.confirm();
  }
  modifcode(){
    this.dep.codeDep = this.dep.codeDep.substring(0,4) + this.dep.typedep.idtypedep + this.dep.codeDep.substring(5,this.dep.codeDep.length);
  }
}
