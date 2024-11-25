import { TestBed } from '@angular/core/testing';

import { TruckDisponibilteesService } from './truck-disponibiltees.service';

describe('TruckDisponibilteesService', () => {
  let service: TruckDisponibilteesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TruckDisponibilteesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
