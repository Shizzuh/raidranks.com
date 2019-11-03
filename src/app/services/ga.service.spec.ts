import { TestBed } from '@angular/core/testing';

import { GaService } from './ga.service';

describe('GaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GaService = TestBed.get(GaService);
    expect(service).toBeTruthy();
  });
});
