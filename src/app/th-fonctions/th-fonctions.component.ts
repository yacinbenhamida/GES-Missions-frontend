import { Component, OnInit , Output, EventEmitter, Input} from '@angular/core';
import { Fonction } from "../model/fonction";
import { FonctionService } from "../model/fonction.service";
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { Departement } from '../model/departement';
import {FilterPipe } from '../pipes/filter.pipe';
import { FnParam } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-th-fonctions',
  templateUrl: './th-fonctions.component.html',
  styleUrls: ['./th-fonctions.component.css']
})
export class ThFonctionsComponent implements OnInit {
  fct:Fonction;
  fcts:Fonction[];
  inputvisible:boolean;
  tablevisible:boolean;
  departement:Departement;
  fonctionitem:Fonction;
  searchString:string;
  modal:boolean = false;
  fonct:Fonction = new Fonction();
  constructor(public fonctServ:FonctionService) { }
  isEmpty(obj){
    return (obj && (Object.keys(obj).length === 0));
  }
  ngOnInit() {
    this.fonctionitem = new Fonction();
    this.departement = JSON.parse(localStorage.getItem('org'));
    this.inputvisible = true;
    this.tablevisible = true;
    this.fct = new Fonction();
     this.fonctServ.getAlloncts().subscribe(data=>this.fcts = data);
  }
  onSubmit(f:NgForm){
    this.fonctServ.insertFonct(this.fct).then(fct=>{this.fcts.push(fct);});
    alert("تم")
  }
  showInfosFct(fonction:Fonction){
    this.toggleModal();
    this.fonct = fonction;
  }

  deleteFonction(f:Fonction){
    if(confirm("هل انت متأكد من إزالة "+f.libFctAr+" ?")){
    this.fonctServ.deleteFonct(f).then(()=>{
      this.fcts = this.fcts.filter(h=>h!==f);  });
    }
}
    toggleList(){
    this.inputvisible = !(this.inputvisible);
    }
    toggleTable(){
        this.tablevisible = !(this.tablevisible);
    }
    filtertable(){
      if(this.searchString!='' || this.searchString != undefined){
     this.fcts=  this.fcts.filter(data=>data.libFctFr === this.searchString);}
     else this.fonctServ.getAlloncts().subscribe(data=>this.fcts = data);
    }
    toggleModal(){
      this.modal = !this.modal;
    }
    editFonct(){
      this.fonctServ.updateFonct(this.fonct).then(x=>alert("تم"));
      this.toggleModal();
    }
    exitEdit(){
      this.fonctServ.getAlloncts().subscribe(d=>{
        this.fcts = d;
        this.toggleModal();
      })
    }
}
