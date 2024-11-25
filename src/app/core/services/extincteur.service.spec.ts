import { TestBed } from '@angular/core/testing';

import { ExtincteurService } from './extincteur.service';

describe('ExtincteurService', () => {
  let service: ExtincteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtincteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
