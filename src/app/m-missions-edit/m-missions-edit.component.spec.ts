/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MMissionsEditComponent } from './m-missions-edit.component';

describe('MMissionsEditComponent', () => {
  let component: MMissionsEditComponent;
  let fixture: ComponentFixture<MMissionsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MMissionsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MMissionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
