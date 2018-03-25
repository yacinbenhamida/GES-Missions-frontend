import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Theme } from '../model/theme';
import { ThemeService } from '../model/theme.service';
import 'rxjs/add/operator/switchMap';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-th-theme-edit',
  templateUrl: './th-theme-edit.component.html',
  styleUrls: ['./th-theme-edit.component.css']
})
export class ThThemeEditComponent implements OnInit {
  theme:Theme;
  theme1:Theme;
  constructor(public route:ActivatedRoute,public themeServ:ThemeService,public location:Location,public router:Router) { 
    this.route.params.switchMap((params:Params)=>this.themeServ.getTheme(+params['id'])).
    subscribe(th=>this.theme = th);
   // console.log(this.theme);
  }

  ngOnInit() {
    this.theme = new Theme();
    this.theme1 = new Theme();
  }
  confirmer(){
    this.router.navigate(['/th-keywords'])
  }
  onSubmit(f:NgForm){
    this.themeServ.updateTheme(this.theme).then(()=>null);
    this.router.navigate(['/th-keywords'])
  }
}
