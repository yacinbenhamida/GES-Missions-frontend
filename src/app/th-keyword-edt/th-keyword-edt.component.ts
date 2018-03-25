import { Component, OnInit } from '@angular/core';
import { MotCle } from '../model/motcle';
import { MotCleService } from '../model/motcle.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Theme } from '../model/theme';
import { ThemeService } from '../model/theme.service';

@Component({
  selector: 'app-th-keyword-edt',
  templateUrl: './th-keyword-edt.component.html',
  styleUrls: ['./th-keyword-edt.component.css']
})
export class ThKeywordEdtComponent implements OnInit {
  motcle:MotCle;
  themes:Theme[];
  constructor(public themserv:ThemeService,public motcleserv:MotCleService,public route:ActivatedRoute,public router:Router) { 
    this.route.params.switchMap((params:Params)=>this.motcleserv.getMC(+params['id'])).
    subscribe(th=>this.motcle = th);
  }

  ngOnInit() {
    this.motcle = new MotCle();
    this.themserv.getAllThemes().subscribe(data=>this.themes = data);
  }
  confirmer(){
    this.router.navigate(['/th-keywords'])
  }
  onSubmit(f:NgForm){
    this.motcleserv.updateMC(this.motcle).then(()=>null);
    this.router.navigate(['/th-keywords'])
  }

}
