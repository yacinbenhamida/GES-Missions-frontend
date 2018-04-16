/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SDistribpaysComponent } from './s-distribpays.component';

describe('SDistribpaysComponent', () => {
  let component: SDistribpaysComponent;
  let fixture: ComponentFixture<SDistribpaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SDistribpaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SDistribpaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
