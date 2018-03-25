/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThKeywordEdtComponent } from './th-keyword-edt.component';

describe('ThKeywordEdtComponent', () => {
  let component: ThKeywordEdtComponent;
  let fixture: ComponentFixture<ThKeywordEdtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThKeywordEdtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThKeywordEdtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
