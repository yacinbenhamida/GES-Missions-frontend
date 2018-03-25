/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThTypefraisComponent } from './th-typefrais.component';

describe('ThTypefraisComponent', () => {
  let component: ThTypefraisComponent;
  let fixture: ComponentFixture<ThTypefraisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThTypefraisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThTypefraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
