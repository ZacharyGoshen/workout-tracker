import { Component, OnInit, Input } from '@angular/core';
import { WorkoutSession } from '../../models/workout-session';
import { WorkoutPlan } from '../../models/workout-plan';
import { WorkoutPlanService } from '../../services/workout-plan.service';

@Component({
  selector: 'app-workout-session',
  templateUrl: './workout-session.component.html',
  styleUrls: ['./workout-session.component.css']
})
export class WorkoutSessionComponent implements OnInit {

  @Input() workoutSession: WorkoutSession;

  workoutPlan: WorkoutPlan;

  constructor(private workoutPlanService: WorkoutPlanService) { }

  ngOnInit() {
    this.getWorkoutPlan();
  }

  getWorkoutPlan(): void {
    this.workoutPlanService
      .getWorkoutPlanById(this.workoutSession.workoutPlanId)
      .subscribe(workoutPlan => this.workoutPlan = workoutPlan);
  }

}
