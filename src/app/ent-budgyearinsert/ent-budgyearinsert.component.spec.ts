/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EntBudgyearinsertComponent } from './ent-budgyearinsert.component';

describe('EntBudgyearinsertComponent', () => {
  let component: EntBudgyearinsertComponent;
  let fixture: ComponentFixture<EntBudgyearinsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntBudgyearinsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntBudgyearinsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
