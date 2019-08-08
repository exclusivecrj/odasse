import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaRoupasPage } from './edita-roupas.page';

describe('EditaRoupasPage', () => {
  let component: EditaRoupasPage;
  let fixture: ComponentFixture<EditaRoupasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaRoupasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaRoupasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
