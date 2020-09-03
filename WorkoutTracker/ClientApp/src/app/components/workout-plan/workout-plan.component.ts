import { Component, OnInit, Input, Output } from '@angular/core';
import { WorkoutPlan } from '../../models/workout-plan';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-workout-plan',
  templateUrl: './workout-plan.component.html',
  styleUrls: ['./workout-plan.component.css']
})
export class WorkoutPlanComponent implements OnInit {

  @Input() workoutPlan: WorkoutPlan;

  @Output() workoutPlanDelete: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deleteWorkoutPlan(): void {
    this.workoutPlanDelete.emit(this.workoutPlan.id);
  }
}
