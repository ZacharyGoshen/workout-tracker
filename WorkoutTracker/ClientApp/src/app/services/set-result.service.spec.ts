import { TestBed } from '@angular/core/testing';

import { SetResultService } from './set-result.service';

describe('SetResultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetResultService = TestBed.get(SetResultService);
    expect(service).toBeTruthy();
  });
});
