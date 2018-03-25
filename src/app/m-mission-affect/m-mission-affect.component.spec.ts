/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MMissionAffectComponent } from './m-mission-affect.component';

describe('MMissionAffectComponent', () => {
  let component: MMissionAffectComponent;
  let fixture: ComponentFixture<MMissionAffectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MMissionAffectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MMissionAffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
