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
  constructor(public paysServ:PaysService,public zoneserv:ZonePaysService,public router:Router) { }

  ngOnInit() {
    this.zoneserv.getAllZones().subscribe(data=>this.zones =data);
    this.pays = new  Pays();
    this.paysServ.getAllPays().subscribe(data=>this.countries = data);
    this.addC = true;
    this.listC = true;
  }
  deleteCountry(country:Pays){
    if(confirm("هل انت متأكد من إزالة "+country.libPaysAr+" ?")){
      this.paysServ.deletePays(country).then(()=>{
        this.countries = this.countries.filter(h=>h!==country);  });
      }
  }
  showInfosCountry(country:Pays){
    this.router.navigate(['th-countries/editCountry',country.idpays]);
  }
  onSubmit(f:NgForm){
    this.paysServ.insertPays(this.pays).then(()=>null);
    this.countries.push(this.pays);
  }
  toggleAddC(){
    this.addC = ! this.addC;
  }
  toggleListC(){
    this.listC = ! this.listC;
  }
}
