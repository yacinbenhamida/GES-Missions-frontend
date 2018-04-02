/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MConfirmMissionsComponent } from './m-confirm-missions.component';

describe('MConfirmMissionsComponent', () => {
  let component: MConfirmMissionsComponent;
  let fixture: ComponentFixture<MConfirmMissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MConfirmMissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MConfirmMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
