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
  constructor(public gradServ:GradeService,public router:Router) { }

  ngOnInit() {
    this.list = true;
    this.add = true;
    this.grd = new Grade();
    this.gradServ.getAllGrades().subscribe(data =>this.grds = data);
  }
  onSubmit(f:NgForm){
    this.gradServ.insertGrade(this.grd).then(()=>null);
    this.grds.push(this.grd);
  }
  deleteGrade(g:Grade){
    if(confirm("هل انت متأكد من إزالة "+g.libGradeAr+" ?")){
      this.gradServ.deleteGrade(g).then(()=>{
        this.grds = this.grds.filter(h=>h!==g);  });
      }
  }
  showInfosGrade(g:Grade){
      this.router.navigate(['th-grade/editGrade',g.idgrade]);
    }
  toggleGadd(){
    this.add = !this.add;
  }
  toggleList(){
    this.list = !this.list;
  }
} 
