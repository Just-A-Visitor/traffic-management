import { TestBed } from '@angular/core/testing';

import { Query1Service } from './query1.service';

describe('Query1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Query1Service = TestBed.get(Query1Service);
    expect(service).toBeTruthy();
  });
});
