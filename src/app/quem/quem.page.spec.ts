import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuemPage } from './quem.page';

describe('QuemPage', () => {
  let component: QuemPage;
  let fixture: ComponentFixture<QuemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
