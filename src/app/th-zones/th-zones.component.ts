import { Component, OnInit } from '@angular/core';
import { Zonepays } from '../model/zonepays';
import { ZonePaysService } from '../model/zonepays.service';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-th-zones',
  templateUrl: './th-zones.component.html',
  styleUrls: ['./th-zones.component.css']
})
export class ThZonesComponent implements OnInit {
  zone:Zonepays;
  zones:Zonepays[];
  add:boolean;
  list:boolean;
  searchString:string;
  modal:boolean = false;
  zone2:Zonepays = new Zonepays();
  constructor(public zoneserv:ZonePaysService,public router:Router) { }

  ngOnInit() {
    this.add = true;
    this.list = true;
    this.zone = new Zonepays();
    this.zoneserv.getAllZones().subscribe(data =>this.zones = data);
  }
  onSubmit(f:NgForm){
    this.zoneserv.insertZone(this.zone).then(a=>this.zones.push(a));  }
  showInfosZ(z:Zonepays){
    this.zone2 = z;
    this.toggleModal();
  }
  deleteZ(z:Zonepays){
    if(confirm("هل انت متأكد من إزالة "+z.libZoneAr+" ?")){
      this.zoneserv.deleteZone(z).then(()=>{
        this.zones = this.zones.filter(h=>h!==z);  });
      }
  }
  toggleZadd(){
    this.add = !this.add;
  }
  toggleList(){
    this.list = !this.list;
  }
  toggleModal(){
    this.modal = !this.modal;
  }
  editZone(){
    this.zoneserv.updateZone(this.zone2).then(a=>null);
    alert("تم");
    this.toggleModal();
  }
  exitEdit(){
    this.zoneserv.getAllZones().subscribe(data =>{this.zones = data;this.toggleModal()});

  }
}
