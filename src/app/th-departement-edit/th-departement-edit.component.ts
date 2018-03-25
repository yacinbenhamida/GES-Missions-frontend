import { Component, OnInit } from '@angular/core';
import { Departement } from '../model/departement';
import { DepartementService } from '../model/departement.service';
import { Route, Router, Params, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-th-departement-edit',
  templateUrl: './th-departement-edit.component.html',
  styleUrls: ['./th-departement-edit.component.css']
})
export class ThDepartementEditComponent implements OnInit {
  dep:Departement;
  constructor(public depServ:DepartementService,public router:Router,public route:ActivatedRoute) { 
    this.route.params.switchMap((params:Params)=>this.depServ.getDepartement(+params['id']+"")).
    subscribe(th=>this.dep = th);
  }

  ngOnInit() {
    this.dep = new Departement();
  }
  confirm(){
    this.router.navigate(['th-departements']);
  }
  onSubmit(f:NgForm){
    this.depServ.updateDep(this.dep).then(()=>null);
    alert("done");
    this.confirm();
  }
}
