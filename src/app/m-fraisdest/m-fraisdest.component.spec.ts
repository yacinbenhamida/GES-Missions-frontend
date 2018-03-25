/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MFraisdestComponent } from './m-fraisdest.component';

describe('MFraisdestComponent', () => {
  let component: MFraisdestComponent;
  let fixture: ComponentFixture<MFraisdestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MFraisdestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MFraisdestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
