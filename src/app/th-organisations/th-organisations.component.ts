import { Component, OnInit } from '@angular/core';
import { Departement } from '../model/departement';
import { DepartementService } from '../model/departement.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeDep } from '../model/typeDep';

@Component({
  selector: 'app-th-organisations',
  templateUrl: './th-organisations.component.html',
  styleUrls: ['./th-organisations.component.css']
})
export class ThOrganisationsComponent implements OnInit {
  typedeps:TypeDep[];
  dep:Departement;
  deps:Departement[];
  add:boolean;
  list:boolean;
  currentDep:Departement;
  ministere:string;
  newcodeDep:string = '';
  newcodeDep2:string = '';
  dep2:Departement = new Departement();
  modal:boolean = false;
  constructor(public depserv:DepartementService,public router:Router) { 
    this.dep = new Departement();
    this.currentDep = JSON.parse(localStorage.getItem('org'));
    this.ministere = this.currentDep.codeDep;
    this.newcodeDep = this.ministere;
    depserv.getAllOrgsFromOfcurrentm(this.ministere).subscribe(dep=>this.deps = dep);
    depserv.getAllTypeDeps().subscribe(t=>{
      this.typedeps = t;
      this.typedeps.forEach(element => {
          if(element.idtypedep == 5){
            this.typedeps = this.typedeps.filter(h=>h!==element);
          }
      });
      
    });
  }

  ngOnInit() {
    this.add = true;
    this.list = true;
  }
  onSubmit(f:NgForm){
    this.dep.codeDep = this.newcodeDep;
      this.depserv.insertDep(this.dep).then(depa=>this.deps.push(depa));
  }

  deleteDep(dep:Departement){
    if(confirm("هل انت متأكد من إزالة "+dep.libDepAr+" ?")){
      this.depserv.deleteDep(dep).then(()=>{
        this.deps = this.deps.filter(h=>h!==dep);  });
      }
  }
  showInfosDep(dep:Departement){
    this.toggleModal();
    this.dep2 = dep;
  }
  toggleList(){
    this.list = ! this.list;
  }
  toggleDadd(){
    this.add = ! this.add;
  }
  modifcode(){
    this.depserv.getLatestDepCode(this.ministere,this.dep.typedep.idtypedep+"").
    subscribe(d=>{
      if(d!=null && d!=undefined && d!='' && d.substring(4,d.length)!=null && d.length!=0 && d.length>3){
      this.newcodeDep =(Number(d)+1).toString()}
      else if(d!=null || d!=undefined && d=='' && d.length <= 3 && this.newcodeDep.length<6){
        this.newcodeDep = this.ministere+d+this.dep.typedep.idtypedep +"001";
      }
      else return;
    });
  }
  modifcode2(){
    this.depserv.getLatestDepCode(this.ministere,this.dep2.typedep.idtypedep+"").
    subscribe(d=>{
      if(d!=null && d!=undefined && d!='' && d.substring(4,d.length)!=null && d.length!=0 && d.length>3){
      this.newcodeDep2 =(Number(d)+1).toString()}
      else if(d!=null || d!=undefined && d=='' && d.length <= 3 && this.newcodeDep.length<6){
        this.newcodeDep2 = this.ministere+d+this.dep2.typedep.idtypedep +"001";
      }
      else return;
    });
  }
  toggleModal(){
    this.modal = !this.modal;
  }
  editDep(){
    this.dep2.codeDep = this.newcodeDep2;
    this.depserv.updateDep(this.dep2).then(x=>alert("تم"));
    this.toggleModal();
  }
}
