import { TestBed } from '@angular/core/testing';

import { TypeOfEpiServiceService } from './type-of-epi-service.service';

describe('TypeOfEpiServiceService', () => {
  let service: TypeOfEpiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeOfEpiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
