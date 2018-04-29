import { Component, OnInit } from '@angular/core';
import { Grade } from "../model/grade";
import { GradeService } from "../model/grade.service";
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-th-grade',
  templateUrl: './th-grade.component.html',
  styleUrls: ['./th-grade.component.css']
})
export class ThGradeComponent implements OnInit {
  grd:Grade;
  grds:Grade[];
  add:boolean;
  list:boolean;
  searchString:string;
  modal:boolean = false;
  grade:Grade = new Grade();
  constructor(public gradServ:GradeService,public router:Router) { }

  ngOnInit() {
    this.list = true;
    this.add = true;
    this.grd = new Grade();
    this.gradServ.getAllGrades().subscribe(data =>this.grds = data);
  }
  onSubmit(f:NgForm){
    this.gradServ.insertGrade(this.grd).then(x=>this.grds.push(x));
    f.reset();
  }
  deleteGrade(g:Grade){
    if(confirm("هل انت متأكد من إزالة "+g.libGradeAr+" ?")){
      this.gradServ.deleteGrade(g).then(()=>{
        this.grds = this.grds.filter(h=>h!==g);  });
      }
  }
  showInfosGrade(g:Grade){
      this.toggleModal();
      this.grade = g;
  }
  toggleGadd(){
    this.add = !this.add;
  }
  toggleList(){
    this.list = !this.list;
  }
  toggleModal(){
    this.modal = !this.modal;
  }
  editGrade(){
    this.gradServ.updateGrade(this.grade).then(x=>null);
    this.toggleModal();
    alert("تم");
  }
  exitEdit(){
    this.gradServ.getAllGrades().subscribe(
      t=>{
        this.grds = t;
        this.toggleModal();
      }
    )
  }
} 
