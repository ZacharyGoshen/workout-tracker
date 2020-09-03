import { TestBed } from '@angular/core/testing';

import { SetPalnService } from './set-paln.service';

describe('SetPalnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetPalnService = TestBed.get(SetPalnService);
    expect(service).toBeTruthy();
  });
});
