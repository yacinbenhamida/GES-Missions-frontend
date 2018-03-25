/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProjBudgyearinsertComponent } from './proj-budgyearinsert.component';

describe('ProjBudgyearinsertComponent', () => {
  let component: ProjBudgyearinsertComponent;
  let fixture: ComponentFixture<ProjBudgyearinsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjBudgyearinsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjBudgyearinsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
