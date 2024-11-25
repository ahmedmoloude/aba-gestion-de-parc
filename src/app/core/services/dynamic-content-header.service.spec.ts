import { TestBed } from '@angular/core/testing';

import { DynamicContentHeaderService } from './dynamic-content-header.service';

describe('DynamicContentHeaderService', () => {
  let service: DynamicContentHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicContentHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
