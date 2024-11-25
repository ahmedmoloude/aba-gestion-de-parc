import { TestBed } from '@angular/core/testing';

import { DynamicModuleService } from './dynamic-module.service';

describe('DynamicModuleService', () => {
  let service: DynamicModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
