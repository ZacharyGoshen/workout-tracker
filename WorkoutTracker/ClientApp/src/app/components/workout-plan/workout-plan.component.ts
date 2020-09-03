import { Component, OnInit, Input, Output } from '@angular/core';
import { WorkoutPlan } from '../../models/workout-plan';
import { EventEmitter } from '@angular/core';
import { SetPlan } from '../../models/set-plan';
import { SetPlanService } from '../../services/set-plan.service';

@Component({
  selector: 'app-workout-plan',
  templateUrl: './workout-plan.component.html',
  styleUrls: ['./workout-plan.component.css']
})
export class WorkoutPlanComponent implements OnInit {

  @Input() workoutPlan: WorkoutPlan;

  @Output() workoutPlanDelete: EventEmitter<number> = new EventEmitter();

  setPlans: SetPlan[];

  constructor(private setPlanService: SetPlanService) { }

  ngOnInit() {
    this.getSetPlans();
  }

  deleteWorkoutPlan(): void {
    this.workoutPlanDelete.emit(this.workoutPlan.id);
  }

  getSetPlans(): void {
    this.setPlanService.getSetPlansWithWorkoutPlanId(this.workoutPlan.id)
      .subscribe(sp => this.setPlans = sp);
  }
}
