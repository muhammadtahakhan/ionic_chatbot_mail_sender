import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeEmailPage } from './compose-email.page';

describe('ComposeEmailPage', () => {
  let component: ComposeEmailPage;
  let fixture: ComponentFixture<ComposeEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeEmailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
