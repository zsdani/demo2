import { TestBed } from '@angular/core/testing';

import { AdoptedService } from '../adopted.service';

describe('AdoptedService', () => {
  let service: AdoptedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdoptedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
