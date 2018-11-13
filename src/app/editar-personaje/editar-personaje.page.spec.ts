import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPersonajePage } from './editar-personaje.page';

describe('EditarPersonajePage', () => {
  let component: EditarPersonajePage;
  let fixture: ComponentFixture<EditarPersonajePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPersonajePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPersonajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
