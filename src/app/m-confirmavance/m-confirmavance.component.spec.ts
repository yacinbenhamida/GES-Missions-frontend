/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MConfirmavanceComponent } from './m-confirmavance.component';

describe('MConfirmavanceComponent', () => {
  let component: MConfirmavanceComponent;
  let fixture: ComponentFixture<MConfirmavanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MConfirmavanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MConfirmavanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
