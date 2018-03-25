/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EntBudgyeareditComponent } from './ent-budgyearedit.component';

describe('EntBudgyeareditComponent', () => {
  let component: EntBudgyeareditComponent;
  let fixture: ComponentFixture<EntBudgyeareditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntBudgyeareditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntBudgyeareditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
