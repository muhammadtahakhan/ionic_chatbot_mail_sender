import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialRoutePage } from './initial-route.page';

describe('InitialRoutePage', () => {
  let component: InitialRoutePage;
  let fixture: ComponentFixture<InitialRoutePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialRoutePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialRoutePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
