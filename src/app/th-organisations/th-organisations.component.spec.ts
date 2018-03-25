/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThOrganisationsComponent } from './th-organisations.component';

describe('ThOrganisationsComponent', () => {
  let component: ThOrganisationsComponent;
  let fixture: ComponentFixture<ThOrganisationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThOrganisationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThOrganisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
