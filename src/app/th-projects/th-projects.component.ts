import { Component, OnInit } from '@angular/core';
import { Projet } from '../model/projets';
import { ProjetService } from '../model/projet.service';
import { Departement } from '../model/departement';
import { DepartementService } from '../model/departement.service';
import { AvoirBudgProg } from '../model/AvoirBudgProg';
import { NgForm } from '@angular/forms';
import { BudgetService } from '../model/Budget.service';
import {Pipe, PipeTransform} from "@angular/core";
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-th-projects',
  templateUrl: './th-projects.component.html',
  styleUrls: ['./th-projects.component.css']
})
export class ThProjectsComponent implements OnInit {
  proj:Projet;
  projets:Projet[];
  visibleAdd:boolean;
  visibleList :boolean;
  departement:Departement;
  searchString:string;
  modal:boolean = false;
  proj1:Projet = new Projet();
  constructor(public router:Router,public projserv:ProjetService) {
   
    
   }
   isEmpty(obj){
    return (obj && (Object.keys(obj).length === 0));
  }
  ngOnInit() {
    this.departement =   JSON.parse(localStorage.getItem('org'));
    this.projserv.getProjectsOfDepartment(this.departement.codeDep).subscribe(data=>this.projets = data);
    this.proj = new Projet();
    this.visibleAdd = true;
    this.visibleList = true;
  }
  onSubmit(f:NgForm){
      this.proj.departement = this.departement;
      this.projserv.insertProjet(this.proj).then((b)=>{
        this.projets.push(b);  
        alert("تم");
      });

  }
  showInfosProj(p:Projet){
    this.proj1 = p;
    this.toggleModal();
  }
  deleteProj(p:Projet){
    if(confirm("هل انت متأكد من إزالة "+p.libProjAr+" ?")){
      this.projserv.deleteProjet(p).then(()=> this.projets = this.projets.filter(h=>h!==p));
      }
  }
  toggleAdd(){
    this.visibleAdd = !(this.visibleAdd);
  }
  toggleList(){
    this.visibleList = !(this.visibleList);
  }
  toggleModal(){this.modal = !this.modal;}
  editProj(){
    this.projserv.updateProjet(this.proj1).then(a=>{alert("تم التغيير");this.toggleModal()});
  }
  exitEdit(){
    this.projserv.getProjectsOfDepartment(this.departement.codeDep).subscribe(data=>{
      this.projets = data
      this.toggleModal();
        });
  }
}
