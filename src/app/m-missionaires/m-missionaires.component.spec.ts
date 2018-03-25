/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MMissionairesComponent } from './m-missionaires.component';

describe('MMissionairesComponent', () => {
  let component: MMissionairesComponent;
  let fixture: ComponentFixture<MMissionairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MMissionairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MMissionairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
