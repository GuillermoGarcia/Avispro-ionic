import { TestBed } from '@angular/core/testing';

import { HabilidadService } from './habilidad.service';

describe('HabilidadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HabilidadService = TestBed.get(HabilidadService);
    expect(service).toBeTruthy();
  });
});
