import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenditemPage } from './senditem.page';

describe('SenditemPage', () => {
  let component: SenditemPage;
  let fixture: ComponentFixture<SenditemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenditemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenditemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
