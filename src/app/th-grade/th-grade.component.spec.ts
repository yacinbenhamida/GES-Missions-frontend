/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThGradeComponent } from './th-grade.component';

describe('ThGradeComponent', () => {
  let component: ThGradeComponent;
  let fixture: ComponentFixture<ThGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThGradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
