import { TestBed } from '@angular/core/testing';

import { DuckServiceService } from './duck-service.service';

describe('DuckServiceService', () => {
  let service: DuckServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuckServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
