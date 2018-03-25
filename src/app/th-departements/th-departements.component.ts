import { Component, OnInit } from '@angular/core';
import { Departement } from "../model/departement";
import { DepartementService } from "../model/departement.service";
import {DataTableModule} from "angular2-datatable";
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-th-departements',
  templateUrl: './th-departements.component.html',
  styleUrls: ['./th-departements.component.css'],
  providers : [DepartementService]
})
export class ThDepartementsComponent implements OnInit {
  dep:Departement;
  deps:Departement[];
  add:boolean;
  list:boolean;
  constructor(public depserv:DepartementService,public router:Router) { 
    this.dep = new Departement();
    this.depserv.getAllDepsOfCurrentType(5).subscribe(dep=>this.deps = dep);
  }

  ngOnInit() {
    this.add = true;
    this.list = true;
  }
  onSubmit(f:NgForm){
    this.dep.typedep.idtypedep = 5;
      this.depserv.insertDep(this.dep).then(()=>null);
  }

  deleteDep(dep:Departement){
    if(confirm("هل انت متأكد من إزالة "+dep.libDepAr+" ?")){
      this.depserv.deleteDep(dep).then(()=>{
        this.deps = this.deps.filter(h=>h!==dep);  });
      }
  }
  showInfosDep(dep:Departement){
    this.router.navigate(['th-departements/editDep',dep.codeDep]);
  }
  toggleList(){
    this.list = ! this.list;
  }
  toggleDadd(){
    this.add = ! this.add;
  }
}
