import { Component, OnInit, ChangeDetectorRef, NgModule } from '@angular/core';
import { MotCle } from '../model/motcle';
import { MotCleService } from '../model/motcle.service';
import { Theme } from '../model/theme';
import { ThemeService } from '../model/theme.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-th-keywords',
  templateUrl: './th-keywords.component.html',
  styleUrls: ['./th-keywords.component.css']
})
export class ThKeywordsComponent implements OnInit {
  theme:Theme;
  themes:Theme[];
  themelist:Theme[];
  motcle:MotCle;
  motcles:MotCle[];
  sujvisible:boolean;
  keywvisible:boolean;
  listvisible:boolean;
  listkwvisible:boolean;
  searchString:string;
  searchString2:string;
  constructor(public motcleServ:MotCleService,public themeServ:ThemeService,public router:Router) {
    themeServ.getAllThemes().subscribe(data=>this.themelist = data);
   }

  ngOnInit() {
    this.theme = new Theme();
    this.motcle = new MotCle();
    this.motcleServ.getAllMC().subscribe(data=>this.motcles = data);
    this.themeServ.getAllThemes().subscribe(data=>this.themes= data );
    this.sujvisible =true;
    this.keywvisible = true;
    this.listvisible = true;
    this.listkwvisible = true;
  }
  isEmpty(obj){
    return (obj && (Object.keys(obj).length === 0));
  }
  onSubmit(f:NgForm){
    this.themeServ.insertTheme(this.theme).then(data=>{this.themes.push(data);
    this.themelist.push(data);});
  }
  onSubmit2(fa:NgForm){
    this.motcleServ.insertMC(this.motcle).then(data=>{
      this.motcles.push(data);
    }
  );
  }
  showInfosTheme(th:Theme){
    this.router.navigate(['/th-keywords/editTheme',th.idtheme]);
  }
  showInfosMC(mc:MotCle){
    this.router.navigate(['/th-keywords/editkeyWord',mc.idmotCle]);
  }
  deleteTheme(th:Theme){
    if(confirm("هل انت متأكد من إزالة "+th.libThemeAr+" ?")){
    this.themeServ.deleteTheme(th).then(()=>{
      this.themes = this.themes.filter(h=>h!==th);  });
      this.themeServ.getAllThemes().subscribe(data=>this.themelist = data);
    }
  }
  deleteMc(mc:MotCle){
    if(confirm("هل انت متأكد من إزالة "+mc.libMcAr+" ?")){
    this.motcleServ.deleteMC(mc).then(()=> this.motcles = this.motcles.filter(h=>h!==mc));
    this.motcleServ.getAllMC().subscribe(data=>this.motcles = data);
    }
  }
  toggleAddSuj(){
    this.sujvisible = !(this.sujvisible);
  }
  toggleAddKw(){
    this.keywvisible = ! (this.keywvisible);
  }
  toggleList(){
    this.listvisible = !(this.listvisible);
  }
  toggleListKw(){
    this.listkwvisible = !(this.listkwvisible);
  }
}
