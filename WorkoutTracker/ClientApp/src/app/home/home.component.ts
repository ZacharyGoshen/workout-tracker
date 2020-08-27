import { Component, OnInit } from '@angular/core';
import { WorkoutPlanService } from '../services/workout-plan.service';
import { WorkoutPlan } from '../models/workout-plan';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  workoutPlans: WorkoutPlan[];

  constructor(private workoutPlanService: WorkoutPlanService) { }

  ngOnInit() {
    this.getWorkoutPlans();
  }

  getWorkoutPlans(): void {
    this.workoutPlanService.getWorkoutPlans()
      .subscribe(workoutPlans => { this.workoutPlans = workoutPlans; console.log(workoutPlans) } );
  }

}
