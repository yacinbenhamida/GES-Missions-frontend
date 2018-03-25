import { Component, OnInit } from '@angular/core';
import { Categorie } from '../model/categorie';
import { CategorieService } from '../model/categorie.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-th-categ-edit',
  templateUrl: './th-categ-edit.component.html',
  styleUrls: ['./th-categ-edit.component.css']
})
export class ThCategEditComponent implements OnInit {
  cat:Categorie;
  constructor(public catServ:CategorieService,public router:Router,public route:ActivatedRoute) { 
    this.route.params.switchMap((params:Params)=>this.catServ.getCat(+params['id'])).
    subscribe(th=>this.cat = th);
  }

  ngOnInit() {
    this.cat = new Categorie();
  }
  confirmer(){
    this.router.navigate(['th-categories']);
  }
  onSubmit(f:NgForm){
    this.catServ.updateCat(this.cat).then(()=>null);
    this.router.navigate(['/th-categories']);
  }
}
