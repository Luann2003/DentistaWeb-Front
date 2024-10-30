import { TestBed } from '@angular/core/testing';

import { GeocodeServiceService } from './geocode-service.service';

describe('GeocodeServiceService', () => {
  let service: GeocodeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeocodeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
