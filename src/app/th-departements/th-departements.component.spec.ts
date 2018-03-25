/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThDepartementsComponent } from './th-departements.component';

describe('ThDepartementsComponent', () => {
  let component: ThDepartementsComponent;
  let fixture: ComponentFixture<ThDepartementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThDepartementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThDepartementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
