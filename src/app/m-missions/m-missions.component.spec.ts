/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MMissionsComponent } from './m-missions.component';

describe('MMissionsComponent', () => {
  let component: MMissionsComponent;
  let fixture: ComponentFixture<MMissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MMissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
