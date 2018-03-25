import { Component, OnInit } from '@angular/core';
import { GradeService } from '../model/grade.service';
import { Router, Route, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Grade } from '../model/grade';

@Component({
  selector: 'app-th-grade-edit',
  templateUrl: './th-grade-edit.component.html',
  styleUrls: ['./th-grade-edit.component.css']
})
export class ThGradeEditComponent implements OnInit {
  grd:Grade;
  constructor(public gradeServ:GradeService,public router:Router,public route:ActivatedRoute) { 
    this.route.params.switchMap((params:Params)=>this.gradeServ.getGrade(+params['id'])).
    subscribe(th=>this.grd = th);
  }

  ngOnInit() {
    this.grd = new Grade();
  }
  confirmer(){
    this.router.navigate(['th-grade']);
  }
  onSubmit(f:NgForm){
    this.gradeServ.updateGrade(this.grd).then(()=>null);
    this.router.navigate(['th-grade']);
  }
}
