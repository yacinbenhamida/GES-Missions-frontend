import { Component, OnInit } from '@angular/core';
import { Pays } from '../model/pays';
import { Zonepays } from '../model/zonepays';
import { PaysService } from '../model/pays.service';
import { ZonePaysService } from '../model/zonepays.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-th-countries-edit',
  templateUrl: './th-countries-edit.component.html',
  styleUrls: ['./th-countries-edit.component.css']
})
export class ThCountriesEditComponent implements OnInit {
  pays:Pays;
  zone:Zonepays[];

  constructor(public paysServ:PaysService,public zoneserv:ZonePaysService,public router:Router,public route:ActivatedRoute) {
    this.route.params.switchMap((params:Params)=>this.paysServ.getPays(+params['id'])).
    subscribe(th=>this.pays = th);
   }

  ngOnInit() {
    this.zoneserv.getAllZones().subscribe(data=>this.zone = data);
    this.pays = new Pays();
  }
  onSubmit(f:NgForm){
    this.paysServ.updatePays(this.pays).then(()=>null);
    this.router.navigate(['/th-countries']);
  }
  confirmer(){
    this.router.navigate(['/th-countries']);
  }
}
