/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MMissionairesEditComponent } from './m-missionaires-edit.component';

describe('MMissionairesEditComponent', () => {
  let component: MMissionairesEditComponent;
  let fixture: ComponentFixture<MMissionairesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MMissionairesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MMissionairesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
