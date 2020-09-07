import { Component, OnInit } from '@angular/core';
import { WorkoutPlanService } from '../../services/workout-plan.service';
import { WorkoutPlan } from '../../models/workout-plan';
import { Exercise } from '../../models/exercise';
import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'app-workout-plan-list',
  templateUrl: './workout-plan-list.component.html',
  styleUrls: ['./workout-plan-list.component.css']
})
export class WorkoutPlanListComponent implements OnInit {

  exercises: Exercise[];
  workoutPlans: WorkoutPlan[];

  constructor(
    private workoutPlanService: WorkoutPlanService,
    private exerciseService: ExerciseService
  ) { }

  ngOnInit() {
    this.getWorkoutPlans();
    this.getExercises();
  }

  getWorkoutPlans(): void {
    this.workoutPlanService.getWorkoutPlans()
      .subscribe(workoutPlans => this.workoutPlans = workoutPlans);
  }

  addWorkoutPlan(workoutPlanName: string): void {
    let workoutPlan = new WorkoutPlan(workoutPlanName);
    this.workoutPlanService.addWorkoutPlan(workoutPlan)
      .subscribe(wp => this.workoutPlans.push(wp));
  }

  deleteWorkoutPlan(workoutPlanId: number): void {
    this.workoutPlans = this.workoutPlans.filter(wp => wp.id != workoutPlanId);
    this.workoutPlanService.deleteWorkoutPlan(workoutPlanId).subscribe();
  }

  getExercises(): void {
    this.exerciseService.getExercises()
      .subscribe(e => this.exercises = e);
  }

}
