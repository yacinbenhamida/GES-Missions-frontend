/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThZonesComponent } from './th-zones.component';

describe('ThZonesComponent', () => {
  let component: ThZonesComponent;
  let fixture: ComponentFixture<ThZonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThZonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
