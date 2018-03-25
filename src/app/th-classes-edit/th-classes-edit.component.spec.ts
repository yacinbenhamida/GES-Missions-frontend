/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThClassesEditComponent } from './th-classes-edit.component';

describe('ThClassesEditComponent', () => {
  let component: ThClassesEditComponent;
  let fixture: ComponentFixture<ThClassesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThClassesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThClassesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
