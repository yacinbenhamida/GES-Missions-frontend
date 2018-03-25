import { Component, OnInit } from '@angular/core';
import { Zonepays } from '../model/zonepays';
import { ZonePaysService } from '../model/zonepays.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-th-edit-zone',
  templateUrl: './th-edit-zone.component.html',
  styleUrls: ['./th-edit-zone.component.css']
})
export class ThEditZoneComponent implements OnInit {
zone:Zonepays;

  constructor(public service:ZonePaysService,public router:Router,public route:ActivatedRoute) { 
    this.route.params.switchMap((params:Params)=>this.service.getZone(+params['id'])).
    subscribe(th=>this.zone = th);
  }
  confirmer(){
    this.router.navigate(['/th-zone']);
  }
  ngOnInit() {
    this.zone = new Zonepays();
  }
  onSubmit(f:NgForm){
    this.service.updateZone(this.zone).then(()=>null);
    this.router.navigate(['/th-zone']);
  }

}
