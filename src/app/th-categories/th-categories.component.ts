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
  cat2:Categorie = new Categorie();
  add:boolean;
  list:boolean;
  searchString:string;
  modal:boolean = false;
  constructor(public catserv:CategorieService,public router:Router) { }

  ngOnInit() {
    this.add = true;
    this.list = true;
    this.cat = new Categorie();
    this.catserv.getAllCats().subscribe(data=>this.cats = data);

  }
  onSubmit(f:NgForm){
    this.catserv.insertCat(this.cat).then(x=>
      {
        this.cats.push(x);
      });
      alert('تم');
      f.reset();
  }
  deleteCateg(c:Categorie){
    if(confirm("هل انت متأكد من إزالة "+c.libCatAr+" ?")){
      this.catserv.deleteCat(c).then(()=>{
        this.cats = this.cats.filter(h=>h!==c);  });
      }
  }
  showInfosCateg(c:Categorie){
    this.cat2 = c;
    this.toggleModal();
  }
  toggleAdd(){
    this.add = ! this.add;
  }
  toggleList(){
    this.list = ! this.list;
  }
  editCat(){
    this.catserv.updateCat(this.cat2).then(()=>null);
    this.toggleModal();
  }
  toggleModal(){
    this.modal = !this.modal;
  }
  exitEdit(){
    this.catserv.getAllCats().subscribe(data=>{this.cats = data;this.toggleModal()});

  }
}
