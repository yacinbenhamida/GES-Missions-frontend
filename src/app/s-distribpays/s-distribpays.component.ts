import { Component, OnInit, Input } from '@angular/core';
import { OrdreMission } from '../model/ordremission';

@Component({
  selector: 'app-s-distribpays',
  templateUrl: './s-distribpays.component.html',
  styleUrls: ['./s-distribpays.component.css']
})
export class SDistribpaysComponent implements OnInit {
@Input() lst:OrdreMission[] = [];
@Input() deb:Date;
  constructor() { }

  ngOnInit() {
  }

}
