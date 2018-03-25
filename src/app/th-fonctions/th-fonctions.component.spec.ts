/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThFonctionsComponent } from './th-fonctions.component';

describe('ThFonctionsComponent', () => {
  let component: ThFonctionsComponent;
  let fixture: ComponentFixture<ThFonctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThFonctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThFonctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
