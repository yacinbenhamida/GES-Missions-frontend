/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThEditFctComponent } from './th-edit-fct.component';

describe('ThEditFctComponent', () => {
  let component: ThEditFctComponent;
  let fixture: ComponentFixture<ThEditFctComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThEditFctComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThEditFctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
