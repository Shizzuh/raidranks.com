import { TestBed } from '@angular/core/testing';

import { TeamBuilderService } from './team-builder.service';

describe('TeamBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeamBuilderService = TestBed.get(TeamBuilderService);
    expect(service).toBeTruthy();
  });
});
