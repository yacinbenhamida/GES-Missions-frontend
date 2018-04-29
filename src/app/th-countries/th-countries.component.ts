import { Component, OnInit } from '@angular/core';
import { Pays } from '../model/pays';
import { PaysService } from '../model/pays.service';
import { NgForm } from '@angular/forms';
import { ZonePaysService } from '../model/zonepays.service';
import { Zonepays } from '../model/zonepays';
import { Router } from '@angular/router';

@Component({
  selector: 'app-th-countries',
  templateUrl: './th-countries.component.html',
  styleUrls: ['./th-countries.component.css']
})
export class ThCountriesComponent implements OnInit {
  pays:Pays;
  countries:Pays[];
  zones:Zonepays[];
  addC:boolean;
  listC:boolean;
  searchString:string;
  modal:boolean = false;
  pays2:Pays = new Pays();
  constructor(public paysServ:PaysService,public zoneserv:ZonePaysService) { }

  ngOnInit() {
    this.zoneserv.getAllZones().subscribe(data=>this.zones =data);
    this.pays = new  Pays();
    this.paysServ.getAllPays().subscribe(data=>this.countries = data);
    this.addC = true;
    this.listC = true;
    this.zones= null;
    this.pays.langue = null;
    this.pays.zonepays = null;
  }
  deleteCountry(country:Pays){
    if(confirm("هل انت متأكد من إزالة "+country.libPaysAr+" ?")){
      this.paysServ.deletePays(country).then(()=>{
        this.countries = this.countries.filter(h=>h!==country);  });
      }
  }
  showInfosCountry(country:Pays){
    this.toggleModal();
    this.pays2 = country;
    this.pays2.zonepays = country.zonepays;
  }
  onSubmit(f:NgForm){
    this.paysServ.insertPays(this.pays).then(a=>this.countries.push(a));
  }
  toggleAddC(){
    this.addC = ! this.addC;
  }
  toggleListC(){
    this.listC = ! this.listC;
  }
  toggleModal(){
    this.modal = !this.modal
  }
  editPays(){
    this.paysServ.updatePays(this.pays2).then(x=>null);
    this.toggleModal();
  }
  exitEdit(){
    this.paysServ.getAllPays().subscribe(
      a=>{
        this.countries = a;
        this.toggleModal();
      }
    )
  }
}
