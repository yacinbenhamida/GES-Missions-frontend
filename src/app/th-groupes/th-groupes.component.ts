import { Component, OnInit } from '@angular/core';
import { Groupe } from '../model/groupe';
import { TauxGroupeServices } from '../model/tauxgroupe.service';
import { Taux } from '../model/taux';
import { NgForm } from '@angular/forms';
import { error } from 'util';

@Component({
  selector: 'app-th-groupes',
  templateUrl: './th-groupes.component.html',
  styleUrls: ['./th-groupes.component.css']
})
export class ThGroupesComponent implements OnInit {
  grps:Groupe[] = [];
  groupe:Groupe = new Groupe();
  groupeadd:Groupe = new Groupe();
  taux:Taux [] = [];
  tauxtoadd:Taux = new Taux();
  add:boolean = true;
  addtaux:boolean = true;
  list:boolean = true;
  searchString:string;
  listt:boolean = true;
  modal:boolean = false;
  constructor(public tauxgrservice:TauxGroupeServices) { 
    tauxgrservice.getAllGroupes().subscribe(a=>this.grps=a);
    tauxgrservice.getAllTaux().subscribe(t=>this.taux=t);
  }

  ngOnInit() {
    this.groupeadd.taux = null;
    
  }
  toggleList(){
    this.list = ! this.list;
  }
  toggleAdd(){
    this.add = !this.add;
  }
  onSubmit(f:NgForm){

  }
  validate(){
    this.tauxgrservice.insertGroupe(this.groupeadd).then(x=>alert("تمة الاضافة"));
  }
  showInfosGrp(x:Groupe){
    this.modal = true;
    this.groupe = x;
    this.groupe.taux.idTaux = x.taux.idTaux;
  }
  saveEdition(){
    this.tauxgrservice.updateGroupe(this.groupe).then(x=>alert("تم التغيير"));
    this.modal = false;
    this.groupe = new Groupe();
  }
  delTaux(u:Taux){
    if(confirm("هل انتا متأكد من التخلي عن هذه المنحة ؟")){
    this.tauxgrservice.deleteTaux(u).then(x=>alert("تم"),error=>alert("لا يمكن الغاء هذه المنحة"));
  }
  }
  deleteGrp(g:Groupe){
    if(confirm("هل انتا متأكد من التخلي عن هذه المجموعة ؟")){
      this.tauxgrservice.deleteGroupe(g).then(x=>alert("تم"),error=>alert("لا يمكن الغاء هذه المجموعة"));
    }
  }
}
