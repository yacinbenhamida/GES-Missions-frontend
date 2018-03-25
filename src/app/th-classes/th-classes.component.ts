import { Component, OnInit } from '@angular/core';
import { Classe } from '../model/classe';
import { ClasseService } from "../model/classe.service";
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-th-classes',
  templateUrl: './th-classes.component.html',
  styleUrls: ['./th-classes.component.css']
})
export class ThClassesComponent implements OnInit {
  classe:Classe;
  classes:Classe[];
  add:boolean;
  list:boolean;
  searchString:string;
  constructor(public clserv:ClasseService,public router:Router) { }

  ngOnInit() {
    this.add = true;
    this.list = true;
    this.classe = new Classe();
    this.clserv.getAllClasses().subscribe(data=>this.classes = data);
  }
  onSubmit(f:NgForm){
    this.clserv.insertClasse(this.classe).then(()=>null);
    alert("تم اضافة المجموعة");
    this.classes.push(this.classe);
  }
  deleteClasse(cl:Classe){
    if(confirm("هل انت متأكد من إزالة "+cl.libClasseAr+" ?")){
      this.clserv.deleteClasse(cl).then(()=>{
        this.classes = this.classes.filter(h=>h!==cl);  });
      }
  }
  showInfosClasse(cl:Classe){
    this.router.navigate(['th-classes/editClass',cl.idclasse]);
  }
  toggleCadd(){
    this.add = ! this.add;
  }
  toggleList(){
    this.list = !this.list;
  }
}
