import { TestBed } from '@angular/core/testing';

import { WorkoutSessionsService } from './workout-sessions.service';

describe('WorkoutSessionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkoutSessionsService = TestBed.get(WorkoutSessionsService);
    expect(service).toBeTruthy();
  });
});
