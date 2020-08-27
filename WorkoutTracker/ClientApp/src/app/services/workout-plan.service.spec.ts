import { TestBed } from '@angular/core/testing';

import { WorkoutPlanService } from './workout-plan.service';

describe('WorkoutPlanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkoutPlanService = TestBed.get(WorkoutPlanService);
    expect(service).toBeTruthy();
  });
});
