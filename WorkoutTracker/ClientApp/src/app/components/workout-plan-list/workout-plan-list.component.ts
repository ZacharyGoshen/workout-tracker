import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkoutPlanService } from '../../services/workout-plan.service';
import { WorkoutPlan } from '../../models/workout-plan';
import { Exercise } from '../../models/exercise';
import { ExerciseService } from '../../services/exercise.service';
import { FormControl } from '@angular/forms';
import { PopperComponent } from '../popper/popper.component';

@Component({
  selector: 'app-workout-plan-list',
  templateUrl: './workout-plan-list.component.html',
  styleUrls: ['./workout-plan-list.component.css']
})
export class WorkoutPlanListComponent implements OnInit {

  newWorkoutPlanName = new FormControl('');

  exercises: Exercise[];
  workoutPlans: WorkoutPlan[];

  @ViewChild('workoutPlanName', { static: false }) workoutPlanNameInput;
  @ViewChild(PopperComponent, { static: false }) popperComponent: PopperComponent;

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
    if (workoutPlanName.length == 0) {
      this.popperComponent.create(this.workoutPlanNameInput.nativeElement, 'Enter a valid name.');
      return;
    }

    let workoutPlan = new WorkoutPlan(workoutPlanName);
    this.workoutPlanService.addWorkoutPlan(workoutPlan)
      .subscribe(wp => {
        this.workoutPlans.push(wp);
        this.newWorkoutPlanName.setValue('');
      });
  }

  deleteWorkoutPlan(workoutPlanId: number): void {
    this.workoutPlans = this.workoutPlans.filter(wp => wp.id != workoutPlanId);
    this.workoutPlanService.deleteWorkoutPlan(workoutPlanId).subscribe();
  }

  getExercises(): void {
    this.exerciseService.getExercises()
      .subscribe(e => {
        this.exercises = e.sort((a, b) => (a.name > b.name) ? 1 : -1);
      });
  }

}
