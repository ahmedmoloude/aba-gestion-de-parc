import { TestBed } from '@angular/core/testing';

import { ActivityTruckService } from './activity-truck.service';

describe('ActivityTruckService', () => {
  let service: ActivityTruckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityTruckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
