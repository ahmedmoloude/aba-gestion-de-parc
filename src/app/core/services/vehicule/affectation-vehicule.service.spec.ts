import { TestBed } from '@angular/core/testing';

import { AffectationVehiculeService } from './affectation-vehicule.service';

describe('AffectationVehiculeService', () => {
  let service: AffectationVehiculeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffectationVehiculeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
