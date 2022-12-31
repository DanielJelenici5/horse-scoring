import { TestBed } from '@angular/core/testing';

import { StatCalcService } from './stat-calc.service';

describe('StatCalcService', () => {
  let service: StatCalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatCalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
