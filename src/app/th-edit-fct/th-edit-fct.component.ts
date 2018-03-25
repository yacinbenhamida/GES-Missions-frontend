import { Component, OnInit } from '@angular/core';
import { Fonction } from '../model/fonction';
import { FonctionService } from '../model/fonction.service';
import { Route, Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-th-edit-fct',
  templateUrl: './th-edit-fct.component.html',
  styleUrls: ['./th-edit-fct.component.css']
})
export class ThEditFctComponent implements OnInit {
  fct:Fonction;
  constructor(public fonctServ:FonctionService,public router:Router,public route:ActivatedRoute) { 
    this.route.params.switchMap((params:Params)=>this.fonctServ.getFonct(+params['id'])).
    subscribe(th=>this.fct = th);
  }

  ngOnInit() {
    this.fct = new Fonction();
  }
  confirmer(){
    this.router.navigate(['/th-fonct'])
  }
  onSubmit(f:NgForm){
    this.fonctServ.updateFonct(this.fct).then(()=>null);
    this.router.navigate(['/th-fonct'])
  }
}
