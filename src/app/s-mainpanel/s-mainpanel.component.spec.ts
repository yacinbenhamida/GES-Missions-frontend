/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SMainpanelComponent } from './s-mainpanel.component';

describe('SMainpanelComponent', () => {
  let component: SMainpanelComponent;
  let fixture: ComponentFixture<SMainpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SMainpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SMainpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
