import { TestBed } from '@angular/core/testing';

import { FeuilleDeRouteService } from './feuille-de-route.service';

describe('FeuilleDeRouteService', () => {
  let service: FeuilleDeRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeuilleDeRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
