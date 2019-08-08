import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreLoginPage } from './pre-login.page';

describe('PreLoginPage', () => {
  let component: PreLoginPage;
  let fixture: ComponentFixture<PreLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreLoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
