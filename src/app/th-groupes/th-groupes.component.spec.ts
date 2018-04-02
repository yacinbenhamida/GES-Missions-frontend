/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThGroupesComponent } from './th-groupes.component';

describe('ThGroupesComponent', () => {
  let component: ThGroupesComponent;
  let fixture: ComponentFixture<ThGroupesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThGroupesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThGroupesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
