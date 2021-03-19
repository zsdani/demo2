import { TestBed } from '@angular/core/testing';

import { AnimaldetailsService } from './animaldetails.service';

describe('AnimaldetailsService', () => {
  let service: AnimaldetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimaldetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
