import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCaracteristicaPage } from './editar-caracteristica.page';

describe('EditarCaracteristicaPage', () => {
  let component: EditarCaracteristicaPage;
  let fixture: ComponentFixture<EditarCaracteristicaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCaracteristicaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCaracteristicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
