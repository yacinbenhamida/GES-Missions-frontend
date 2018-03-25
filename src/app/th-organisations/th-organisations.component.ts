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
  constructor(public depserv:DepartementService,public router:Router) { 
    this.dep = new Departement();
    this.currentDep = JSON.parse(localStorage.getItem('org'));
    this.ministere = this.currentDep.codeDep;
    this.newcodeDep = this.ministere;
    depserv.getAllOrgsFromOfcurrentm(this.ministere).subscribe(dep=>this.deps = dep);
    depserv.getAllTypeDeps().subscribe(t=>this.typedeps = t);
  }

  ngOnInit() {
    this.add = true;
    this.list = true;
  }
  onSubmit(f:NgForm){
    this.dep.codeDep = this.newcodeDep;
      this.depserv.insertDep(this.dep).then(()=>null);
     this.deps.push(this.dep);
  }

  deleteDep(dep:Departement){
    if(confirm("هل انت متأكد من إزالة "+dep.libDepAr+" ?")){
      this.depserv.deleteDep(dep).then(()=>{
        this.deps = this.deps.filter(h=>h!==dep);  });
      }
  }
  showInfosDep(dep:Departement){
    this.router.navigate(['th-org/editOrg',dep.codeDep]);
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
  /*  if((this.newcodeDep.substring(3,this.newcodeDep.length)) == null ||  (this.newcodeDep.substring(3,this.newcodeDep.length)==undefined)){
      this.newcodeDep = this.newcodeDep+"000";
    }*/
    //this.newcodeDep = this.newcodeDep.substring(0,2) + this.dep.typedep.idtypedep + this.newcodeDep.substring(3,this.newcodeDep.length);
  }
}
