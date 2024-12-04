import { TestBed } from '@angular/core/testing';

import { RessouresService } from './ressoures.service';

describe('RessouresService', () => {
  let service: RessouresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RessouresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
