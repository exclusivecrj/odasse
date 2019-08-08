import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LojistaPage } from './lojista.page';

describe('LojistaPage', () => {
  let component: LojistaPage;
  let fixture: ComponentFixture<LojistaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LojistaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LojistaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
