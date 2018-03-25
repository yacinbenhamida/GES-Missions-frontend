/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThCategEditComponent } from './th-categ-edit.component';

describe('ThCategEditComponent', () => {
  let component: ThCategEditComponent;
  let fixture: ComponentFixture<ThCategEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThCategEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThCategEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
