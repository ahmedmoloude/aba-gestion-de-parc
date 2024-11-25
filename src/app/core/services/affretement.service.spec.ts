import { TestBed } from '@angular/core/testing';

import { AffretementService } from './affretement.service';

describe('AffretementService', () => {
  let service: AffretementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffretementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
