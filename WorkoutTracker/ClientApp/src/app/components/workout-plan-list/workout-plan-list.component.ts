import { Component, OnInit } from '@angular/core';
import { WorkoutPlanService } from '../../services/workout-plan.service';
import { WorkoutPlan } from '../../models/workout-plan';

@Component({
  selector: 'app-workout-plan-list',
  templateUrl: './workout-plan-list.component.html',
  styleUrls: ['./workout-plan-list.component.css']
})
export class WorkoutPlanListComponent implements OnInit {

  workoutPlans: WorkoutPlan[];

  constructor(private workoutPlanService: WorkoutPlanService) { }

  ngOnInit() {
    this.getWorkoutPlans();
  }

  getWorkoutPlans() {
    this.workoutPlanService.getWorkoutPlans()
      .subscribe(workoutPlans => this.workoutPlans = workoutPlans);
  }

  addWorkoutPlan(workoutPlanName: string) {
    let workoutPlan = new WorkoutPlan(workoutPlanName);
    this.workoutPlanService.addWorkoutPlan(workoutPlan)
      .subscribe(wp => this.workoutPlans.push(wp));
  }

  deleteWorkoutPlan(workoutPlanId: number) {
    this.workoutPlans = this.workoutPlans.filter(wp => wp.id != workoutPlanId);
    this.workoutPlanService.deleteWorkoutPlan(workoutPlanId).subscribe();
  }

}
