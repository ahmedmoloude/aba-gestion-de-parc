import { TestBed } from '@angular/core/testing';

import { AffretementServiceService } from './affretement-service.service';

describe('AffretementServiceService', () => {
  let service: AffretementServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffretementServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
