import { Component, OnInit } from '@angular/core';
import { Categorie } from '../model/categorie';
import { CategorieService } from '../model/categorie.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-th-categories',
  templateUrl: './th-categories.component.html',
  styleUrls: ['./th-categories.component.css']
})
export class ThCategoriesComponent implements OnInit {
  cat:Categorie;
  cats:Categorie[];
  add:boolean;
  list:boolean;
  searchString:string;
  constructor(public catserv:CategorieService,public router:Router) { }

  ngOnInit() {
    this.add = true;
    this.list = true;
    this.cat = new Categorie();
    this.catserv.getAllCats().subscribe(data=>this.cats = data);

  }
  onSubmit(f:NgForm){
    this.catserv.insertCat(this.cat).then(()=>null);
    this.cats.push(this.cat);
  }
  deleteCateg(c:Categorie){
    if(confirm("هل انت متأكد من إزالة "+c.libCatAr+" ?")){
      this.catserv.deleteCat(c).then(()=>{
        this.cats = this.cats.filter(h=>h!==c);  });
      }
  }
  showInfosCateg(c:Categorie){
    this.router.navigate(['th-categories/editCat',c.idcat]);
  }
  toggleAdd(){
    this.add = ! this.add;
  }
  toggleList(){
    this.list = ! this.list;
  }
}
