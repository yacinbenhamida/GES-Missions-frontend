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
  modal:boolean = false;
  dep2:Departement = new Departement();
  constructor(public depserv:DepartementService) { 
    this.dep = new Departement();
    this.depserv.getAllDepsOfCurrentType(5).subscribe(dep=>this.deps = dep); // id =5 ministéres 
  }

  ngOnInit() {
    this.add = true;
    this.list = true;
  }
  onSubmit(f:NgForm){
    this.dep.typedep.idtypedep = 5;
      this.depserv.insertDep(this.dep).then(a=>this.deps.push(a));
      alert("تم");
  }

  deleteDep(dep:Departement){
    if(confirm("هل انت متأكد من إزالة "+dep.libDepAr+" ?")){
      this.depserv.deleteDep(dep).then(()=>{
        this.deps = this.deps.filter(h=>h!==dep);  });
      }
  }
  showInfosDep(dep:Departement){
    this.dep2 = dep;
    this.toggleModal();
  }
  toggleList(){
    this.list = ! this.list;
  }
  toggleDadd(){
    this.add = ! this.add;
  }
  toggleModal(){
    this.modal = !this.modal;
  }
  editDep(){
    this.depserv.updateDep(this.dep2).then(x=>null);
    alert("تم");
    this.toggleModal();
  }
  exitEdit(){
    this.depserv.getAllDepsOfCurrentType(5).subscribe(dep=>
      {this.deps = dep;
        this.toggleModal();
      });

  }

}
